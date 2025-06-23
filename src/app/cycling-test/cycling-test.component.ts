import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-cycling-test',
    templateUrl: './cycling-test.component.html',
    styleUrls: ['./cycling-test.component.css'],
    standalone: false
})
export class CyclingTestComponent implements OnInit {
  public averagePower: number; 
  public averageHeartRate: number; 
  public ftp: number; 

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Calculate() { 
    console.log(this.averageHeartRate + " " + this.averagePower); 

    this.router.navigate(["/cycle/" + this.averagePower + "/" + this.averageHeartRate]);
  }

  averagePowerChange() { 
    this.ftp = Math.round(this.averagePower * .95); 
  }

  averageFtpChange() { 
    this.averagePower = Math.round(this.ftp / .95); 
  }
}
