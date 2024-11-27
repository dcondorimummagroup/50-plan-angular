import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewStartComponent } from './view-start/view-start.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SimulatorInvestorComponent } from './simulator-investor/simulator-investor.component';

const routes: Routes = [
  { path: '', component: ViewStartComponent },
  { path: 'simulator', component: SimulatorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'simulator-investor', component: SimulatorInvestorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Esto hará el scroll automáticamente
    scrollOffset: [0, 0],
  } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
