import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrbitUser } from 'src/app/types/orbit';

@Injectable({
  providedIn: 'root'
})
export class Orbit3PromoterService {
  private investmentAmount = new BehaviorSubject<number>(100);
  currentAmount = this.investmentAmount.asObservable();

  private orbitInvestmentAmount = new BehaviorSubject<number>(0);
  currentOrbitAmount = this.orbitInvestmentAmount.asObservable();

  // Constantes

  readonly ORBIT_RATE_3 = {
    weekly: '0.25',
    monthly: '1',
    yearly: '30'
  };


  // Keys específicas para Órbita 3
  private readonly ORBIT3_USERS_KEY = 'orbit3_users';
  private readonly ORBIT3_INVESTMENT_KEY = 'orbit3Investment';

  constructor() {}

  updateInvestment(amount: number) {
    this.investmentAmount.next(amount);
  }

  updateOrbitInvestment(amount: number) {
    this.orbitInvestmentAmount.next(amount);
    localStorage.setItem(this.ORBIT3_INVESTMENT_KEY, amount.toString());
  }

  resetOrbitInvestment(): void {
    this.orbitInvestmentAmount.next(0);
    localStorage.removeItem(this.ORBIT3_USERS_KEY);
    localStorage.removeItem(this.ORBIT3_INVESTMENT_KEY);
  }

  saveOrbitData(users: OrbitUser[], totalAmount: number) {
    localStorage.setItem(this.ORBIT3_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(this.ORBIT3_INVESTMENT_KEY, totalAmount.toString());
    this.orbitInvestmentAmount.next(totalAmount);
  }

  getOrbitUsers(): OrbitUser[] {
    const savedUsers = localStorage.getItem(this.ORBIT3_USERS_KEY);
    return savedUsers ? JSON.parse(savedUsers) : [];
  }

  getOrbitRate3() {
    return this.ORBIT_RATE_3;
  }
  // Métodos auxiliares
  getCurrentInvestment(): number {
    return this.orbitInvestmentAmount.getValue();
  }

  getOrbitErrorMessage(): string | undefined {
    const users = this.getOrbitUsers();
    const minimumUsers = 3; // Define el número mínimo de usuarios requerido
    return users.length < minimumUsers 
      ? `Se requieren al menos ${minimumUsers} usuarios en la órbita. Usuarios actuales: ${users.length}`
      : undefined;
}
  // Método para cargar datos iniciales
  loadSavedInvestment(): void {
    const savedAmount = localStorage.getItem(this.ORBIT3_INVESTMENT_KEY);
    if (savedAmount) {
      this.orbitInvestmentAmount.next(Number(savedAmount));
    }
  }
  // Método para verificar si hay datos guardados
  hasSavedData(): boolean {
    return localStorage.getItem(this.ORBIT3_USERS_KEY) !== null;
  }
  // Método para obtener el total invertido
  getTotalInvestment(): number {
    const users = this.getOrbitUsers();
    return users.reduce((total, user) => total + user.investment, 0);
  }
}
