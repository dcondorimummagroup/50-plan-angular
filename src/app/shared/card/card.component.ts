import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Output() closeCard = new EventEmitter<void>();
  @Output() nextCard = new EventEmitter<void>();
  currentRoute: string = '';
  cardContent = {
    title: '',
    description: '',
    image: '',
    benefits: '',
    earnings: {
      weekly: '',
      monthly: '',
      annual: ''
    }
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.currentRoute = this.router.url;
    this.setCardContent();
  }

  onClose() {
    this.closeCard.emit();
  }

  onNext() {
    this.nextCard.emit();
  }

  private setCardContent() {
    switch (this.currentRoute) {
      case '/simulator-leader':
        this.cardContent = {
          title: '¿Cómo gano siendo Líder?',
          description: 'Para recibir una licencia en Plan 50 necesitas realizar una inversión mínima de 4000 USD, recibiendo así la licencia de Plan 50 Gamma.',
          image: '/assets/image/gamma.svg',
          benefits: 'Con esta licencia tendrás beneficios cada viernes y puedes aumentar tu inversion para conseguir la licencia Gamma',
          earnings: {
            weekly: '1%',
            monthly: '4%',
            annual: '48%'
          }
        };
        break;
      case '/simulator-promoter':
        this.cardContent = {
          title: '¿Cómo gano siendo Promotor?',
          description: 'Para recibir una licencia en Plan 50 necesitas realizar una inversión mínima de 100 USD, recibiendo así la licencia Alfa',
          image: '/assets/image/alfa.svg',
          benefits: 'Beneficios cada viernes y posibilidad de aumentar tu inversión para conseguir licencias con mayores porcentajes',
          earnings: {
            weekly: '0.624%',
            monthly: '2.5%',
            annual: '30%'
          }
        };
        break;
      default:
        this.cardContent = {
          title: '¿Cómo gano siendo Inversor?',
          description: 'Para recibir una licencia en Plan 50 necesitas realizar una inversión mínima de 4000 USD, recibiendo así la licencia de Plan 50 Alfa.',
          image: '/assets/image/alfa.svg',
          benefits: 'Beneficios cada viernes y posibilidad de aumentar tu inversión para conseguir una licencia en Plan 50',
          earnings: {
            weekly: '0.625%',
            monthly: '2.5%',
            annual: '30%'
          }
        };
    }
  }
}
