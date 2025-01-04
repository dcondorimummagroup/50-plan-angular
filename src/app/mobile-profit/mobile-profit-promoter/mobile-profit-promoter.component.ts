import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Orbit1PromoterService } from 'src/app/services/promoter-system/orbit/orbit1/orbit1-promoter.service';
import { Orbit2PromoterService } from 'src/app/services/promoter-system/orbit/orbit2/orbit2-promoter.service';
import { Orbit3PromoterService } from 'src/app/services/promoter-system/orbit/orbit3/orbit3-promoter.service';
import { Orbit4PromoterService } from 'src/app/services/promoter-system/orbit/orbit4/orbit4-promoter.service';
import { Orbit5PromoterService } from 'src/app/services/promoter-system/orbit/orbit5/orbit5-promoter.service';

@Component({
  selector: 'app-mobile-profit-promoter',
  templateUrl: './mobile-profit-promoter.component.html',
  styleUrls: ['./mobile-profit-promoter.component.scss']
})
export class MobileProfitPromoterComponent {
  @Input() investment: number = 100;
  @Output() scrollUpRequest = new EventEmitter<void>();

  public subscriptions = new Subscription();


  totalCapital: number = 0;
  weeklyAmount: number = 0;
  monthlyAmount: number = 0;
  yearlyAmount: number = 0;

  isCardVisible: boolean = false;
  showCard2: boolean = false;
  showLicenses: boolean = false;

  orbitStatus = {
    orbit1: false,
    orbit2: false,
    orbit3: false,
    orbit4: false,
    orbit5: false
  };

  constructor(
    private orbit1Service: Orbit1PromoterService,
    private orbit2Service: Orbit2PromoterService,
    private orbit3Service: Orbit3PromoterService,
    private orbit4Service: Orbit4PromoterService,
    private orbit5Service: Orbit5PromoterService
  ) {}

  ngOnInit() {
  
    this.subscriptions.add(
      this.orbit1Service.currentAmount.subscribe(amount => {
        this.investment = amount;  // Actualiza el valor cuando cambie en el servicio
        this.calculateAmounts(amount);
        this.updateOrbitsStatus();
      })
    );
    
    this.initializeServices();
    this.subscribeToOrbitChanges();
    this.initializeServices();
    this.subscribeToOrbitChanges();
    this.calculateAmounts(this.investment);
    this.updateOrbitsStatus();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  public initializeServices() {
    this.orbit1Service.updateInvestment(this.investment);
    this.orbit2Service.updateInvestment(this.investment);
    this.orbit3Service.updateInvestment(this.investment);
    this.orbit4Service.updateInvestment(this.investment);
    this.orbit5Service.updateInvestment(this.investment);
  }

  public subscribeToOrbitChanges() {
    this.subscriptions.add(
      this.orbit1Service.currentOrbitAmount.subscribe(() => this.calculateAmounts(this.investment))
    );
    this.subscriptions.add(
      this.orbit2Service.currentOrbitAmount.subscribe(() => this.calculateAmounts(this.investment))
    );
    this.subscriptions.add(
      this.orbit3Service.currentOrbitAmount.subscribe(() => this.calculateAmounts(this.investment))
    );
    this.subscriptions.add(
      this.orbit4Service.currentOrbitAmount.subscribe(() => this.calculateAmounts(this.investment))
    );
    this.subscriptions.add(
      this.orbit5Service.currentOrbitAmount.subscribe(() => this.calculateAmounts(this.investment))
    );
 
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['investment']) {
      this.initializeServices();
      this.calculateAmounts(this.investment);
      this.updateOrbitsStatus();
    }
  }

  calculateAmounts(capital: number) {
    let totalWeekly = 0;
    let totalMonthly = 0;

    if (this.isOrbitActive(1)) {
      this.orbit1Service.currentOrbitAmount.subscribe(orbit1Amount => {
        const rates = this.orbit1Service.ORBIT_RATES;
        totalWeekly += this.calculatePercentage(orbit1Amount, parseFloat(rates.weekly));
        totalMonthly += this.calculatePercentage(orbit1Amount, parseFloat(rates.monthly));
      }).unsubscribe();
    }

    if (this.isOrbitActive(2)) {
      this.orbit2Service.currentOrbitAmount.subscribe(orbit2Amount => {
        const rates = this.orbit2Service.ORBIT_RATE_2;  // Cambio aquí
        totalWeekly += this.calculatePercentage(orbit2Amount, parseFloat(rates.weekly));
        totalMonthly += this.calculatePercentage(orbit2Amount, parseFloat(rates.monthly));
      }).unsubscribe();
    }

    if (this.isOrbitActive(3)) {
      this.orbit3Service.currentOrbitAmount.subscribe(orbit3Amount => {
        const rates = this.orbit3Service.ORBIT_RATE_3;  // Cambio aquí
        totalWeekly += this.calculatePercentage(orbit3Amount, parseFloat(rates.weekly));
        totalMonthly += this.calculatePercentage(orbit3Amount, parseFloat(rates.monthly));
      }).unsubscribe();
    }

    if (this.isOrbitActive(4)) {
      this.orbit4Service.currentOrbitAmount.subscribe(orbit4Amount => {
        const rates = this.orbit4Service.ORBIT_RATE_4;  // Cambio aquí
        totalWeekly += this.calculatePercentage(orbit4Amount, parseFloat(rates.weekly));
        totalMonthly += this.calculatePercentage(orbit4Amount, parseFloat(rates.monthly));
      }).unsubscribe();
    }

    if (this.isOrbitActive(5)) {
      this.orbit5Service.currentOrbitAmount.subscribe(orbit5Amount => {
        const rates = this.orbit5Service.ORBIT_RATE_5;  // Cambio aquí
        totalWeekly += this.calculatePercentage(orbit5Amount, parseFloat(rates.weekly));
        totalMonthly += this.calculatePercentage(orbit5Amount, parseFloat(rates.monthly));
      }).unsubscribe();
    }

    this.weeklyAmount = totalWeekly;
    this.monthlyAmount = totalMonthly;
    this.yearlyAmount = totalMonthly * 12;
    this.totalCapital = capital + this.yearlyAmount;
} 

  isOrbitActive(orbitNumber: number): boolean {
    switch (orbitNumber) {
      case 1:
        return this.investment >= 100;
      case 2:
        return this.investment >= 1000 && this.orbit2Service.getOrbitUsers().length >= 2;
      case 3:
        return this.orbit3Service.getOrbitUsers().length >= 3;
      case 4:
        return this.orbit4Service.getOrbitUsers().length >= 4;
      case 5:
        return this.orbit5Service.getOrbitUsers().length >= 5;
      default:
        return false;
    }
  }

  public getOrbitCapital(orbitNumber: number): number {
    let amount = 0;
    switch (orbitNumber) {
      case 1:
        this.orbit1Service.currentOrbitAmount.subscribe(value => amount = value).unsubscribe();
        break;
      case 2:
        this.orbit2Service.currentOrbitAmount.subscribe(value => amount = value).unsubscribe();
        break;
      case 3:
        this.orbit3Service.currentOrbitAmount.subscribe(value => amount = value).unsubscribe();
        break;
      case 4:
        this.orbit4Service.currentOrbitAmount.subscribe(value => amount = value).unsubscribe();
        break;
      case 5:
        this.orbit5Service.currentOrbitAmount.subscribe(value => amount = value).unsubscribe();
        break;
    }
    return amount;
  }

  formatAmount(amount: number): string {
    return amount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  scrollToTop() {
    this.scrollUpRequest.emit();
  }

  showInfo() {
    this.isCardVisible = true;
  }

  hideInfo() {
    this.isCardVisible = false;
    this.showCard2 = false;
    this.showLicenses = false;
  }

  showNextCard() {
    this.showCard2 = true;
  }

  showLicensesCard() {
    this.showLicenses = true;
    this.showCard2 = false;
  }

  public calculatePercentage(amount: number, percentage: number): number {
    return Number((amount * (percentage / 100)).toFixed(2));
  }

  public updateOrbitsStatus(): void {
    this.orbitStatus = {
      orbit1: this.isOrbitActive(1),
      orbit2: this.isOrbitActive(2),
      orbit3: this.isOrbitActive(3),
      orbit4: this.isOrbitActive(4),
      orbit5: this.isOrbitActive(5)
    };
  }

  public calculateOrbitBenefit(orbitNumber: number, percentage: number): number {
    const orbitCapital = this.getOrbitCapital(orbitNumber);
    return this.calculatePercentage(orbitCapital, percentage);
  }

  // Para inversión propia
  calculateOwnInvestment(capital: number) {
    // Determinar porcentajes según el monto
    let weeklyRate = 0.625;  // 2.5% mensual
    let monthlyRate = 2.5;
    let yearlyRate = 30;

    if (capital >= 6000) {
        weeklyRate = 1.25;   // 5% mensual
        monthlyRate = 5;
        yearlyRate = 60;
    } else if (capital >= 4000) {
        weeklyRate = 1;      // 4% mensual
        monthlyRate = 4;
        yearlyRate = 48;
    } else if (capital >= 2000) {
        weeklyRate = 0.75;   // 3% mensual
        monthlyRate = 3;
        yearlyRate = 36;
    }

    const weekly = this.calculatePercentage(capital, weeklyRate);
    const monthly = this.calculatePercentage(capital, monthlyRate);
    const yearly = this.calculatePercentage(capital, yearlyRate);
    const total = capital + yearly;

    return { weekly, monthly, yearly, total };
  }

  // Para órbitas (referidos)
  calculateOrbitAmounts(capital: number) {
    let totalWeekly = 0;
    let totalMonthly = 0;

    // Órbita 1: 2.5% mensual (0.625% semanal)
    if (this.isOrbitActive(1)) {
      this.orbit1Service.currentOrbitAmount.subscribe(orbit1Amount => {
        totalWeekly += this.calculatePercentage(orbit1Amount, 0.625);
        totalMonthly += this.calculatePercentage(orbit1Amount, 2.5);
      }).unsubscribe();
    }

    // Órbita 2: 1% mensual (0.25% semanal)
    if (this.isOrbitActive(2)) {
      this.orbit2Service.currentOrbitAmount.subscribe(orbit2Amount => {
        totalWeekly += this.calculatePercentage(orbit2Amount, 0.25);
        totalMonthly += this.calculatePercentage(orbit2Amount, 1);
      }).unsubscribe();
    }

    // Órbita 3: 0.5% mensual (0.125% semanal)
    if (this.isOrbitActive(3)) {
      this.orbit3Service.currentOrbitAmount.subscribe(orbit3Amount => {
        totalWeekly += this.calculatePercentage(orbit3Amount, 0.125);
        totalMonthly += this.calculatePercentage(orbit3Amount, 0.5);
      }).unsubscribe();
    }

    // Órbita 4: 0.2% mensual (0.05% semanal)
    if (this.isOrbitActive(4)) {
      this.orbit4Service.currentOrbitAmount.subscribe(orbit4Amount => {
        totalWeekly += this.calculatePercentage(orbit4Amount, 0.05);
        totalMonthly += this.calculatePercentage(orbit4Amount, 0.2);
      }).unsubscribe();
    }

    // Órbita 5: 0.2% mensual (0.05% semanal)
    if (this.isOrbitActive(5)) {
      this.orbit5Service.currentOrbitAmount.subscribe(orbit5Amount => {
        totalWeekly += this.calculatePercentage(orbit5Amount, 0.05);
        totalMonthly += this.calculatePercentage(orbit5Amount, 0.2);
      }).unsubscribe();
    }

    const yearly = totalMonthly * 12;
    const total = capital + yearly;

    return {
        weekly: totalWeekly,
        monthly: totalMonthly,
        yearly: yearly,
        total: total
    };
  }
}
