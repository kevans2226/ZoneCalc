import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';

import { AppComponent } from './app.component';
import { CycleComponent } from './cycle/cycle.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CyclingTestComponent } from './cycling-test/cycling-test.component';
import { RunningTestComponent } from './running-test/running-test.component';
import { RunComponent } from './run/run.component';
import { SwimmingTestComponent } from './swimming-test/swimming-test.component';
import { SwimComponent } from './swim/swim.component';
import { TransformToTime } from './transform-to-time'; 
import { ZonesService } from './zones.service';

const appRoutes: Routes = [
  { path: 'cycle', component: CycleComponent },
  { path: 'home', component: HomeComponent },
  { path: 'cycle/:power', component: CycleComponent },
  { path: 'cycle/:power/:hr', component: CycleComponent },
  { path: 'cycle-test', component: CyclingTestComponent },
  { path: 'running-test', component: RunningTestComponent },
  { path: 'run', component: RunComponent },
  { path: 'run/:hr', component: RunComponent },
  { path: 'swimming-test', component: SwimmingTestComponent },
  { path: 'swim', component: SwimComponent },
  { path: 'swim/:measurement/:swim1/:swim2/:swim3', component: SwimComponent },
  { path: 'swim/:measurement/:threshold', component: SwimComponent },
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
    SwimmingTestComponent,
    SwimComponent,
    TransformToTime
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
    MatOptionModule,
    MatSelectModule, 
    MatExpansionModule,

    MatCheckboxModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
 // <-- debugging purposes only
    )
  ],
  providers: [ ZonesService ],
  bootstrap: [AppComponent],
  exports: [MatFormFieldModule]
})
export class AppModule { }
