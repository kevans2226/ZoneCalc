export class ZoneNumber {
    public min: number;
    public max: number;  
    constructor(public percentMin: number, public percentMax: number) {   }

    public setMinMax(base: number) : void { 
        this.min = Math.round(base * this.percentMin); 
        this.max = Math.round(base * this.percentMax);
    }
}
