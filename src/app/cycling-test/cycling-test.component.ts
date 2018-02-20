import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cycling-test',
  templateUrl: './cycling-test.component.html',
  styleUrls: ['./cycling-test.component.css']
})
export class CyclingTestComponent implements OnInit {
  public averagePower: number; 
  public averageHeartRate: number; 

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Calculate() { 
    console.log(this.averageHeartRate + " " + this.averagePower); 

    this.router.navigate(["/cycle/" + this.averagePower + "/" + this.averageHeartRate]);
  }
}
