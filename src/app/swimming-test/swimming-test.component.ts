import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-swimming-test',
  templateUrl: './swimming-test.component.html',
  styleUrls: ['./swimming-test.component.css']
})
export class SwimmingTestComponent implements OnInit {
  public swim1: string; 
  public swim2: string; 
  public swim3: string; 

  public timePattern: string = "^(0?[1-9]|[1-9][0-9]):[0-5]{1}[0-9]{1}(\\.\\d{1,2})?"; 
  public measurements: string = "yards"; 

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public Calculate() : void { 
    var testTimeString = new RegExp(this.timePattern); 
    var stringInput = [this.swim1, this.swim2, this.swim3 ]; 
    var invalidTest = [false, false, false]; 
    var seconds =  [0 ,0,0] ; 

    for(var x in stringInput) { 
      if(!testTimeString.test(stringInput[x])) {
        console.log("Swim " + (x+1) + " Failed Validation");
        invalidTest[x] = true;
        return;  
      } 
      else {
        invalidTest[x] = false;

        var temp = stringInput[x].split(':'); 
        seconds[x] =  parseFloat(temp[1]) + (parseInt(temp[0]) * 60)
      }
    }

    console.log("Good So Far");
    
    this.router.navigate(["/swim/" + this.measurements + "/" + this.swim1 + "/" + this.swim2 + "/" + this.swim3]);
  }
}
