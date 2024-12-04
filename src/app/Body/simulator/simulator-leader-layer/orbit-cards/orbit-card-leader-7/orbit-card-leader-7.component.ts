import { Component, EventEmitter, Output } from '@angular/core';
import { OrbitOthersService } from 'src/app/services/leader-system/orbit/orbitOthers/orbit-others.service';
import { OrbitUser } from 'src/app/types/orbit';

@Component({
  selector: 'app-orbit-card-leader-7',
  templateUrl: './orbit-card-leader-7.component.html',
  styleUrls: ['./orbit-card-leader-7.component.scss']
})
export class OrbitCardLeader7Component {
  @Output() closeModal = new EventEmitter<void>();

  showErrorMessage: boolean = false;
  errorMessage: string = '';
  
  users: OrbitUser[] = [

  ];

  private totalInvestment: number = 0;

  constructor(private othersOrbitService: OrbitOthersService) {}

  ngOnInit() {
    this.loadSavedData();
  }

  private loadSavedData(): void {
    const savedUsers = this.othersOrbitService.getOrbitUsers();
    if (savedUsers.length > 0) {
      this.users = savedUsers;
      this.calculateTotalInvestment();
    }
  }

  private saveData(): void {
    this.othersOrbitService.saveOrbitData(this.users, this.totalInvestment);
  }

  applyInvestments(): void {
    this.showErrorMessage = false;
    this.othersOrbitService.updateOrbitInvestment(this.totalInvestment);
    this.saveData();
    
    console.log('Total de Órbita 2 enviado:', this.totalInvestment);
    console.log('Usuarios Órbita 2 guardados:', this.users);
    
    this.closeModal.emit();
  }

  private calculateTotalInvestment(): void {
    this.totalInvestment = this.users.reduce((total, user) => {
      return total + (user.investment || 0);
    }, 0);
    
    this.othersOrbitService.updateOrbitInvestment(this.totalInvestment);
    
    console.log('Inversiones Órbita 2:', this.users.map(u => ({
      nombre: u.name,
      monto: u.investment
    })));
    console.log('Total calculado Órbita 2:', this.totalInvestment);
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
      investment: 4000
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
