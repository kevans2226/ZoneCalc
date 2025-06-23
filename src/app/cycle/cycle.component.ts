import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZonesService } from '../zones.service';
import { CyclingX } from '../data-interfaces';

@Component({
    selector: 'app-cycle',
    templateUrl: './cycle.component.html',
    styleUrls: ['./cycle.component.css'],
    standalone: false
})
export class CycleComponent implements OnInit {
  public loading: boolean;
  public averagePower: number; 
  public averageHeartRate: number; 
  public cyclingZone: CyclingX; 
  public rows: Array<any>; 

  public ftpPercentage: number = .95;
  public ftp: number = 0; 
  public int: Array<number>; 

  public showInput: boolean = true; 

  constructor(private route: ActivatedRoute, private zonesService: ZonesService) { }

  
  ngOnInit() {

    this.route.params.subscribe(params => { 
        this.averageHeartRate = +params['hr'];
        this.averagePower = +params['power']
      
        this.showInput = true;
        console.log("Heart Rate: " + this.averageHeartRate); 
        console.log("Show Input: " + this.showInput) ;
        if((!isNaN(this.averagePower)) || (!isNaN(this.averageHeartRate))) { 
          this.ftp = this.averagePower * this.ftpPercentage;
          this.showInput = false; 
          console.log("Show Input: " + this.showInput) ;
        }
    }); 

    this.loading = true; 

    this.zonesService.getCycling().subscribe(result => {
      this.cyclingZone = new CyclingX(result);  

      this.ftp = this.averagePower * this.ftpPercentage
      this.cyclingZone.setFtp(this.ftp); 
      this.cyclingZone.setThreshold(this.averageHeartRate);
      this.loading = false;  
      this.CollectInformation();
      console.log(this.rows); 
    }, error => { 
      console.log(error); 
      this.loading = false; 
    });
  }

  HeartRateChange() { 
    this.cyclingZone.setThreshold(this.averageHeartRate); 
    console.log(this.cyclingZone);

    this.CollectInformation();
  }



  AveragePowerChange() { 
    var ftp = Math.round(this.averagePower * this.ftpPercentage);
    this.cyclingZone.setFtp(ftp); 
    console.log(this.cyclingZone);

    this.CollectInformation(); 
  }

  CollectInformation() { 

    this.rows = new Array<any>(); 


    for(var i in this.cyclingZone.HeartRate) { 
      var power = this.cyclingZone.Power[i]; 
      var heartRate = this.cyclingZone.HeartRate[i]; 


      this.rows.push({name: power.name, 
                      powerMin: (isNaN(power.minCalc) ? "" : power.minCalc),
                      powerMax: (isNaN(power.maxCalc) ? "" : power.maxCalc),
                      powerMinPercent: power.min,
                      powerMaxPercent: power.max, 
                      hrMin: (isNaN(heartRate.minCalc) ? "" : heartRate.minCalc), 
                      hrMax: (isNaN(heartRate.maxCalc) ? "" : heartRate.maxCalc),
                      hrMinPercent: heartRate.min, 
                      hrMaxPercent: heartRate.max,
                      class: "mainZones" });

    }

    for(var a = this.cyclingZone.HeartRate.length; a < this.cyclingZone.Power.length; a++) { 
      var power = this.cyclingZone.Power[a]; 
      this.rows.push({
        name: power.name, 
        powerMin: (isNaN(power.minCalc) ? "" : power.minCalc),
        powerMax: (isNaN(power.maxCalc) ? "" : power.maxCalc),
        powerMinPercent: power.min,
        powerMaxPercent: power.max,
        class: "extraZones"
      })
    }
  }
}
