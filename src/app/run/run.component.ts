import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RunningX } from '../data-interfaces';
import { ZonesService } from '../zones.service';

@Component({
    selector: 'app-run',
    templateUrl: './run.component.html',
    styleUrls: ['./run.component.css'],
    standalone: false
})
export class RunComponent implements OnInit {
  public averageHeartRate: number; 
  public runZone: RunningX; 
  public loading: boolean; 
  constructor(public route: ActivatedRoute, private zoneService: ZonesService) { }

  ngOnInit() { 
    this.route.params.subscribe(params => { 
      this.averageHeartRate = +params['hr'];
    });

    this.loading = true; 
    this.zoneService.getRunning().subscribe(result => { 
      this.runZone = new RunningX(result); 
      console.log(this.runZone);

      if(!isNaN(this.averageHeartRate)) this.runZone.setThreshold(this.averageHeartRate);
      
      this.loading = false;  
    }); 


  }

  public HeartRateChange() : void { 
    this.runZone.setThreshold(this.averageHeartRate); 
  }

}
