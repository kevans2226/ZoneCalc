import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.css']
})
export class CycleComponent implements OnInit {

  public averagePower: number; 
  public averageHeartRate: number; 
  
  ///////////////////
  // Power Setting //
  /////////////////// 
  public ftpPercentage: number = .95;

  public ftp: number; 
  
  public zone1_min: number; 
  public zone1_max: number; 
  public zone2_min: number; 
  public zone2_max: number;
  public zone3_min: number; 
  public zone3_max: number;
  public zone4_min: number; 
  public zone4_max: number;
  public zone5_min: number; 
  public zone5_max: number; 
  public zone6_min: number; 
  public zone6_max: number;
  public zone7_min: number; 
  public zone7_max: number;
  public zone8_min: number;

  constructor(private route: ActivatedRoute) { }

  onHeartRate() { 
    console.log(this.averageHeartRate); 
  }

  ngOnInit() {
    this.route.params.subscribe(params => { 
      this.averagePower = +params['power'];
      this.averageHeartRate = +params['hr'];

      this.AveragePowerChange(); 
    })
  }

  AveragePowerChange() { 
    this.ftp = Math.round(this.averagePower * this.ftpPercentage);

    this.zone1_min = Math.floor(this.ftp * .45);
    this.zone1_max = Math.round(this.ftp * .55);
    this.zone2_min = Math.floor(this.ftp * .56);
    this.zone2_max = Math.round(this.ftp * .75); 
    this.zone3_min = Math.floor(this.ftp * .76); 
    this.zone3_max = Math.round(this.ftp * .90); 
    this.zone4_min = Math.floor(this.ftp * .91); 
    this.zone4_max = Math.round(this.ftp * 1.05);
    this.zone5_min = Math.floor(this.ftp * 1.06); 
    this.zone5_max = Math.round(this.ftp * 1.50);  
    
    
    this.zone6_min = Math.floor(this.ftp * 1.06); 
    this.zone6_max = Math.round(this.ftp * 1.20); 
    this.zone7_min = Math.round(this.ftp * 1.21); 
    this.zone7_max = Math.round(this.ftp * 1.50); 
    this.zone8_min = Math.round(this.ftp * 1.51); 

    console.log(this.ftp); 
  }
}
