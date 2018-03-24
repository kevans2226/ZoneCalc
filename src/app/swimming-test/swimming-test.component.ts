import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransformToTime } from '../transform-to-time';

@Component({
  selector: 'app-swimming-test',
  templateUrl: './swimming-test.component.html',
  styleUrls: ['./swimming-test.component.css']
})
export class SwimmingTestComponent implements OnInit {
  public swim1: string; 
  public swim2: string; 
  public swim3: string; 
  public threshold: string;
  public timePattern: string = "^(0?[1-9]|[1-9][0-9]):[0-5]{1}[0-9]{1}(\\.\\d{1,2})?"; 
  public measurements: string = "yards"; 
  public seconds: Array<number> = [ 0, 0, 0 ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  ChangeTime(time: string, index: number) { 
    var testTimeString = new RegExp(this.timePattern); 
    if(testTimeString.test(time)) {
      console.log("Hello");
      var temp = time.split(':'); 

      this.seconds[index] = parseFloat(temp[1]) + (parseInt(temp[0]) * 60)
    }

    var totalSecond = 0; 
    var count = 0; 
    this.seconds.forEach(s => { 
      totalSecond += s;
      if(s > 0) count++;  
    })
    
    var average = totalSecond / count; 
    average /= 3;                        // Since the swimmer swam 300 and we want them by the 100's
    console.log(average); 

    this.threshold = new TransformToTime().transform(average, [""]); 
  }

  public Calculate() : void { 
    
    console.log("Good So Far");

    var temp = this.threshold.split(':'); 
    var seconds = parseFloat(temp[1]) + (parseInt(temp[0]) * 60)

    seconds = Math.round(seconds * 100) / 100

    this.router.navigate(["/swim/" + this.measurements + "/" + seconds]);
  }
}
