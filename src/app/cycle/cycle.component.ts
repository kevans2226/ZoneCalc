import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CyclingZones, ZoneRecord } from '../cycling-zone';
@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {

  public averagePower: number; 
  public averageHeartRate: number; 

  public cyclingZones: CyclingZones; 
  
  public ftpPercentage: number = .95;
  public ftp: number = 0; 
  public int: Array<number>; 

  // // public zone1_min: number = 0; 
  // // public zone1_max: number = 0; 
  // // public zone2_min: number = 0; 
  // // public zone2_max: number = 0;
  // // public zone3_min: number = 0; 
  // // public zone3_max: number = 0;
  // // public zone4_min: number = 0; 
  // // public zone4_max: number = 0;
  // // public zone5_min: number = 0; 
  // // public zone5_max: number = 0; 
  // // public zone6_min: number = 0; 
  // // public zone6_max: number = 0;
  // // public zone7_min: number = 0; 
  // // public zone7_max: number = 0;
  // // public zone8_min: number = 0;

  // // public zone1_min_per: number = .449; 
  // // public zone1_max_per: number = .550; 
  // // public zone2_min_per: number = .559;
  // // public zone2_max_per: number = .750;

  // // public zone3_min_per: number = .759;
  // // public zone3_max_per: number = .90;
  // // public zone4_min_per: number = .909;
  // // public zone4_max_per: number = 1.049;
  // // public zone5_min_per: number = 1.059;
  // // public zone5_max_per: number = 1.50;

  // // public zone6_min_per: number = 1.06;
  // // public zone6_max_per: number = 1.20;
  // // public zone7_min_per: number = 1.21;
  // // public zone7_max_per: number = 1.50;
  // // public zone8_min_per: number = 1.51;  

  // // public heart1_min: number = 0; 
  // // public heart1_max: number = 0;
  // // public heart2_min: number = 0; 
  // // public heart2_max: number = 0;
  // // public heart3_min: number = 0; 
  // // public heart3_max: number = 0;
  // // public heart4_min: number = 0; 
  // // public heart4_max: number = 0;
  // // public heart5_min: number = 0; 
  // // public heart5_max: number = 0;

  public
  constructor(private route: ActivatedRoute) { }

  
  ngOnInit() {
    this.cyclingZones = new CyclingZones(); 

    this.route.params.subscribe(params => { 
        this.averageHeartRate = +params['hr'];
        this.averagePower = +params['power']
      
        var ftp = NaN; 
        if(this.averagePower != NaN) ftp = this.averagePower * this.ftpPercentage;


        this.cyclingZones.setFunctionalThreadhold(ftp); 
        this.cyclingZones.setLacateThreshold(this.averageHeartRate); 
    })

  }

  HeartRateChange() { 
    this.cyclingZones.setLacateThreshold(this.averageHeartRate)
  }



  AveragePowerChange() { 
    var ftp = Math.round(this.averagePower * this.ftpPercentage);
    this.cyclingZones.setFunctionalThreadhold(ftp);
  }
}
