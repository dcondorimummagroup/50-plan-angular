import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewStartComponent } from './view-start/view-start.component';
import { SimulatorComponent } from './Body/simulator/simulator/simulator.component';
import { LoginComponent } from './Body/login/login.component';
import { RegisterComponent } from './Body/register/register.component';
import { SimulatorInvestorComponent } from './Body/simulator/simulator-investor/simulator-investor.component';
import { LicensesComponent } from './shared/licenses/licenses.component';
import { SimulatorPromoterComponent } from './Body/simulator/simulator-promoter-layer/simulator-promoter/simulator-promoter.component';
import { SimulatorLeaderComponent } from './Body/simulator/simulator-leader-layer/simulator-leader/simulator-leader.component';
import { CardComponent } from './shared/card/card.component';
import { Card2Component } from './shared/card-2/card-2.component';
import { OrbitCardLeaderComponent } from './Body/simulator/simulator-leader-layer/orbit-cards/orbit-card-leader/orbit-card-leader.component';
import { CarouselCardsComponent } from './carousel/carousel-cards/carousel-cards.component';
import { CarouselStrategyComponent } from './carousel/carousel-strategy/carousel-strategy.component';
import { CarouselCustomersComponent } from './carousel/carousel-customers/carousel-customers.component';
import { CarouselSimulatorComponent } from './carousel/carousel-simulator/carousel-simulator.component';
import { ViewStartMobileComponent } from './view-start-mobile/view-start-mobile.component';
import { SimulatorMobileInvestorComponent } from './mobile-simulator/simulator-mobile-investor/simulator-mobile-investor.component';
import { SimulatorMobileLeaderComponent } from './mobile-simulator/simulator-mobile-leader/simulator-mobile-leader.component';
import { SimulatorMobilePromoterComponent } from './mobile-simulator/simulator-mobile-promoter/simulator-mobile-promoter.component';
import { MobileOrbitLeaderComponent } from './mobile-orbit/mobile-orbit-leader/mobile-orbit-leader.component';
import { MobileOrbitPromoterComponent } from './mobile-orbit/mobile-orbit-promoter/mobile-orbit-promoter.component';
import { StartCardComponent } from './shared/start-card/start-card.component';
import { ModalQrComponent } from './shared/modal-qr/modal-qr.component';

const routes: Routes = [
  { path: '', component: ViewStartComponent },
  { path: 'simulator', component: SimulatorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'simulator-investor', component: SimulatorInvestorComponent },
  { path: 'simulator-promoter', component: SimulatorPromoterComponent },
  { path: 'simulator-leader', component: SimulatorLeaderComponent },
  { path: 'licenses', component: LicensesComponent },
  { path: 'card', component: CardComponent },
  { path: 'card-2', component: Card2Component },
  { path: 'orbit-card-leader', component: OrbitCardLeaderComponent},
  { path: 'carousel-cards', component: CarouselCardsComponent},
  { path: 'carousel-strategy', component: CarouselStrategyComponent},
  { path: 'carousel-customers', component: CarouselCustomersComponent},
  { path: 'carousel-simulator', component: CarouselSimulatorComponent},
  { path: 'view-start-mobile', component: ViewStartMobileComponent},
  { path: 'simulator-mobile-investor', component: SimulatorMobileInvestorComponent},
  { path: 'simulator-mobile-leader', component: SimulatorMobileLeaderComponent},
  { path: 'simulator-mobile-promoter', component: SimulatorMobilePromoterComponent},
  { path: 'mobile-orbit-leader', component: MobileOrbitLeaderComponent },
  { path: 'mobile-orbit-promoter', component: MobileOrbitPromoterComponent },
  { path: 'start-card', component: StartCardComponent},
  { path: 'modal-qr', component: ModalQrComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Esto hará el scroll automáticamente

    scrollOffset: [0, 0],
  } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
