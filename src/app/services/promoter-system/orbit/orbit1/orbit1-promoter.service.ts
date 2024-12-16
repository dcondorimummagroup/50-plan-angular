import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrbitUser } from 'src/app/types/orbit';

@Injectable({
  providedIn: 'root'
})
export class Orbit1PromoterService {
  // BehaviorSubjects principales
  private investmentAmount = new BehaviorSubject<number>(100);
  currentAmount = this.investmentAmount.asObservable();

  private orbitInvestmentAmount = new BehaviorSubject<number>(0);
  currentOrbitAmount = this.orbitInvestmentAmount.asObservable();

  // Constantes
  private readonly MINIMUM_ORBIT_AMOUNT = 1000;
  private readonly STORAGE_KEYS = {
    USERS: 'orbit_users_promoter',
    INVESTMENT: 'orbitInvestment_promoter'
  };

  readonly ORBIT_RATES = {
    weekly: '0.625',
    monthly: '2.5',
    yearly: '30'
  };

  // Métodos principales
  updateInvestment(amount: number) {
    this.investmentAmount.next(amount);
  }

  updateOrbitInvestment(amount: number) {
    this.orbitInvestmentAmount.next(amount);
    localStorage.setItem(this.STORAGE_KEYS.INVESTMENT, amount.toString());
  }

  saveOrbitData(users: OrbitUser[], totalAmount: number) {
    localStorage.setItem(this.STORAGE_KEYS.USERS, JSON.stringify(users));
    this.updateOrbitInvestment(totalAmount);
  }

  getOrbitUsers(): OrbitUser[] {
    try {
      const savedUsers = localStorage.getItem(this.STORAGE_KEYS.USERS);
      return savedUsers ? JSON.parse(savedUsers) : [];
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      return [];
    }
  }

  resetOrbitInvestment(): void {
    this.orbitInvestmentAmount.next(0);
    localStorage.removeItem(this.STORAGE_KEYS.USERS);
    localStorage.removeItem(this.STORAGE_KEYS.INVESTMENT);
  }

  // Validaciones
  isValidInvestment(): boolean {
    return this.orbitInvestmentAmount.getValue() >= this.MINIMUM_ORBIT_AMOUNT;
  }

  getMinimumAmount(): number {
    return this.MINIMUM_ORBIT_AMOUNT;
  }

  getErrorMessage(): string {
    const currentAmount = this.orbitInvestmentAmount.getValue();
    return `El monto total debe ser mayor a ${this.MINIMUM_ORBIT_AMOUNT}. Monto actual: ${currentAmount}`;
  }
}