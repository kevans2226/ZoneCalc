import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RunningX } from '../data-interfaces';
import { ZonesService } from '../zones.service';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css']
})
export class RunComponent implements OnInit {
  public averageHeartRate: number; 
  public runZone: RunningX; 
  constructor(public route: ActivatedRoute, private zoneService: ZonesService) { }

  ngOnInit() { 
    this.route.params.subscribe(params => { 
      this.averageHeartRate = +params['hr'];
    });

    this.zoneService.getRunning().subscribe(result => { 
      this.runZone = new RunningX(result); 
      console.log(this.runZone); 
      this.runZone.setThreshold(this.averageHeartRate); 
    }); 


  }

  public HeartRateChange() : void { 
    this.runZone.setThreshold(this.averageHeartRate); 

  }

}
