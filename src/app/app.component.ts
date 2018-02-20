import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Zone Calculator';

  constructor(private router: Router) { }

  ItemClick(route: string) { 
    console.log(route); 
    this.router.navigate(["/" + route]);
  }
}
