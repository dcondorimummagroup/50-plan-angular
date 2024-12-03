import { Component } from '@angular/core';

@Component({
  selector: 'app-simulator',
  templateUrl: './simulator.component.html',
  styleUrls: ['./simulator.component.scss']
})
export class SimulatorComponent {
  isCardVisible: boolean = false;
  showCard2: boolean = false;
  showLicenses: boolean = false;

  showInfo() {
    this.isCardVisible = true;
    this.showCard2 = false;
    this.showLicenses = false;
  }

  hideInfo() {
    this.isCardVisible = false;
    this.showCard2 = false;
    this.showLicenses = false;
  }

  showNextCard() {
    this.showCard2 = true;
  }

  showPreviousCard() {
    this.showCard2 = false;
  }
}
