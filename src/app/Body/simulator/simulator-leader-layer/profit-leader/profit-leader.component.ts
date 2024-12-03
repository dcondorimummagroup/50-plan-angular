import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrbitService } from 'src/app/services/leader-system/orbit/orbit.service';
import { OthersOrbitService } from 'src/app/services/leader-system/othersOrbit/others-orbit.service';


@Component({
  selector: 'app-profit-leader',
  templateUrl: './profit-leader.component.html',
  styleUrls: ['./profit-leader.component.scss']
})
export class ProfitLeaderComponent implements OnInit, OnDestroy {
  @Input() investment: number = 100;
  @Output() scrollUpRequest = new EventEmitter<void>();

  private subscriptions = new Subscription();

  // Variables para inversión regular
  totalCapital: number = 0;
  weeklyAmount: number = 0;
  monthlyAmount: number = 0;
  yearlyAmount: number = 0;

  // Variables para Órbita 1
  orbit1TotalCapital: number = 0;
  orbit1WeeklyAmount: number = 0;
  orbit1MonthlyAmount: number = 0;
  orbit1YearlyAmount: number = 0;

  // Variables para Órbita 2
  orbit2TotalCapital: number = 0;
  orbit2WeeklyAmount: number = 0;
  orbit2MonthlyAmount: number = 0;
  orbit2YearlyAmount: number = 0;

  // Variables de control
  isCardVisible: boolean = false;
  showCard2: boolean = false;
  showLicenses: boolean = false;

  // Porcentajes de rendimiento regular
  private readonly WEEKLY_PERCENTAGE: number = 0.625;
  private readonly MONTHLY_PERCENTAGE: number = 2.5;
  private readonly YEARLY_PERCENTAGE: number = 30;

  constructor(
    private orbitService: OrbitService,
    private othersOrbit: OthersOrbitService
  ) {}

  ngOnInit() {
    // Suscripción para inversión regular
    this.subscriptions.add(
      this.orbitService.currentAmount.subscribe(amount => {
        this.calculateRegularAmounts(amount);
      })
    );

    // Suscripción para Órbita 1
    this.subscriptions.add(
      this.orbitService.currentOrbitAmount.subscribe(amount => {
        console.log('Monto de Órbita 1 recibido:', amount);
        this.calculateOrbit1Amounts(amount);
      })
    );

    // Suscripción para Órbita 2
    this.subscriptions.add(
      this.othersOrbit.currentOrbitAmount.subscribe(amount => {
        console.log('Monto de Órbita 2 recibido:', amount);
        this.calculateOrbit2Amounts(amount);
      })
    );

    // Cargar datos iniciales
    this.loadInitialData();
  }

  private loadInitialData() {
    // Cargar datos de Órbita 1
    const orbit1Users = this.orbitService.getOrbitUsers();
    if (orbit1Users.length > 0) {
      const totalAmount = orbit1Users.reduce((sum, user) => sum + user.investment, 0);
      this.calculateOrbit1Amounts(totalAmount);
    }

    // Cargar datos de Órbita 2
    const orbit2Users = this.othersOrbit.getOrbitUsers();
    if (orbit2Users.length > 0) {
      const totalAmount = orbit2Users.reduce((sum, user) => sum + user.investment, 0);
      this.calculateOrbit2Amounts(totalAmount);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['investment']) {
      this.calculateRegularAmounts(this.investment);
    }
  }

  private calculateRegularAmounts(capital: number) {
    this.weeklyAmount = this.calculatePercentage(capital, this.WEEKLY_PERCENTAGE);
    this.monthlyAmount = this.calculatePercentage(capital, this.MONTHLY_PERCENTAGE);
    this.yearlyAmount = this.calculatePercentage(capital, this.YEARLY_PERCENTAGE);
    this.totalCapital = capital + this.yearlyAmount;
  }

  private calculateOrbit1Amounts(capital: number) {
    const rates = this.orbitService.getOrbitRate1();
    this.orbit1WeeklyAmount = this.calculatePercentage(capital, parseFloat(rates.weekly));
    this.orbit1MonthlyAmount = this.calculatePercentage(capital, parseFloat(rates.monthly));
    this.orbit1YearlyAmount = this.calculatePercentage(capital, parseFloat(rates.yearly));
    this.orbit1TotalCapital = capital + this.orbit1YearlyAmount;
  }

  private calculateOrbit2Amounts(capital: number) {
    const rates = this.othersOrbit.getOrbitRate2();
    this.orbit2WeeklyAmount = this.calculatePercentage(capital, parseFloat(rates.weekly));
    this.orbit2MonthlyAmount = this.calculatePercentage(capital, parseFloat(rates.monthly));
    this.orbit2YearlyAmount = this.calculatePercentage(capital, parseFloat(rates.yearly));
    this.orbit2TotalCapital = capital + this.orbit2YearlyAmount;
  }

  private calculatePercentage(amount: number, percentage: number): number {
    return Number((amount * (percentage / 100)).toFixed(2));
  }

  formatAmount(amount: number): string {
    return amount.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
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