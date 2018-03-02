import { Component, OnInit } from '@angular/core';
import { RunningZones } from '../running-zones';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit {
  public averageHeartRate: number; 
  public runningZone: RunningZones; 
  constructor(public route: ActivatedRoute) { }

  ngOnInit() {
    this.runningZone = new RunningZones(); 

    this.route.params.subscribe(params => { 
      this.averageHeartRate = +params['hr'];
 
      this.runningZone.setLacateThreshold(this.averageHeartRate);  
    });
  }

  public HeartRateChange() : void { 
    this.runningZone.setLacateThreshold(this.averageHeartRate); 
  }

}
