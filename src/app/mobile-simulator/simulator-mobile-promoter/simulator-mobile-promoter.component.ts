import { Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Orbit1PromoterService } from 'src/app/services/promoter-system/orbit/orbit1/orbit1-promoter.service';
import { Orbit2PromoterService } from 'src/app/services/promoter-system/orbit/orbit2/orbit2-promoter.service';
import { Orbit3PromoterService } from 'src/app/services/promoter-system/orbit/orbit3/orbit3-promoter.service';
import { Orbit4PromoterService } from 'src/app/services/promoter-system/orbit/orbit4/orbit4-promoter.service';
import { Orbit5PromoterService } from 'src/app/services/promoter-system/orbit/orbit5/orbit5-promoter.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-simulator-mobile-promoter',
  templateUrl: './simulator-mobile-promoter.component.html',
  styleUrls: ['./simulator-mobile-promoter.component.scss'],
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
export class SimulatorMobilePromoterComponent {
  @ViewChild('topSection') topSection!: ElementRef;
  @Output() investmentChange = new EventEmitter<number>();

  
  showSimulator = false;
  showErrorMessage = false;
  errorMessage = '';
  private readonly ORBIT_USERS_KEY = 'orbit_users_promoter'; 
  private readonly ORBIT2_USERS_KEY = 'orbit2_users_promoter'; 
  private readonly ORBIT3_USERS_KEY = 'orbit3_users_promoter'; 
  private readonly ORBIT4_USERS_KEY = 'orbit4_users_promoter'; 
  private readonly ORBIT5_USERS_KEY = 'orbit5_users_promoter'; 

   constructor(private orbitService: Orbit1PromoterService , 
    private orbit2Service: Orbit2PromoterService,
    private orbit3Service: Orbit3PromoterService,
    private orbit4Service: Orbit4PromoterService,
    private orbit5Service: Orbit5PromoterService,

     
    ) {}

   ngOnInit() {
    // Recuperar datos del localStorage
    this.resetOrbitData();
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
  currentInvestment: number = 0;
  currentCard: string = 'i-alfa';
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
          this.currentCard = 'i-delta';
          this.weeklyPercentage = '1.25';
          this.monthlyPercentage = '5';
          this.yearlyPercentage = '60';
      } else if (this.currentInvestment >= 4000) {
          this.currentCard = 'i-gamma';
          this.weeklyPercentage = '1';
          this.monthlyPercentage = '4';
          this.yearlyPercentage = '48';
      } else if (this.currentInvestment >= 2000) {
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
  }
 
  private validateOrbitData(): { 
    isValid: boolean; 
    users: any[]; 
    totalInvestment: number; 
    errorMessage?: string 
  } {
    try {
      const savedUsers = localStorage.getItem(this.ORBIT_USERS_KEY);
      let users: any[] = [];
  
      if (savedUsers) {
        try {
          users = JSON.parse(savedUsers);
        } catch (error) {
          console.error('Error al parsear usuarios:', error);
          users = [];
        }
      }
  
      // Verificar si users es un array
      if (!Array.isArray(users)) {
        users = [];
      }
  
      const totalInvestment = users.reduce((sum: number, user: any) => {
        return sum + (Number(user?.investment) || 0);
      }, 0);
  
      // Validar primero la inversión mínima
      if (this.currentInvestment < 1000) {
        return {
          isValid: false,
          users,
          totalInvestment,
          errorMessage: 'Es necesario haber invertido más de $1k para generar ganancias como promotor.'
        };
      }
  
      // Luego validar la cantidad de referidos
      if (users.length < 2) {
        return {
          isValid: false,
          users,
          totalInvestment,
          errorMessage: 'Es necesario tener 2 referidos directos en la órbita 1 y haber invertido más de $1k para generar ganancias como promotor.'
        };
      }
  
      return {
        isValid: true,
        users,
        totalInvestment,
        errorMessage: ''
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
    return this.currentInvestment >= 1000 && this.validateOrbitData().isValid;
  }

  getButtonTooltip(): string {
    if (this.showSimulator) return 'Volver a simular';
    
    const { errorMessage } = this.validateOrbitData();
    return errorMessage || 'Simular';
  }

  toggleSimulator(): void {
    if (!this.isValidToSimulate()) {
      this.showErrorMessage = true;
      this.errorMessage = this.getButtonTooltip();
      return;
    }
  
    if (this.showSimulator) {
      this.resetOrbitData();
      this.showSimulator = false;
      this.showErrorMessage = false;
      console.log('Simulador reseteado');
      return;
    }
  
    this.showSimulator = true;
    this.showErrorMessage = false;
    console.log('Simulador activado');
    
    setTimeout(() => {
      const simulatorElement = document.querySelector('.simulator-section');
      if (simulatorElement) {
        simulatorElement.scrollIntoView({ behavior: 'smooth' });
        console.log('Scroll realizado');
      }
    }, 100);
  }


  private resetOrbitData(): void {
    // Eliminar datos del localStorage uno por uno
    localStorage.removeItem(this.ORBIT_USERS_KEY);
    localStorage.removeItem(this.ORBIT2_USERS_KEY);
    localStorage.removeItem(this.ORBIT3_USERS_KEY);
    localStorage.removeItem(this.ORBIT4_USERS_KEY);
    localStorage.removeItem(this.ORBIT5_USERS_KEY);
  
    // Resetear los servicios
    this.orbitService.resetOrbitInvestment();
    this.orbit2Service.resetOrbitInvestment();
    this.orbit3Service.resetOrbitInvestment();
    this.orbit4Service.resetOrbitInvestment();
    this.orbit5Service.resetOrbitInvestment();
  // Resetear valores locales
  this.currentInvestment = 100;
  this.currentCard = 'i-alfa';
  this.weeklyPercentage = '0.625';
  this.monthlyPercentage = '2.5';
  this.yearlyPercentage = '30';

  // Actualizar el servicio con el valor inicial
  this.orbitService.updateInvestment(this.currentInvestment);

  // Actualizar la vista
  this.updateInvestment({ target: { value: this.currentInvestment } });
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
