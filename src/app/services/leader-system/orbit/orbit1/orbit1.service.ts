import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrbitUser } from 'src/app/types/orbit';

@Injectable({
  providedIn: 'root'
})
export class Orbit1Service {
  private investmentAmount = new BehaviorSubject<number>(100);
  currentAmount = this.investmentAmount.asObservable();

  private orbitInvestmentAmount = new BehaviorSubject<number>(0);
  currentOrbitAmount = this.orbitInvestmentAmount.asObservable();

  // Constantes
  private readonly MINIMUM_ORBIT_AMOUNT = 24000;
  readonly ORBIT_RATE_1 = {
    weekly: '0.625',
    monthly: '2.5',
    yearly: '30'
  };

  private readonly ORBIT_USERS_KEY = 'orbit_users';
  private readonly ORBIT_INVESTMENT_KEY = 'orbitInvestment';

  updateInvestment(amount: number) {
    this.investmentAmount.next(amount);
  }

  updateOrbitInvestment(amount: number) {
    this.orbitInvestmentAmount.next(amount);
  }

  resetOrbitInvestment(): void {
    this.orbitInvestmentAmount.next(0);
    localStorage.removeItem(this.ORBIT_USERS_KEY);
    localStorage.removeItem(this.ORBIT_INVESTMENT_KEY);
  }

  saveOrbitData(users: OrbitUser[], totalAmount: number) {
    localStorage.setItem(this.ORBIT_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(this.ORBIT_INVESTMENT_KEY, totalAmount.toString());
    this.orbitInvestmentAmount.next(totalAmount);
  }

  getOrbitUsers(): OrbitUser[] {
    const savedUsers = localStorage.getItem(this.ORBIT_USERS_KEY);
    return savedUsers ? JSON.parse(savedUsers) : [];
  }

  getOrbitRate1() {
    return this.ORBIT_RATE_1;
  }

  // Nuevos métodos auxiliares
  getCurrentInvestment(): number {
    return this.orbitInvestmentAmount.getValue();
  }

  hasMinimumAmount(): boolean {
    const currentAmount = this.getCurrentInvestment();
    return currentAmount >= this.MINIMUM_ORBIT_AMOUNT;
  }

  getMinimumAmount(): number {
    return this.MINIMUM_ORBIT_AMOUNT;
  }

  getOrbitErrorMessage(): string | undefined {
    const currentAmount = this.getCurrentInvestment();
    return currentAmount < this.MINIMUM_ORBIT_AMOUNT 
      ? `El monto total debe ser mayor a ${this.MINIMUM_ORBIT_AMOUNT}. Monto actual: ${currentAmount}`
      : undefined;
  }
}
