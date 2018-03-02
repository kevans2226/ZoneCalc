import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatFormFieldModule, MatMenuModule, MatIconModule, MatToolbarModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';

import { AppComponent } from './app.component';
import { CycleComponent } from './cycle/cycle.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CyclingTestComponent } from './cycling-test/cycling-test.component';
import { RunningTestComponent } from './running-test/running-test.component';
import { RunComponent } from './run/run.component'; 

const appRoutes: Routes = [
  { path: 'cycle', component: CycleComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cycle/:power', component: CycleComponent },
  { path: 'cycle/:power/:hr', component: CycleComponent },
  { path: 'cycle-test', component: CyclingTestComponent },
  { path: 'running-test', component: RunningTestComponent },
  { path: 'run', component: RunComponent },
  { path: 'run/:hr', component: RunComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    CycleComponent,
    HomeComponent,
    CyclingTestComponent,
    RunningTestComponent,
    RunComponent,
  ],
  imports: [
    FormsModule, 
    BrowserModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatMenuModule, 
    MatIconModule, 
    MatToolbarModule,
    MatButtonModule,
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
