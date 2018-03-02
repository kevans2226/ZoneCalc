import { ZoneNumber } from "./zone-number";

export class RunningZones {
    public lacateThreashold: number = 0; 
    public zones: RunZoneRecord[]; 

    constructor() { 
        this.zones = new Array<RunZoneRecord>(); 

        this.zones.push(new RunZoneRecord("1 - Easy", new ZoneNumber(0.596, 0.799)));
        this.zones.push(new RunZoneRecord("2 - Steady", new ZoneNumber(0.800, 0.895)));
        this.zones.push(new RunZoneRecord("3 - Mod Hard", new ZoneNumber(0.900, 0.949)));
        this.zones.push(new RunZoneRecord("4 - Hard", new ZoneNumber(0.954, 1.000)));
        this.zones.push(new RunZoneRecord("5 - Very Hard", new ZoneNumber(1.004, 1.10)));
    }

    public setLacateThreshold(lth: number) { 
        this.lacateThreashold = lth;

        this.zones.forEach(r => { 
            r.setMinMax(this.lacateThreashold); 
        })
    }
}

export class RunZoneRecord { 
    constructor(public name: string, public heartRate: ZoneNumber) { }

    public setMinMax(base: number) { 
        this.heartRate.setMinMax(base); 
    }
}
