export interface ISwimming { 
    Pace: IZone[]; 
    threshold: number;
    
    setThreshold(threshold: number) : void;
}

export interface ICycling { 
    Power: IZone[]; 
    HeartRate: IZone[]; 

    ftp: number; 
    threshold: number;
    setFtp(ftp: number) : void; 
    setThreshold(threshold: number) : void 
}

export interface IRunning { 
    HeartRate: IZone[]; 
    threshold: number; 

    setThreshold(threshold: number) : void
}

export interface IZone { 
    name: string; 
    min: number; 
    max: number;

    minCalc: number; 
    maxCalc: number; 
    calculate(base: number) : void 
}

export class SwimmingX implements ISwimming {
    Pace: IZone[];
    threshold: number;

    constructor(data: ISwimming) { 
        if(data == null) return;
        this.Pace = new Array<ZoneX>(); 
        console.log(data);
        data.Pace.forEach(p => { 
            this.Pace.push(new ZoneX(p)); 
        })
    }

    setThreshold(threshold: number): void {
        this.threshold = threshold; 
        this.Pace.forEach(p => { p.calculate(this.threshold); });
    }
}

export class CyclingX implements ICycling {
    Power: ZoneX[];
    HeartRate: ZoneX[];
    ftp: number; 
    threshold: number;

    constructor(data: ICycling) { 
        if(data == null) return;
        this.Power = new Array<ZoneX>();
        this.HeartRate = new Array<ZoneX>();
        
        data.Power.forEach(p => { this.Power.push(new ZoneX(p)); })
        data.HeartRate.forEach(p => { this.HeartRate.push(new ZoneX(p)); }); 
    }


    public setFtp(ftp: number) {
        
        this.ftp = Math.round(ftp); 
        this.Power.forEach(z => { 
            z.calculate(this.ftp); 
        }); 
    }

    public setThreshold(threshold: number) { 
        
        this.threshold = Math.round(threshold); 
        this.HeartRate.forEach(z => {
            z.calculate(threshold); 
        }); 
    }
}

export class RunningX implements IRunning {
    HeartRate: ZoneX[];
    threshold: number;

    constructor(data: IRunning) { 
        if(data == null) return; 
        this.HeartRate = new Array<ZoneX>(); 

        data.HeartRate.forEach(h => {this.HeartRate.push(new ZoneX(h))}); 

    }

    setThreshold(threshold: number): void {
        if(!isNaN(threshold)) {
            this.threshold = threshold; 
            console.log(this.threshold); 
            this.HeartRate.forEach(h => { 
                h.calculate(this.threshold); 
            });
        }
    }
}

export class ZoneX implements IZone {
    name: string;
    min: number;
    max: number;

    minCalc: number; 
    maxCalc: number; 

    constructor(data: IZone) { 
        this.name = data.name; 
        this.min = data.min;
        this.max = data.max; 
    }

    public calculate(base: number) : void { 
        this.minCalc = Math.round(base * this.min); 
        this.maxCalc = Math.round(base * this.max); 
     }
}