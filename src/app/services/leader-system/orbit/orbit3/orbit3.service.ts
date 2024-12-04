import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OrbitUser } from 'src/app/types/orbit';

@Injectable({
  providedIn: 'root'
})
export class Orbit3Service {

  private investmentAmount = new BehaviorSubject<number>(100);
  currentAmount = this.investmentAmount.asObservable();

  private orbit3Amount = new BehaviorSubject<number>(0);
  currentOrbitAmount = this.orbit3Amount.asObservable();

  readonly ORBIT_RATE_3 = {
    weekly: '0.125',
    monthly: '0.5',
    yearly: '15'
  };

  private readonly ORBIT3_USERS_KEY = 'orbit3_users';
  private readonly ORBIT3_INVESTMENT_KEY = 'orbit3Investment';

  constructor() {}

  updateInvestment(amount: number) {
    this.investmentAmount.next(amount);
  }

  updateOrbitInvestment(amount: number) {
    this.orbit3Amount.next(amount);
    localStorage.setItem(this.ORBIT3_INVESTMENT_KEY, amount.toString());
  }

  resetOrbitInvestment(): void {
    this.orbit3Amount.next(0);
    localStorage.removeItem(this.ORBIT3_USERS_KEY);
    localStorage.removeItem(this.ORBIT3_INVESTMENT_KEY);
  }

  saveOrbitData(users: OrbitUser[], totalAmount: number) {
    localStorage.setItem(this.ORBIT3_USERS_KEY, JSON.stringify(users));
    localStorage.setItem(this.ORBIT3_INVESTMENT_KEY, totalAmount.toString());
    this.orbit3Amount.next(totalAmount);
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
    return this.orbit3Amount.getValue();
  }

  // Método para cargar datos iniciales
  loadSavedInvestment(): void {
    const savedAmount = localStorage.getItem(this.ORBIT3_INVESTMENT_KEY);
    if (savedAmount) {
      this.orbit3Amount.next(Number(savedAmount));
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
