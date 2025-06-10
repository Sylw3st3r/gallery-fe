import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { SignUpPayload } from '../models/signup-payload.model';
import { ISignInResposne, SignInPayload } from '../models/signin-payload.model';

export interface DecodedToken {
  exp: number;
  iat: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  private _token: string | null = null;

  constructor(
    private http: HttpClient,
    private readonly _router: Router,
  ) {
    this.initializeToken();
  }

  get token(): string | null {
    return this._token;
  }

  decodeToken(token: string): DecodedToken | null {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  // Check if token is expired
  isTokenExpired(token: string): boolean {
    const decoded = this.decodeToken(token);
    if (!decoded) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  initializeToken() {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token || this.isTokenExpired(token)) return;
    this._token = token;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this._token && !this.isTokenExpired(this._token);
  }

  public signUp(signUpPayload: SignUpPayload) {
    this.http
      .post('http://localhost:5062/api/auth/signup', signUpPayload)
      .subscribe({
        next: (response) => {
          console.log('Sign up successful', response);
        },
        error: (error) => {
          console.error('Sign up failed', error);
        },
      });
  }

  public signIn(signIn: SignInPayload) {
    this.http
      .post<ISignInResposne>('http://localhost:5062/api/auth/signin', signIn)
      .subscribe({
        next: (response) => {
          this._token = response.token;
          localStorage.setItem(this.TOKEN_KEY, this._token);
          this._router.navigate(['dashboard']);
        },
        error: (error) => {
          console.error('Sign up failed', error);
        },
      });
  }

  public signOut() {
    this._token = null;
    localStorage.removeItem(this.TOKEN_KEY);
    this._router.navigate(['']);
  }
}
