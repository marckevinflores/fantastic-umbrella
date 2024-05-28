import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly authKey = 'isLoggedIn';
  private isLoggedInSubject: BehaviorSubject<boolean>;

  constructor() {
    const storedState = localStorage.getItem(this.authKey);
    const initialState = storedState === 'true';
    this.isLoggedInSubject = new BehaviorSubject<boolean>(initialState);
  }


  login(username: string, password: string): boolean {
    if (username === 'user' && password === 'password') {
      this.isLoggedInSubject.next(true);
      localStorage.setItem(this.authKey, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem(this.authKey);
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }

  getAuthStatus() {
    return this.isLoggedInSubject.asObservable();
  }
}
