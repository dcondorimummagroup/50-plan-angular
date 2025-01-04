import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewStartComponent } from './view-start/view-start.component';
import { SimulatorComponent } from './Body/simulator/simulator/simulator.component';
import { LoginComponent } from './Body/login/login.component';
import { RegisterComponent } from './Body/register/register.component';
import { SimulatorInvestorComponent } from './Body/simulator/simulator-investor/simulator-investor.component';

import { SimulatorPromoterComponent } from './Body/simulator/simulator-promoter-layer/simulator-promoter/simulator-promoter.component';
import { SimulatorLeaderComponent } from './Body/simulator/simulator-leader-layer/simulator-leader/simulator-leader.component';
import { MobileProfitLeaderComponent } from './mobile-profit/mobile-profit-leader/mobile-profit-leader.component';


const routes: Routes = [
  { path: '', component: ViewStartComponent },
  { path: 'simulator', component: SimulatorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'simulator-investor', component: SimulatorInvestorComponent },
  { path: 'simulator-promoter', component: SimulatorPromoterComponent },
  { path: 'simulator-leader', component: SimulatorLeaderComponent },
  { path: 'mobile-profit-leader', component: MobileProfitLeaderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Esto hará el scroll automáticamente

    scrollOffset: [0, 0],
  } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
