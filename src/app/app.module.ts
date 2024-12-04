import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewStartComponent } from './view-start/view-start.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SimulatorComponent } from './Body/simulator/simulator/simulator.component';
import { LoginComponent } from './Body/login/login.component';
import { RegisterComponent } from './Body/register/register.component';
import { SimulatorInvestorComponent } from './Body/simulator/simulator-investor/simulator-investor.component';
import { LicensesComponent } from './shared/licenses/licenses.component';
import { LicensesSimulatorComponent } from './shared/licenses-simulator/licenses-simulator.component';
import { SimulatorPromoterComponent } from './Body/simulator/simulator-promoter-layer/simulator-promoter/simulator-promoter.component';
import { SimulatorLeaderComponent } from './Body/simulator/simulator-leader-layer/simulator-leader/simulator-leader.component';
import { CardComponent } from './shared/card/card.component';
import { Card2Component } from './shared/card-2/card-2.component';
import { ProfitLeaderComponent } from './Body/simulator/simulator-leader-layer/profit-leader/profit-leader.component';
import { ProfitPromoterComponent } from './Body/simulator/simulator-promoter-layer/profit-promoter/profit-promoter.component';
import { OrbitCardPromoterComponent } from './Body/simulator/simulator-promoter-layer/orbit-card-promoter/orbit-card-promoter.component';
import { OrbitCardLeaderComponent } from './Body/simulator/simulator-leader-layer/orbit-cards/orbit-card-leader/orbit-card-leader.component';
import { FormsModule } from '@angular/forms';
import { OrbitCardLeader2Component } from './Body/simulator/simulator-leader-layer/orbit-cards/orbit-card-leader-2/orbit-card-leader-2.component';
import { OrbitCardLeader3Component } from './Body/simulator/simulator-leader-layer/orbit-cards/orbit-card-leader-3/orbit-card-leader-3.component';
import { OrbitCardLeader4Component } from './Body/simulator/simulator-leader-layer/orbit-cards/orbit-card-leader-4/orbit-card-leader-4.component';
import { OrbitCardLeader5Component } from './Body/simulator/simulator-leader-layer/orbit-cards/orbit-card-leader-5/orbit-card-leader-5.component';
import { OrbitCardLeader6Component } from './Body/simulator/simulator-leader-layer/orbit-cards/orbit-card-leader-6/orbit-card-leader-6.component';
import { OrbitCardLeader7Component } from './Body/simulator/simulator-leader-layer/orbit-cards/orbit-card-leader-7/orbit-card-leader-7.component';
import { OrbitCardLeader8Component } from './Body/simulator/simulator-leader-layer/orbit-cards/orbit-card-leader-8/orbit-card-leader-8.component';
import { OrbitCardLeader9Component } from './Body/simulator/simulator-leader-layer/orbit-cards/orbit-card-leader-9/orbit-card-leader-9.component';
import { OrbitCardLeader10Component } from './Body/simulator/simulator-leader-layer/orbit-cards/orbit-card-leader-10/orbit-card-leader-10.component';


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
    ProfitLeaderComponent,
    ProfitPromoterComponent,
    OrbitCardPromoterComponent,
    OrbitCardLeaderComponent,
    OrbitCardLeader2Component,
    OrbitCardLeader3Component,
    OrbitCardLeader4Component,
    OrbitCardLeader5Component,
    OrbitCardLeader6Component,
    OrbitCardLeader7Component,
    OrbitCardLeader8Component,
    OrbitCardLeader9Component,
    OrbitCardLeader10Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
