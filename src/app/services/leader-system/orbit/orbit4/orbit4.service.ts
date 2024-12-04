import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrbitUser } from 'src/app/types/orbit';

@Injectable({
  providedIn: 'root'
})
export class Orbit4Service {
  private investmentAmount = new BehaviorSubject<number>(100);
  currentAmount = this.investmentAmount.asObservable();

  private orbitInvestmentAmount = new BehaviorSubject<number>(0);
  currentOrbitAmount = this.orbitInvestmentAmount.asObservable();

  // Constantes

  readonly ORBIT_RATE_4= {
    weekly: '0.05',
    monthly: '0.2',
    yearly: '30'
  };


  // Keys específicas para Órbita 2
  private readonly ORBIT4_USERS_KEY = 'orbit4_users';
  private readonly ORBIT4_INVESTMENT_KEY = 'orbit4Investment';

  constructor() {}

  updateInvestment(amount: number) {
    this.investmentAmount.next(amount);
  }

  updateOrbitInvestment(amount: number) {
    this.orbitInvestmentAmount.next(amount);
    localStorage.setItem(this.ORBIT4_INVESTMENT_KEY, amount.toString());
  }

  resetOrbitInvestment(): void {
    this.orbitInvestmentAmount.next(0);
    localStorage.removeItem(this.ORBIT4_USERS_KEY);
    localStorage.removeItem(this.ORBIT4_INVESTMENT_KEY);
  }

  saveOrbitData(users: OrbitUser[], totalAmount: number) {
    localStorage.setItem(this.ORBIT4_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(this.ORBIT4_INVESTMENT_KEY, totalAmount.toString());
    this.orbitInvestmentAmount.next(totalAmount);
  }

  getOrbitUsers(): OrbitUser[] {
    const savedUsers = localStorage.getItem(this.ORBIT4_USERS_KEY);
    return savedUsers ? JSON.parse(savedUsers) : [];
  }

  getOrbitRate4() {
    return this.ORBIT_RATE_4;
  }

  // Métodos auxiliares
  getCurrentInvestment(): number {
    return this.orbitInvestmentAmount.getValue();
  }

  // Método para cargar datos iniciales
  loadSavedInvestment(): void {
    const savedAmount = localStorage.getItem(this.ORBIT4_INVESTMENT_KEY);
    if (savedAmount) {
      this.orbitInvestmentAmount.next(Number(savedAmount));
    }
  }
  // Método para verificar si hay datos guardados
  hasSavedData(): boolean {
    return localStorage.getItem(this.ORBIT4_USERS_KEY) !== null;
  }
  // Método para obtener el total invertido
  getTotalInvestment(): number {
    const users = this.getOrbitUsers();
    return users.reduce((total, user) => total + user.investment, 0);
  }
}
