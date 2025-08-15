import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  get isLoggedIn() {
    return this._isLoggedIn.asObservable();
  }
}
