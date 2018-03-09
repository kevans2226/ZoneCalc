import { Pipe, PipeTransform } from '@angular/core';


@Pipe({name: 'transferToTime' })
export class TransformToTime implements PipeTransform {

  transform(value: number, args: string[]) : any { 
    if(!value) return value; 

    var exactSeconds = (value % 60);
     

    var sec = Math.round(exactSeconds * 100) / 100;
    
    var minute = (value - exactSeconds) / 60; 

    var time = minute + ":" + (sec < 10 ? "0" + sec : sec); 
    // console.log("Value: " + value + " exactSeconds: " + exactSeconds + " Seconds to display: " + sec + " Minute: " + minute + " time: " + time);
    return time; 
  }

}
