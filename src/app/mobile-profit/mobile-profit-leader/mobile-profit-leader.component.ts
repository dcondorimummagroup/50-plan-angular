import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Orbit1Service } from 'src/app/services/leader-system/orbit/orbit1/orbit1.service';
import { Orbit2Service } from 'src/app/services/leader-system/orbit/orbit2/orbit2.service';
import { Orbit3Service } from 'src/app/services/leader-system/orbit/orbit3/orbit3.service';
import { Orbit4Service } from 'src/app/services/leader-system/orbit/orbit4/orbit4.service';
import { OrbitOthersService } from 'src/app/services/leader-system/orbit/orbitOthers/orbit-others.service';

@Component({
  selector: 'app-mobile-profit-leader',
  templateUrl: './mobile-profit-leader.component.html',
  styleUrls: ['./mobile-profit-leader.component.scss']
})
export class MobileProfitLeaderComponent {
  @Input() investment: number = 100;
  @Output() scrollUpRequest = new EventEmitter<void>();

  private subscriptions = new Subscription();
  isCardVisible: boolean = false;
  showCard2: boolean = false;
  showLicenses: boolean = false;

// Bloque 1: Inversión Propia
totalCapital: number = 0;
weeklyAmount: number = 0;
monthlyAmount: number = 0;
yearlyAmount: number = 0;

// Bloque 2: Órbita 1 (Afiliados Directos)
orbit1TotalCapital: number = 0;
orbit1WeeklyAmount: number = 0;
orbit1MonthlyAmount: number = 0;
orbit1YearlyAmount: number = 0;

// Bloque 3: Órbitas 2-10 (Afiliados Indirectos)
orbit2TotalCapital: number = 0;
orbit2WeeklyAmount: number = 0;
orbit2MonthlyAmount: number = 0;
orbit2YearlyAmount: number = 0;


currentCard: string = 'alfa';
weeklyPercentage: string = '0.625';
monthlyPercentage: string = '2.5';
yearlyPercentage: string = '30';
constructor(
  private orbit1: Orbit1Service,
  private orbit2: Orbit2Service,
  private orbit3: Orbit3Service,
  private Orbit4: Orbit4Service,
  private Orbit5: OrbitOthersService,
) {}
formatAmount(amount: number): string {
  if (amount === null || amount === undefined) return '0.00';
  
  return amount.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

ngOnInit() {
  // Suscripción para inversión propia
  this.subscriptions.add(
    this.orbit1.currentAmount.subscribe(amount => {
      this.calculateInvestmentAmounts(amount);
    })
  );

  // Suscripción para Órbita 1
  this.subscriptions.add(
    this.orbit1.currentOrbitAmount.subscribe(amount => {
      this.calculateOrbit1Benefits(amount);
    })
  );

  // Suscripciones para Órbitas 2-10
  this.subscribeToIndirectOrbits();
  this.loadInitialData();
}

private calculateInvestmentAmounts(capital: number) {
  // Determinar tipo de tarjeta y porcentajes según el monto
  if (capital >= 6000) {
    this.currentCard = 'delta';
    this.weeklyPercentage = '1.25';
    this.monthlyPercentage = '5';
    this.yearlyPercentage = '60';
  } else if (capital >= 4000) {
    this.currentCard = 'gamma';
    this.weeklyPercentage = '1';
    this.monthlyPercentage = '4';
    this.yearlyPercentage = '48';
  } else if (capital >= 2000) {
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

  // Calcular beneficios según el tipo de tarjeta
  this.weeklyAmount = this.calculatePercentage(capital, parseFloat(this.weeklyPercentage));
  this.monthlyAmount = this.calculatePercentage(capital, parseFloat(this.monthlyPercentage));
  this.yearlyAmount = this.calculatePercentage(capital, parseFloat(this.yearlyPercentage));
  this.totalCapital = capital + this.yearlyAmount;
}

private calculateOrbit1Benefits(capital: number) {
  const rates = this.orbit1.getOrbitRate1();
  
  // Calcular el rendimiento anual
  const yearlyReturn = this.calculatePercentage(capital, parseFloat(rates.yearly));
  // 28000 * 0.30 = 8400
  
  // Capital total = Capital inicial + Rendimiento anual
  this.orbit1TotalCapital = capital + yearlyReturn;
  // 28000 + 8400 = 36400
  
  // Beneficios periódicos
  this.orbit1WeeklyAmount = this.calculatePercentage(capital, parseFloat(rates.weekly));
  // 28000 * 0.00625 = 175
  this.orbit1MonthlyAmount = this.calculatePercentage(capital, parseFloat(rates.monthly));
  // 28000 * 0.025 = 700
  this.orbit1YearlyAmount = yearlyReturn;
  // 8400
}

private loadInitialData() {
  // Cargar datos iniciales de Órbita 1
  const orbit1Users = this.orbit1.getOrbitUsers();
  if (orbit1Users.length > 0) {
    const totalAmount = orbit1Users.reduce((sum, user) => sum + user.investment, 0);
    this.calculateOrbit1Benefits(totalAmount);
  }

  // Calcular beneficios de órbitas indirectas
  this.calculateIndirectOrbitsBenefits();
}

private calculateIndirectOrbitsBenefits() {
  let totalIndirectCapital = 0;
  let totalWeeklyBenefit = 0;
  let totalMonthlyBenefit = 0;
  let totalYearlyBenefit = 0;

  // Órbita 2
  const orbit2Users = this.orbit2.getOrbitUsers();
  const orbit2Capital = this.getTotalOrbitCapital(orbit2Users);
  const rates2 = this.orbit2.getOrbitRate2();
  totalIndirectCapital += orbit2Capital;
  totalWeeklyBenefit += this.calculatePercentage(orbit2Capital, parseFloat(rates2.weekly));
  totalMonthlyBenefit += this.calculatePercentage(orbit2Capital, parseFloat(rates2.monthly));
  totalYearlyBenefit += this.calculatePercentage(orbit2Capital, parseFloat(rates2.yearly));

  // Órbita 3
  const orbit3Users = this.orbit3.getOrbitUsers();
  const orbit3Capital = this.getTotalOrbitCapital(orbit3Users);
  totalIndirectCapital += orbit3Capital;
  totalWeeklyBenefit += this.calculatePercentage(orbit3Capital, 0.125); // 0.125% semanal
  totalMonthlyBenefit += this.calculatePercentage(orbit3Capital, 0.5);  // 0.5% mensual
  totalYearlyBenefit += this.calculatePercentage(orbit3Capital, 6);     // 6% anual

  // Órbitas 4-10
  const orbit4Plus = this.getTotalOrbit4PlusCapital();
  totalIndirectCapital += orbit4Plus;
  totalWeeklyBenefit += this.calculatePercentage(orbit4Plus, 0.05);  // 0.05% semanal
  totalMonthlyBenefit += this.calculatePercentage(orbit4Plus, 0.2);  // 0.2% mensual
  totalYearlyBenefit += this.calculatePercentage(orbit4Plus, 2.4);   // 2.4% anual

  // Actualizar totales del bloque 3
  this.orbit2TotalCapital = totalIndirectCapital;
  this.orbit2WeeklyAmount = totalWeeklyBenefit;
  this.orbit2MonthlyAmount = totalMonthlyBenefit;
  this.orbit2YearlyAmount = totalYearlyBenefit;
}

private getTotalOrbit4PlusCapital(): number {
  // Suma de capitales de órbitas 4-10
  const orbit4Users = this.Orbit4.getOrbitUsers();
  return orbit4Users.reduce((sum, user) => sum + user.investment, 0);
}

private getTotalOrbitCapital(users: any[]): number {
  return users.reduce((sum, user) => sum + user.investment, 0);
}

private subscribeToIndirectOrbits() {
  // Suscribirse a cambios en órbitas 3-10
  this.subscriptions.add(
    this.orbit2.currentOrbitAmount.subscribe(() => {
      this.calculateIndirectOrbitsBenefits();
    })
  );

  this.subscriptions.add(
    this.orbit3.currentOrbitAmount.subscribe(() => {
      this.calculateIndirectOrbitsBenefits();
    })
  );

  this.subscriptions.add(
    this.Orbit4.currentOrbitAmount.subscribe(() => {
      this.calculateIndirectOrbitsBenefits();
    })
  );

  this.subscriptions.add(
    this.Orbit5.currentOrbitAmount.subscribe(() => {
      this.calculateIndirectOrbitsBenefits();
    })
  );
}



private calculatePercentage(amount: number, percentage: number): number {
  return Number((amount * (percentage / 100)).toFixed(2));
}
  // UI Methods
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

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
