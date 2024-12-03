import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-profit-promoter',
  templateUrl: './profit-promoter.component.html',
  styleUrls: ['./profit-promoter.component.scss']
})
export class ProfitPromoterComponent {
  @Input() investment: number = 100;
  @Output() scrollUpRequest = new EventEmitter<void>();

  // Variables para los montos
  totalCapital: number = 0;
  weeklyAmount: number = 0;
  monthlyAmount: number = 0;
  yearlyAmount: number = 0;

  // Variables de control
  isCardVisible: boolean = false;
  showCard2: boolean = false;
  showLicenses: boolean = false;

  // Porcentajes de rendimiento
  private readonly WEEKLY_PERCENTAGE: number = 0.625; // 0.625%
  private readonly MONTHLY_PERCENTAGE: number = 2.5;  // 2.5%
  private readonly YEARLY_PERCENTAGE: number = 30;    // 30%

  ngOnInit() {
    // Inicializar con un capital base (puedes ajustar esto según necesites)
    this.calculateAmounts(1000); // Ejemplo con $1000
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['investment']) {
      this.calculateAmounts(this.investment);
    }
  }

  calculateAmounts(capital: number) {
    this.totalCapital = capital;
    
    // Cálculo de rendimientos
    this.weeklyAmount = this.calculatePercentage(capital, this.WEEKLY_PERCENTAGE);
    this.monthlyAmount = this.calculatePercentage(capital, this.MONTHLY_PERCENTAGE);
    this.yearlyAmount = this.calculatePercentage(capital, this.YEARLY_PERCENTAGE);

    // Actualizar capital total (capital + rendimiento anual)
    this.totalCapital = capital + this.yearlyAmount;
  }

  private calculatePercentage(amount: number, percentage: number): number {
    return Number((amount * (percentage / 100)).toFixed(2));
  }

  // Formatear números para mostrar con 2 decimales y separadores de miles
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
}
