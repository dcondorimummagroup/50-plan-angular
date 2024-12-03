import { Component, ViewChild, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { InvestmentService } from '../../../../services/investment.service';
import { OrbitService } from 'src/app/services/leader-system/orbit/orbit.service';

@Component({
  selector: 'app-simulator-leader',
  templateUrl: './simulator-leader.component.html',
  styleUrls: ['./simulator-leader.component.scss']
})
export class SimulatorLeaderComponent {
  @ViewChild('topSection') topSection!: ElementRef;
  @Output() investmentChange = new EventEmitter<number>();
  showSimulator = false;
  showErrorMessage = false;
  errorMessage = '';
  private readonly ORBIT_USERS_KEY = 'orbit_users'; 

   constructor(private orbitService: OrbitService) {}

   ngOnInit() {
    // Recuperar datos del localStorage
    const savedData = localStorage.getItem('investment_data');
    if (savedData) {
        const data = JSON.parse(savedData);
        this.currentInvestment = data.amount;
        this.currentCard = data.card;
        this.weeklyPercentage = data.weekly;
        this.monthlyPercentage = data.monthly;
        this.yearlyPercentage = data.yearly;
        
        // Actualizar el servicio con el valor guardado
        this.orbitService.updateInvestment(this.currentInvestment);
    }
}
  // Estados

  isCardVisible: boolean = false;
  showCard2: boolean = false;
  isOrbitCardVisible: boolean = false; 
  isOrbitCardVisible2: boolean = false; 
  // Propiedades para la inversión
  currentInvestment: number = 100.00;
  currentCard: string = 'alfa';
  weeklyPercentage: string = '0.625';
  monthlyPercentage: string = '2.5';
  yearlyPercentage: string = '30';

  updateInvestment(event: any) {
      const input = event.target as HTMLInputElement;
      this.currentInvestment = parseFloat(input.value) || 0;

      this.orbitService.updateInvestment(this.currentInvestment);
      localStorage.setItem('investment_data', JSON.stringify({
          amount: this.currentInvestment,
          card: this.currentCard,
          weekly: this.weeklyPercentage,
          monthly: this.monthlyPercentage,
          yearly: this.yearlyPercentage
      }));

      const integerPart = Math.floor(this.currentInvestment).toString();
      const decimalPart = (this.currentInvestment % 1).toFixed(2).substring(2);
      
      const integerSpan = document.querySelector('.integer');
      const decimalSpan = document.querySelector('.decimal');
      
      if (integerSpan) integerSpan.textContent = integerPart;
      if (decimalSpan) decimalSpan.textContent = `.${decimalPart}`;
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
 
  private validateOrbitData(): { 
    isValid: boolean; 
    users: any[]; 
    totalInvestment: number; 
    errorMessage?: string 
  } {
    const savedUsers = localStorage.getItem(this.ORBIT_USERS_KEY);
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    const totalInvestment = users.reduce((sum: number, user: any) => sum + (user.investment || 0), 0);

    let errorMessage = '';
    if (users.length < 6) {
      errorMessage = `Es necesario tener 6 referidos y un flujo total de $24k en la órbita 1 para generar ganancias como Lider.`;
    } else if (totalInvestment < 24000) {
      errorMessage = `Es necesario tener 6 referidos y un flujo total de $24k en la órbita 1 para generar ganancias como Lider.`;
    }

    return {
      isValid: users.length >= 6 && totalInvestment >= 24000,
      users,
      totalInvestment,
      errorMessage
    };
  }

  isValidToSimulate(): boolean {
    const { isValid } = this.validateOrbitData();
    return isValid;
  }

  getButtonTooltip(): string {
    if (this.showSimulator) return 'Volver a simular';
    
    const { errorMessage } = this.validateOrbitData();
    return errorMessage || 'Simular';
  }

  toggleSimulator(): void {
    // Si el simulador está visible, resetear todo
    if (this.showSimulator) {
      this.resetOrbitData();
      this.showSimulator = false;
      this.showErrorMessage = false;
      console.log('Simulador reseteado');
      return;
    }

    // Validar datos
    const { isValid, errorMessage, users, totalInvestment } = this.validateOrbitData();
    if (!isValid) {
      this.showErrorMessage = true;
      this.errorMessage = errorMessage!;
      console.log(`Error: ${errorMessage}`);
      return;
    }
    // Si todo está bien, mostrar el simulador
    this.showSimulator = true;
    this.showErrorMessage = false;
    console.log('Simulador activado con:', { usuarios: users.length, montoTotal: totalInvestment });
    
    // Scroll al simulador
    setTimeout(() => {
      const simulatorElement = document.querySelector('.simulator-section');
      if (simulatorElement) {
        simulatorElement.scrollIntoView({ behavior: 'smooth' });
        console.log('Scroll realizado');
      }
    }, 100);
  }

  private resetOrbitData(): void {
    localStorage.removeItem(this.ORBIT_USERS_KEY);
    this.orbitService.resetOrbitInvestment();
    console.log('Datos de órbita reseteados');
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
  
  closeHideOrbitCard() {
    this.isOrbitCardVisible = false;
    document.body.style.overflow = 'auto';
    document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
    document.querySelector('#sidebar')?.classList.remove('blur-background');
}
  hideOrbitCard() {
    this.isOrbitCardVisible = true; 
        document.body.classList.add('blur-background');
        document.querySelector('.parent-body-simulator-capa-1')?.classList.add('blur-background');
    document.querySelector('#sidebar')?.classList.add('blur-background');
  }
  hideOrbitCard2() {
    this.isOrbitCardVisible2 = true; 
        document.body.classList.add('blur-background');
        document.querySelector('.parent-body-simulator-capa-1')?.classList.add('blur-background');
    document.querySelector('#sidebar')?.classList.add('blur-background');
  }
  closeHideOrbitCard2() {
    this.isOrbitCardVisible2 = false;
    document.body.style.overflow = 'auto';
    document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
    document.querySelector('#sidebar')?.classList.remove('blur-background');
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
