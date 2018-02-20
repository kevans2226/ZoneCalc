import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatMenuModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';

import { AppComponent } from './app.component';
import { CycleComponent } from './cycle/cycle.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component'; 

const appRoutes: Routes = [
  { path: 'cycle', component: CycleComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cycle/:power', component: CycleComponent },
  { path: 'cycle/:power/:hr', component: CycleComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CycleComponent,
    HomeComponent,
  ],
  imports: [
    FormsModule, 
    BrowserModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatMenuModule, 
    MatIconModule, 
    MatToolbarModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MatFormFieldModule]
})
export class AppModule { }
