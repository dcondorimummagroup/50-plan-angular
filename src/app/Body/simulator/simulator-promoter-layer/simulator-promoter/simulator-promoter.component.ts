import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-simulator-promoter',
  templateUrl: './simulator-promoter.component.html',
  styleUrls: ['./simulator-promoter.component.scss'],
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
export class SimulatorPromoterComponent {
  @ViewChild('topSection') topSection!: ElementRef;
  
  // Estados
  showSimulator: boolean = false;
  isCardVisible: boolean = false;
  showCard2: boolean = false;
  
  // Propiedades para la inversión
  currentInvestment: number = 100.00;
  currentCard: string = 'alfa';
  weeklyPercentage: string = '0.625';
  monthlyPercentage: string = '2.5';
  yearlyPercentage: string = '30';

  updateInvestment(event: any) {
    const input = event.target as HTMLInputElement;
    this.currentInvestment = parseFloat(input.value) || 0;

    // Actualizar la visualización del overlay
    const integerPart = Math.floor(this.currentInvestment).toString();
    const decimalPart = (this.currentInvestment % 1).toFixed(2).substring(2);
    
    const integerSpan = document.querySelector('.integer');
    const decimalSpan = document.querySelector('.decimal');
    
    if (integerSpan) integerSpan.textContent = integerPart;
    if (decimalSpan) decimalSpan.textContent = `.${decimalPart}`;

    // Actualizar porcentajes según el monto
    if (this.currentInvestment >= 6000) {
      this.currentCard = 'delta';
      this.weeklyPercentage = '1.25';
      this.monthlyPercentage = '5';
      this.yearlyPercentage = '60';
    } else if (this.currentInvestment >= 4000) {
      this.currentCard = 'gamma';
      this.weeklyPercentage = '1';
      this.monthlyPercentage = '4';
      this.yearlyPercentage = '48';
    } else if (this.currentInvestment >= 2000) {
      this.currentCard = 'beta';
      this.weeklyPercentage = '0.75';
      this.monthlyPercentage = '3';
      this.yearlyPercentage = '36';
    } else {
      this.currentCard = 'alfa';
      this.weeklyPercentage = '0.625';
      this.monthlyPercentage = '2.5';
      this.yearlyPercentage = '30';
    }
  }

  toggleSimulator() {
    this.showSimulator = !this.showSimulator;
    
    if (this.showSimulator) {
      setTimeout(() => {
        const simulatorElement = document.querySelector('.simulator-section');
        if (simulatorElement) {
          simulatorElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }

  handleScrollUp() {
    this.topSection.nativeElement.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }

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

  showPreviousCard() {
    this.showCard2 = false;
  }

  @HostListener('document:keydown.escape')
  onEscapePress() {
    if (this.isCardVisible) {
      this.hideInfo();
    }
  }
}
