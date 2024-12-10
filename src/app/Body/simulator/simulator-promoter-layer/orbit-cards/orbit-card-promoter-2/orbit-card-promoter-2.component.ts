import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Orbit2PromoterService } from 'src/app/services/promoter-system/orbit/orbit2/orbit2-promoter.service';

interface OrbitUser  {
  id: number;
  name: string;
  investment: number;
}

@Component({
  selector: 'app-orbit-card-promoter-2',
  templateUrl: './orbit-card-promoter-2.component.html',
  styleUrls: ['./orbit-card-promoter-2.component.scss']
})
export class OrbitCardPromoter2Component implements OnInit {
  
  @Output() closeModal = new EventEmitter<void>();

  showErrorMessage: boolean = false;
  errorMessage: string = '';
  
  users: OrbitUser[]= [
   

  ];

  private totalInvestment: number = 0;

  constructor(private orbitService: Orbit2PromoterService) {}

  ngOnInit() {
    this.loadSavedData();
  }

  private loadSavedData(): void {
    const savedUsers = this.orbitService.getOrbitUsers();
    if (savedUsers.length > 0) {
      this.users = savedUsers;
      this.calculateTotalInvestment();
    }
  }

  private saveData(): void {
    this.orbitService.saveOrbitData(this.users, this.totalInvestment);
  }

  applyInvestments(): void {
    if (this.users.length < 2) {
      this.showErrorMessage = true;
      this.errorMessage = `Se requieren 2 usuarios. Actualmente hay ${this.users.length}`;
      return;
    }

    this.showErrorMessage = false;
    this.orbitService.updateOrbitInvestment(this.totalInvestment);
    this.saveData();
    
    console.log('Total de Órbita 1 enviado:', this.totalInvestment);
    console.log('Usuarios guardados:', this.users);
    
    this.closeModal.emit();
  }

  private calculateTotalInvestment(): void {
    this.totalInvestment = this.users.reduce((total, user) => {
      return total + (user.investment || 0);
    }, 0);
    
    this.orbitService.updateOrbitInvestment(this.totalInvestment);
    
    console.log('Inversiones Órbita 1:', this.users.map(u => ({
      nombre: u.name,
      monto: u.investment
    })));
    console.log('Total calculado:', this.totalInvestment);
  }

  closeHideOrbitCard() {
    this.closeModal.emit();
  }
  private readonly RANDOM_NAMES = [
    'Ana', 'Carlos', 'María', 'Juan', 'Laura', 
    'Pedro', 'Sofia', 'Diego', 'Valentina', 'Luis',
    'Isabella', 'Gabriel', 'Camila', 'Daniel', 'Paula',
    'Andrés', 'Lucía', 'Miguel', 'Victoria', 'José',
    'Andrea', 'Fernando', 'Carolina', 'Ricardo', 'Elena',
    'Javier', 'Mariana', 'Alberto', 'Patricia', 'David'
  ];

  private getRandomName(): string {
    const randomIndex = Math.floor(Math.random() * this.RANDOM_NAMES.length);
    return this.RANDOM_NAMES[randomIndex];
  }

  addUser(): void {
    const newId = this.users.length + 1;
    this.users.push({
      id: newId,
     name: this.getRandomName(),
     investment: 100
    });
    this.calculateTotalInvestment();
    this.saveData();
  }

  removeUser(index: number): void {
    this.users.splice(index, 1);
    this.updateUserIds();
    this.calculateTotalInvestment();
    this.saveData();
  }

  private updateUserIds(): void {
    this.users = this.users.map((user, index) => ({
      ...user,
      id: index + 1
    }));
  }

  onInvestmentChange(): void {
    this.calculateTotalInvestment();
    this.saveData();
  }

  getTotalInvestment(): number {
    return this.totalInvestment;
  }
}