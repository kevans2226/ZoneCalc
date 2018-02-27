

export class CyclingZones {
    public functionalThreashold: number; 
    public lacateThreashold: number; 

    public zones: ZoneRecord[]; 

    public names: string[]; 
    public powerZones: ZoneRecord[]; 
    public heartRateZone: ZoneRecord[]; 

    public extraPowerNames: string[];
    public extraPowerZones: ZoneRecord[]; 

    constructor() { 
        this.zones = new Array<ZoneRecord>(); 

        this.zones.push(new ZoneRecord("1 - Easy", new ZoneNumber(0.449, 0.550), new ZoneNumber(0.600, 0.800)));
        this.zones.push(new ZoneRecord("2 - Steady", new ZoneNumber(0.559, 0.750), new ZoneNumber(0.804, 0.900)));
        this.zones.push(new ZoneRecord("3 - Mod Hard", new ZoneNumber(0.759, 0.900), new ZoneNumber(0.904, 0.950)));
        this.zones.push(new ZoneRecord("4 - Hard",new ZoneNumber(0.909, 1.049), new ZoneNumber(0.954, 1.000)));
        this.zones.push(new ZoneRecord("5 - Very Hard", new ZoneNumber(1.059, 1.500), new ZoneNumber(1.004, 1.100)));

        
        this.extraPowerZones = new Array<ZoneRecord>(); 
        this.extraPowerZones.push(new ZoneRecord("AT/VO2max", new ZoneNumber(1.06, 1.20), null)); 
        this.extraPowerZones.push(new ZoneRecord("Anaerobic capacity", new ZoneNumber(1.21, 1.50), null));
        this.extraPowerZones.push(new ZoneRecord("Sprint Power", new ZoneNumber(1.50, 3.00), null)); 

    }

    public setFunctionalThreadhold(ftp: number): void { 
        if(ftp != NaN) {
            this.functionalThreashold = Math.round(ftp); 

            this.zones.forEach(element => {
                element.setPowerMinMax(this.functionalThreashold); 
            });

            this.extraPowerZones.forEach(element => { 
                element.setPowerMinMax(this.functionalThreashold);
            });
        }
    }

    public setLacateThreshold(lacateThreashold: number): void {
        if(lacateThreashold != NaN) {  
            this.lacateThreashold = Math.round(lacateThreashold); 

            this.zones.forEach(element => { 
                element.setHeartRateMinMax(this.lacateThreashold); 
            })
        }
    }
}

export class ZoneRecord {  

    constructor(public name: string, public power: ZoneNumber, public heartRate: ZoneNumber) {    }

    public setPowerMinMax(ftp: number) : void { 
        this.power.setMinMax(ftp)
    }

    public setHeartRateMinMax(lth: number) : void { 
        this.heartRate.setMinMax(lth); 
    }
}

export class ZoneNumber {
    public min: number;
    public max: number;  
    constructor(public percentMin: number, public percentMax: number) {   }

    public setMinMax(base: number) : void { 
        this.min = Math.round(base * this.percentMin); 
        this.max = Math.round(base * this.percentMax);
    }
}

