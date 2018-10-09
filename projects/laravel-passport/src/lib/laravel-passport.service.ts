import { Injectable, Inject } from '@angular/core';
import { LaravelPassportConfigService } from './laravel-passport-config.service';
import { HttpClient } from '@angular/common/http';
import { EmailPasswordLoginConfig } from './email-password-login-config';
import { LaravelPassportConfig } from './laravel-passport-config';
import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class LaravelPassportService {

  redirectUrl: string;

  constructor(@Inject(LaravelPassportConfigService) private config: LaravelPassportConfig, private http: HttpClient) { }

  loginWithEmailAndPassword(email: string, password: string): Observable<any> {
    const url = `${this.config.apiRoot}/oauth/token`;
    const emailPasswordLoginConfig: EmailPasswordLoginConfig = {
      grant_type: 'password',
      client_id: this.config.clientId,
      client_secret: this.config.clientSecret,
      username: email,
      password: password,
      scope: ''
    };
    return this.http.post(url, emailPasswordLoginConfig)
      .pipe(
        tap(res => this.setSession),
        shareReplay());
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expires_in, 'second');

    localStorage.setItem('access_token', authResult.access_token);
    localStorage.setItem('refresh_token', authResult.refresh_token);
    localStorage.setItem('token_type', authResult.token_type);
    localStorage.setItem('expires_in', JSON.stringify(expiresAt.valueOf()));
  }


  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('expires_in');
  }

  isLoggedIn(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  getAccessToken(): string {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string {
    return localStorage.getItem('refresh_token');
  }

  getTokenType(): string {
    return localStorage.getItem('token_type');
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_in');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
