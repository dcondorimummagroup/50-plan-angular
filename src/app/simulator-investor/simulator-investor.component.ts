import { Component, HostListener } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulator-investor',
  templateUrl: './simulator-investor.component.html',
  styleUrls: ['./simulator-investor.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class SimulatorInvestorComponent {
  isCardVisible: boolean = false;
  showCard2: boolean = false;
  showLicenses: boolean = false;

  constructor(private router: Router) {}

  showInfo() {
    this.isCardVisible = true;
    this.showCard2 = false;
    this.showLicenses = false;
    document.body.style.overflow = 'hidden';
    document.querySelector('.parent-body-simulator-capa-1')?.classList.add('blur-background');
  }

  hideInfo() {
    this.isCardVisible = false;
    this.showCard2 = false;
    this.showLicenses = false;
    document.body.style.overflow = 'auto';
    document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
  }

  showNextCard() {
    if (this.router.url === '/simulator-promoter') {
      this.showCard2 = true;
      this.showLicenses = false;
    } else if (this.router.url === '/simulator-investor') {
      this.showLicenses = true;
      this.showCard2 = false;
    }
  }

  @HostListener('document:keydown.escape')
  onEscapePress() {
    if (this.isCardVisible) {
      this.hideInfo();
    }
  }
}
