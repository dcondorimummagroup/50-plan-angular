import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewStartComponent } from './view-start/view-start.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SimulatorInvestorComponent } from './simulator-investor/simulator-investor.component';
import { LicensesComponent } from './shared/licenses/licenses.component';
import { LicensesSimulatorComponent } from './shared/licenses-simulator/licenses-simulator.component';
import { SimulatorPromoterComponent } from './simulator-promoter/simulator-promoter.component';
import { SimulatorLeaderComponent } from './simulator-leader/simulator-leader.component';
import { CardComponent } from './shared/card/card.component';
import { Card2Component } from './shared/card-2/card-2.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewStartComponent,
    SidebarComponent,
    SimulatorComponent,
    LoginComponent,
    RegisterComponent,
    SimulatorInvestorComponent,
    LicensesComponent,
    LicensesSimulatorComponent,
    SimulatorPromoterComponent,
    SimulatorLeaderComponent,
    CardComponent,
    Card2Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
