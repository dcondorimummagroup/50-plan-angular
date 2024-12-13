import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simulator-mobile-leader',
  templateUrl: './simulator-mobile-leader.component.html',
  styleUrls: ['./simulator-mobile-leader.component.scss']
})
export class SimulatorMobileLeaderComponent {
  isCardVisible: boolean = false;
  showCard2: boolean = false;
  showLicenses: boolean = false;
  private isFirstClick = true;
  currentCard = 'i-gamma';

  weeklyPercentage = '0.625';
  monthlyPercentage = '2.5';
  yearlyPercentage = '30';

  weeklyAmount = '0.63';
  monthlyAmount = '2.50';
  yearlyAmount = '30.00';
  totalCapital = '130.00';

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
  showPreviousCard() {
    if (this.router.url === '/simulator-promoter') {
      this.showCard2 = false;
      this.showLicenses = false;
    }else if (this.router.url === '/simulator-investor') {
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

  updateInvestment(event: any) {
    const input = event.target as HTMLInputElement;
    const value = parseFloat(input.value);
    
    if (this.isFirstClick) {
      input.value = '';
      this.isFirstClick = false;
    }

    if (!isNaN(value)) {
      if (value >= 6000) {
        this.currentCard = 'i-delta';
        this.weeklyPercentage = '1.25';
        this.monthlyPercentage = '5';
        this.yearlyPercentage = '60';
      
      } else if (value >= 4000) {
        this.currentCard = 'i-gamma';
        this.weeklyPercentage = '1';
        this.monthlyPercentage = '4';
        this.yearlyPercentage = '48';
     
      } else if (value >= 2000) {
        this.currentCard = 'i-beta';
        this.weeklyPercentage = '0.75';
        this.monthlyPercentage = '3';
        this.yearlyPercentage = '36';
    
      } else {
        this.currentCard = 'i-alfa';
        this.weeklyPercentage = '0.625';
        this.monthlyPercentage = '2.5';
        this.yearlyPercentage = '30';
      }

      this.weeklyAmount = (value * parseFloat(this.weeklyPercentage) / 100).toFixed(2);
      this.monthlyAmount = (value * parseFloat(this.monthlyPercentage) / 100).toFixed(2);
      this.yearlyAmount = (value * parseFloat(this.yearlyPercentage) / 100).toFixed(2);
      
      this.totalCapital = (value + parseFloat(this.yearlyAmount)).toFixed(2);
    }
   
  }

}
