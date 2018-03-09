import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IZone, ICycling, IRunning, ISwimming } from './data-interfaces';

@Injectable()
export class ZonesService {

  constructor(private http: HttpClient) { }

  public getSwimming() { 
      return this.http.get<ISwimming>("/assets/swim.json"); 
  }
  
  public getCycling()  { 
      return this.http.get<ICycling>("/assets/cycle.json"); 
  }

  public getRunning() { 
    return this.http.get<IRunning>("/assets/run.json"); 
  }
}

