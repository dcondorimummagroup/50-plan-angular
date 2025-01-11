import { Component, ViewChild, ElementRef, HostListener, EventEmitter, Output } from '@angular/core';
import { InvestmentService } from '../../../../services/investment.service';

import { Orbit1Service } from 'src/app/services/leader-system/orbit/orbit1/orbit1.service';
import { Orbit2Service } from 'src/app/services/leader-system/orbit/orbit2/orbit2.service';
import { Orbit3Service } from 'src/app/services/leader-system/orbit/orbit3/orbit3.service';
import { OrbitOthersService } from 'src/app/services/leader-system/orbit/orbitOthers/orbit-others.service';

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
  private readonly ORBIT2_USERS_KEY = 'orbit2_users'; 
  private readonly ORBIT3_USERS_KEY = 'orbit3_users'; 
  private readonly ORBIT4_USERS_KEY = 'orbit4_users'; 

   constructor(private orbitService: Orbit1Service , 
    private orbit2Service: Orbit2Service ,
     private orbit3Service: Orbit3Service,
     private orbit4Service: OrbitOthersService,
    ) {}

   ngOnInit() {
    this.resetOrbitData();
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

  // Orbit Cards
  isOrbitCardVisible: boolean = false; 
  isOrbitCardVisible2: boolean = false; 
  isOrbitCardVisible3: boolean = false; 
  isOrbitCardVisible4: boolean = false; 
  isOrbitCardVisible5: boolean = false; 
  isOrbitCardVisible6: boolean = false; 
  isOrbitCardVisible7: boolean = false; 
  isOrbitCardVisible8: boolean = false; 
  isOrbitCardVisible9: boolean = false; 
  isOrbitCardVisible10: boolean = false; 
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
    try {
      // Obtener y validar usuarios
      const savedUsers = localStorage.getItem(this.ORBIT_USERS_KEY);
      let users: any[] = [];
  
      // Intentar parsear los datos
      if (savedUsers) {
        try {
          const parsedUsers = JSON.parse(savedUsers);
          users = Array.isArray(parsedUsers) ? parsedUsers : [];
        } catch (error) {
          console.error('Error al parsear usuarios:', error);
          users = [];
        }
      }
  
      // Calcular la inversión total de manera segura
      const totalInvestment = users.reduce((sum: number, user: any) => {
        const investment = typeof user?.investment === 'number' ? user.investment : 0;
        return sum + investment;
      }, 0);
  
      // Validar condiciones para Líder
      let errorMessage = '';
      if (users.length < 6 || totalInvestment < 24000) {
        errorMessage = `Es necesario tener 6 referidos y un flujo total de $24k en la órbita 1 para generar ganancias como Líder.`;
      }
  
      return {
        isValid: users.length >= 6 && totalInvestment >= 24000,
        users,
        totalInvestment,
        errorMessage
      };
  
    } catch (error) {
      console.error('Error en validateOrbitData:', error);
      return {
        isValid: false,
        users: [],
        totalInvestment: 0,
        errorMessage: 'Error al procesar los datos de usuarios'
      };
    }
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
    // Eliminar datos del localStorage
    localStorage.removeItem(this.ORBIT_USERS_KEY);
    localStorage.removeItem(this.ORBIT2_USERS_KEY);
    localStorage.removeItem(this.ORBIT3_USERS_KEY);
    localStorage.removeItem(this.ORBIT4_USERS_KEY);
  
    // Resetear los servicios
    this.orbitService.resetOrbitInvestment();
    this.orbit2Service.resetOrbitInvestment();
    this.orbit3Service.resetOrbitInvestment();
    this.orbit4Service.resetOrbitInvestment();

    // Resetear valores
    this.currentInvestment = 100;
    this.currentCard = 'alfa';
    this.weeklyPercentage = '0.625';
    this.monthlyPercentage = '2.5';
    this.yearlyPercentage = '30';

    // Actualizar el servicio
    this.orbitService.updateInvestment(this.currentInvestment);

    // Actualizar el input y su overlay
    const inputElement = document.querySelector('.amount') as HTMLInputElement;
    if (inputElement) {
        inputElement.value = '100.00';
    }

    // Actualizar el overlay con los números
    const integerSpan = document.querySelector('.integer');
    const decimalSpan = document.querySelector('.decimal');
    
    if (integerSpan) integerSpan.textContent = '100';
    if (decimalSpan) decimalSpan.textContent = '.00';

    // Guardar en localStorage
    localStorage.setItem('investment_data', JSON.stringify({
        amount: this.currentInvestment,
        card: this.currentCard,
        weekly: this.weeklyPercentage,
        monthly: this.monthlyPercentage,
        yearly: this.yearlyPercentage
    }));
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

   // Hide Orbit Cards

   hideOrbitCard() {
    this.isOrbitCardVisible = true; 
    document.body.style.overflow = 'auto';
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
  hideOrbitCard3() {
    this.isOrbitCardVisible3 = true; 
        document.body.classList.add('blur-background');
        document.querySelector('.parent-body-simulator-capa-1')?.classList.add('blur-background');
    document.querySelector('#sidebar')?.classList.add('blur-background');
  }
  hideOrbitCard4() {
    this.isOrbitCardVisible4 = true; 
        document.body.classList.add('blur-background');
        document.querySelector('.parent-body-simulator-capa-1')?.classList.add('blur-background');
    document.querySelector('#sidebar')?.classList.add('blur-background');
  }
  hideOrbitCard5() {
    this.isOrbitCardVisible5 = true; 
        document.body.classList.add('blur-background');
        document.querySelector('.parent-body-simulator-capa-1')?.classList.add('blur-background');
    document.querySelector('#sidebar')?.classList.add('blur-background');
  }
  hideOrbitCard6() {
    this.isOrbitCardVisible6 = true; 
        document.body.classList.add('blur-background');
        document.querySelector('.parent-body-simulator-capa-1')?.classList.add('blur-background');
    document.querySelector('#sidebar')?.classList.add('blur-background');
  }
  hideOrbitCard7() {
    this.isOrbitCardVisible7 = true; 
        document.body.classList.add('blur-background');
        document.querySelector('.parent-body-simulator-capa-1')?.classList.add('blur-background');
    document.querySelector('#sidebar')?.classList.add('blur-background');
  }
  hideOrbitCard8() {
    this.isOrbitCardVisible8 = true; 
        document.body.classList.add('blur-background');
        document.querySelector('.parent-body-simulator-capa-1')?.classList.add('blur-background');
    document.querySelector('#sidebar')?.classList.add('blur-background');
  }
  hideOrbitCard9() {
    this.isOrbitCardVisible9 = true; 
        document.body.classList.add('blur-background');
        document.querySelector('.parent-body-simulator-capa-1')?.classList.add('blur-background');
    document.querySelector('#sidebar')?.classList.add('blur-background');
  }
  hideOrbitCard10() {
    this.isOrbitCardVisible10 = true; 
    document.body.style.overflow = 'hidden';
        document.body.classList.add('blur-background');
        document.querySelector('.parent-body-simulator-capa-1')?.classList.add('blur-background');
    document.querySelector('#sidebar')?.classList.add('blur-background');
  }


   // Close Orbit Cards

  closeHideOrbitCard() {
    this.isOrbitCardVisible = false;
    document.body.style.overflow = 'auto';
    document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
    document.querySelector('#sidebar')?.classList.remove('blur-background');
    }
  closeHideOrbitCard2() {
      this.isOrbitCardVisible2 = false;
      document.body.style.overflow = 'auto';
      document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
      document.querySelector('#sidebar')?.classList.remove('blur-background');
  }
  closeHideOrbitCard3() {
    this.isOrbitCardVisible3 = false;
    document.body.style.overflow = 'auto';
    document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
    document.querySelector('#sidebar')?.classList.remove('blur-background');
    }
  closeHideOrbitCard4() {
      this.isOrbitCardVisible4 = false;
      document.body.style.overflow = 'auto';
      document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
      document.querySelector('#sidebar')?.classList.remove('blur-background');
  }
  closeHideOrbitCard5() {
    this.isOrbitCardVisible5 = false;
    document.body.style.overflow = 'auto';
    document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
    document.querySelector('#sidebar')?.classList.remove('blur-background');
    }
  closeHideOrbitCard6() {
      this.isOrbitCardVisible6 = false;
      document.body.style.overflow = 'auto';
      document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
      document.querySelector('#sidebar')?.classList.remove('blur-background');
  }
  closeHideOrbitCard7() {
    this.isOrbitCardVisible7 = false;
    document.body.style.overflow = 'auto';
    document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
    document.querySelector('#sidebar')?.classList.remove('blur-background');
    }
  closeHideOrbitCard8() {
      this.isOrbitCardVisible8 = false;
      document.body.style.overflow = 'auto';
      document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
      document.querySelector('#sidebar')?.classList.remove('blur-background');
  }
  closeHideOrbitCard9() {
    this.isOrbitCardVisible9 = false;
    document.body.style.overflow = 'auto';
    document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
    document.querySelector('#sidebar')?.classList.remove('blur-background');
    }
  closeHideOrbitCard10() {
      this.isOrbitCardVisible10 = false;
      document.body.style.overflow = 'auto';
      document.querySelector('.parent-body-simulator-capa-1')?.classList.remove('blur-background');
      document.querySelector('#sidebar')?.classList.remove('blur-background');
  }


}