import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isLoggedIn(): boolean {
    // check if user is logged in by checking local storage
    return !!localStorage.getItem('currentUser');
  }

  login(email: string, password: string): boolean {
    // check if user exists and password matches from local storage
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  }

  logout(): boolean {
    // remove current user from local storage
    localStorage.removeItem('currentUser');
    return true;
  }

  register(
    email: string,
    password: string,
    fullName: string,
    companyName: string,
    role: string,
    isEmailVerified: boolean
  ): any {
    // add new user to local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({
      email,
      password,
      fullName,
      companyName,
      role,
      isEmailVerified,
    });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  getCurrentUser(): any {
    // get current user from local storage
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
}
