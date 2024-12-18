import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-card-2',
  templateUrl: './card-2.component.html',
  styleUrls: ['./card-2.component.scss'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ]),
    trigger('contentAnimation', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class Card2Component implements OnInit {
  @Output() closeCard = new EventEmitter<void>();
  @Output() previousCard = new EventEmitter<void>();
  @Output() nextCard = new EventEmitter<void>();
  currentLicense: 'alfa' | 'beta' | 'gamma' | 'delta' = 'alfa';
  isLeaderRoute: boolean = false;
  isPromoterRoute: boolean = false;
  isClosing = false;
  
  constructor(private router: Router) {}

  ngOnInit() {
    this.isLeaderRoute = this.router.url === '/simulator-leader';
    this.isPromoterRoute = this.router.url === '/simulator-promoter';
    
    if (this.isLeaderRoute) {
      this.currentLicense = 'gamma';
    } else if (this.isPromoterRoute) {
      this.currentLicense = 'alfa';
    }
  }

  cardContent = {
    alfa: {
      title: 'Licencias',
      description: 'Tu inversión verá un aumento gradual gracias al arbitraje financiero y ese aumento es relativo a tu inversión inicial y por ende, tu licencia:',
      image: '/assets/image/alfa.svg',
      investmentRange: '100 - 1999',
      earnings: {
        weekly: '0.625%',
        monthly: '2.5%',
        annual: '30%'
      },
      nextLicense: 'Licencia Beta',
      benefits: 'Siendo Promotor se tiene acceso hasta la licencia Beta. Para desbloquear las demás se necesita una inversión de 4000 USD, siendo así Líder.'
    },
    beta: {
      title: 'Licencias',
      description: 'Tu inversión verá un aumento gradual gracias al arbitraje financiero y ese aumento es relativo a tu inversión inicial y por ende, tu licencia:',
      image: '/assets/image/beta.svg',
      investmentRange: '2000 - 3999',
      earnings: {
        weekly: '0.75%',
        monthly: '3%',
        annual: '36%'
      },
      nextLicense: 'Licencia Gamma',
      benefits: 'Con la licencia Beta aumentan tus beneficios. Para acceder a la licencia Gamma necesitas una inversión de 4000 USD.'
    },
    gamma: {
      title: 'Licencias',
      description: 'Tu inversión verá un aumento gradual gracias al arbitraje financiero y ese aumento es relativo a tu inversión inicial y por ende, tu licencia:',
      image: '/assets/image/gamma.svg',
      investmentRange: '4000 - 6999',
      earnings: {
        weekly: '1%',
        monthly: '4%',
        annual: '48%'
      },
      nextLicense: 'Licencia Delta',
      benefits: 'Con la licencia Gamma obtienes mayores beneficios. La siguiente licencia requiere una inversión de 8000 USD.'
    },
    delta: {
      title: 'Licencias',
      description: 'Tu inversión verá un aumento gradual gracias al arbitraje financiero y ese aumento es relativo a tu inversión inicial y por ende, tu licencia:',
      image: '/assets/image/delta.svg',
      investmentRange: '6000 - 10000',
      earnings: {
        weekly: '1.25%',
        monthly: '5%',
        annual: '60%'
      },
      nextLicense: 'Licencia Superior',
      benefits: 'Con la licencia Delta obtienes los máximos beneficios disponibles en el sistema.'
    }
  };

  get currentContent() {
    return this.cardContent[this.currentLicense];
  }

  onPreviousLicense() {
    if (this.isPromoterRoute) {
      if (this.currentLicense === 'beta') {
        this.currentLicense = 'alfa';
      }
    } else if (this.isLeaderRoute) {
      if (this.currentLicense === 'delta') {
        this.currentLicense = 'gamma';
      }
    }
  }

  onNextLicense() {
    if (this.isPromoterRoute) {
      if (this.currentLicense === 'alfa') {
        this.currentLicense = 'beta';
      }
    } else if (this.isLeaderRoute) {
      if (this.currentLicense === 'gamma') {
        this.currentLicense = 'delta';
      }
    }
  }

  showPreviousButton(): boolean {
    if (this.isPromoterRoute) {
      return this.currentLicense === 'beta';
    }
    if (this.isLeaderRoute) {
      return this.currentLicense === 'delta';
    }
    return false;
  }

  showNextButton(): boolean {
    if (this.isPromoterRoute) {
      return this.currentLicense === 'alfa';
    }
    if (this.isLeaderRoute) {
      return this.currentLicense === 'gamma';
    }
    return false;
  }

  onPreviousCard() {
    this.previousCard.emit();
    console.log('previousCard');
  }

  onClose() {
    this.isClosing = true;
    setTimeout(() => {
      this.closeCard.emit();
    }, 300);
  }
}
