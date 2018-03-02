import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-running-test',
  templateUrl: './running-test.component.html',
  styleUrls: ['./running-test.component.css']
})
export class RunningTestComponent implements OnInit {
  public averageHeartRate: number;

  constructor(private router: Router) { }

  ngOnInit() {  }

  public Calculate(): void { 

    this.router.navigate(["/run/" + this.averageHeartRate]);
  }
}
