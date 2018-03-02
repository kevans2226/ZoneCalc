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
