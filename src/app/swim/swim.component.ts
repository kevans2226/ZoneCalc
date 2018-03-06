import { Component, OnInit } from '@angular/core';
import { ZoneNumber } from '../zone-number';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-swim',
  templateUrl: './swim.component.html',
  styleUrls: ['./swim.component.css']
})
export class SwimComponent implements OnInit {
  public swim1: string; 
  public swim2: string; 
  public swim3: string; 
  public measurements: string = "yards";
  public showTable: boolean = false; 
  public timePattern: string = "^(0?[1-9]|[1-9][0-9]):[0-5]{1}[0-9]{1}(\\.\\d{1,2})?"; 
  public zones: SwimZones = new SwimZones();
  public zonesYards: SwimZones = new SwimZones(); 
  public zonesMeters: SwimZones = new SwimZones(); 
  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => { 
      if(params['measurement'] != undefined) this.measurements = params['measurement'];  
      if(params["swim1"] != undefined) this.swim1 = params["swim1"]; 
      if(params["swim2"] != undefined) this.swim2 = params["swim2"]; 
      if(params["swim3"] != undefined) this.swim3 = params["swim3"]; 
      if(this.swim1 != undefined && this.swim2 != undefined && this.swim3 != undefined) this.Calculate(); 
    });
  }

  public change(time: string) : void {
    console.log(time);
    this.Calculate();
  }

  public Calculate() : number { 
    var testTimeString = new RegExp(this.timePattern); 
    var stringInput = [this.swim1, this.swim2, this.swim3 ]; 
    var invalidTest = [false, false, false]; 
    var seconds =  [0 ,0,0] ; 

    for(var x in stringInput) { 
      if(!testTimeString.test(stringInput[x])) {
        console.log("Swim " + (x+1) + " Failed Validation");
        invalidTest[x] = true; 
      } 
      else {
        invalidTest[x] = false;

        var temp = stringInput[x].split(':'); 
        seconds[x] =  parseFloat(temp[1]) + (parseInt(temp[0]) * 60)
      }
    }

    for(var x in invalidTest) if (invalidTest[x]) return; 

    var avg = 0; 
    seconds.forEach(a => { avg += a; } ); 
    avg /= seconds.length; 

    avg /= 3; 

    var exactSeconds = (avg % 60);

    var sec = Math.round(exactSeconds * 100) / 100;
    var minute = (avg - exactSeconds) / 60; 
    var time = minute + ":" + sec; 
    console.log("Seconds: " + sec + " Minute: " + minute + " time: " + time); 

    this.zones.setThreshold(avg);

    if(this.measurements == "yards") {
      var meters = avg / .94144; 
      console.log(meters + " " + avg); 
      this.zonesYards = this.zones;
      this.zonesMeters.setThreshold(meters);  
    }
    else { 
      this.zonesMeters = this.zones; 
      this.zonesYards.setThreshold(avg * .94144);
    }
    this.showTable = true;
  }

  public ChangeMeasurement(): void { 
    console.log(this.measurements); 
    
    if(this.measurements == "meters") this.zones = this.zonesMeters; 
    else this.zones = this.zonesYards; 
  
    console.log(this.zones.threshold);
  }
}

export class SwimZones { 
  public zoneRecord: SwimRecordZone[]; 
  public threshold: number; 

  constructor() { 
    this.zoneRecord = new Array<SwimRecordZone>(); 

    this.zoneRecord.push(new SwimRecordZone("Easy", new ZoneNumber(1.15, 1.21)));
    this.zoneRecord.push(new SwimRecordZone("Steady", new ZoneNumber(1.10, 1.14))); 
    this.zoneRecord.push(new SwimRecordZone("Mod Hard", new ZoneNumber(1.05, 1.05))); 
    this.zoneRecord.push(new SwimRecordZone("Hard", new ZoneNumber(1.00, 1.04))); 
    this.zoneRecord.push(new SwimRecordZone("Very Hard", new ZoneNumber(.75, .98))); 
  }

  public setThreshold(seconds: number) : void { 
    this.threshold = seconds; 

    this.zoneRecord.forEach(result => { 
        result.zone.setMinMax(this.threshold); 
    });
  }
}

export class SwimRecordZone { 
  constructor(public name: string, public zone: ZoneNumber) {   }
  
}

