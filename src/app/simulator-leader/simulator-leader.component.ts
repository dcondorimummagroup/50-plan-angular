import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-simulator-leader',
  templateUrl: './simulator-leader.component.html',
  styleUrls: ['./simulator-leader.component.scss']
})
export class SimulatorLeaderComponent {
  isCardVisible: boolean = false;
  showCard2: boolean = false;

  showInfo() {
    this.isCardVisible = true;
    this.showCard2 = false;
    document.body.style.overflow = 'hidden';
    document.querySelector('.parent-body-simulator-capa-1')?.classList.add('blur-background');
  }

  hideInfo() {
    this.isCardVisible = false;
    this.showCard2 = false;
    document.body.style.overflow = 'auto';
    document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
  }

  showNextCard() {
    this.showCard2 = true;
  }

  @HostListener('document:keydown.escape')
  onEscapePress() {
    if (this.isCardVisible) {
      this.hideInfo();
    }
  }
}
