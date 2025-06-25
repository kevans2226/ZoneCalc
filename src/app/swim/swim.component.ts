import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SwimmingX } from '../data-interfaces';
import { ZonesService } from '../zones.service';

@Component({
    selector: 'app-swim',
    templateUrl: './swim.component.html',
    styleUrls: ['./swim.component.css'],
    standalone: false
})
export class SwimComponent implements OnInit {
  public swim1: string; 
  public swim2: string; 
  public swim3: string; 
  public measurements: string = "yards";
  public showTable: boolean = false; 
  public showInput: boolean = true;
  public timePattern: string = "^(0?[1-9]|[1-9][0-9]):[0-5]{1}[0-9]{1}(\\.\\d{1,2})?"; 
  public loading: boolean; 
  public swimZones: SwimmingX; 
  public avgYards: number;
  public avgMeters: number; 
  public thresholdSet: boolean = false; 
  public showLength: boolean = false; 
  public width: any; 
  public lengths: Array<number> = [25, 50, 75, 100, 125, 150, 175, 200, 250, 300, 400, 500, 600, 800, 1000]

  constructor(public route: ActivatedRoute, private zoneService: ZonesService) { }

  ngOnInit() {
    this.loading = true; 
 
    this.route.params.subscribe(params => { 

      if(params['measurement'] != undefined) this.measurements = params['measurement'];  
      if(params['threshold'] != undefined) {
        // Calculate Populate the Table // 
        if(this.measurements == "yards") {
          this.avgYards = parseFloat(params["threshold"]); 
          this.avgMeters = this.avgYards / .94144; 
        }
        else {
          this.avgMeters = parseFloat(params["threshold"])
          this.avgYards = this.avgMeters * .94144; 
        }

        console.log('Average Yards ' + this.avgYards);

         this.showTable = true;  
         this.showInput = false;
      } 
      else { 
        this.showInput = true;  
        
        if(params["swim1"] != undefined) { this.swim1 = params["swim1"]; this.showInput = false; } else { this.showInput = true; } 
        if(params["swim2"] != undefined) { this.swim2 = params["swim2"]; this.showInput = false; } else { this.showInput = true; } 
        if(params["swim3"] != undefined) { this.swim3 = params["swim3"]; this.showInput = false; } else { this.showInput = true; } 
      }

      console.log(this.swimZones); 
    });

    this.zoneService.getSwimming().subscribe(result => { 
      this.swimZones = new SwimmingX(result);  

      if(this.swim1 != undefined && this.swim2 != undefined && this.swim3 != undefined) this.Calculate();  
      else if (this.avgMeters != undefined && this.avgYards != undefined) this.ChangeMeasurement();
      this.loading = false;
    }, error => { 
      console.log(error); 
      this.loading = false;
    })
  }

  public change(time: string) : void {
    if(this.showTable) this.Calculate();
  }

  public Calculate() : number { 
    var testTimeString = new RegExp(this.timePattern); 
    var stringInput = [this.swim1, this.swim2, this.swim3 ]; 
    var invalidTest = [false, false, false]; 
    var seconds =  [0 ,0,0] ; 

    ///////////////////////
    // Validate the Time //
    ///////////////////////     
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
    /////////////////////////////////////////// 
    // IF you are here we validate the times //
    /////////////////////////////////////////// 
    ///////////////////////////
    // Find the Average time //
    ///////////////////////////
    var avg = 0; 
    seconds.forEach(a => { avg += a; } ); 
    avg /= seconds.length; 

    avg /= 3; 

    ///////////////////////
    // Set the threshold //
    ///////////////////////
    this.swimZones.setThreshold(avg);
    console.log(this.swimZones); 

    //////////////////////////////////////////////////////
    // set the average yard property, and average meter //
    //////////////////////////////////////////////////////
    if(this.measurements == "yards") { 
      this.avgYards = avg;
      this.avgMeters = avg / .94144; 
    }
    else { 
      this.avgMeters = avg; 
      this.avgYards = avg * .94144; 
    }

    this.showTable = true;
  }

  public ChangeMeasurement(): void { 
    console.log(this.measurements); 
    
    if(this.measurements == "meters") this.swimZones.setThreshold(this.avgMeters); 
    else this.swimZones.setThreshold(this.avgYards); 
  
    console.log(this.swimZones.threshold);
  }
}

