import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  register(username: string, password: string): void {
    const users = this.getUsers();
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
  }

  login(username: string, password: string): boolean {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  private getUsers(): { username: string, password: string }[] {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  }
}
