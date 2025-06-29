import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'transferToTime',
    standalone: false
})
export class TransformToTime implements PipeTransform {

  transform(value: number, args: string[]) : any { 
    if(!value) return value; 

    var exactSeconds = (value % 60);
     

    var sec = Math.round(exactSeconds * 100) / 100;
    
    var minute = (value - exactSeconds) / 60; 
    
    var time = minute + ":" + (sec < 9.5 ? "0" + sec.toFixed(0) : sec.toFixed(0)); 
    // console.log("Value: " + value + " exactSeconds: " + exactSeconds + " Seconds to display: " + sec + " Minute: " + minute + " time: " + time);
    return time; 
  }

}
