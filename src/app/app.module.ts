import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewStartComponent } from './view-start/view-start.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SimulatorComponent } from './simulator/simulator.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SimulatorInvestorComponent } from './simulator-investor/simulator-investor.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewStartComponent,
    SidebarComponent,
    SimulatorComponent,
    LoginComponent,
    RegisterComponent,
    SimulatorInvestorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
