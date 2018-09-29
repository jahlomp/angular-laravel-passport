import { Injectable, Inject } from '@angular/core';
import { LaravelPassportConfigService } from './laravel-passport-config.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmailPasswordLoginConfig } from './email-password-login-config';
import { LaravelPassportConfig } from './laravel-passport-config';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LaravelPassportService {

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
    return this.http.post(url, emailPasswordLoginConfig).pipe(
      map(res => {
        localStorage.setItem('ngLaravelPassport', JSON.stringify(res));
        return res;
      })
    );
  }

  isUserLoggedIn(): boolean {
    return Boolean(this.getTokenType() && this.getExpiresIn() && this.getAccessToken() && this.getRefreshToken());
  }

  logout() {
    localStorage.removeItem('ngLaravelPassport');
  }

  getTokenType(): string {
    return JSON.parse(localStorage.getItem('ngLaravelPassport')).token_type;
  }

  getExpiresIn(): number {
    return JSON.parse(localStorage.getItem('ngLaravelPassport')).expires_in;
  }

  getAccessToken(): string {
    return JSON.parse(localStorage.getItem('ngLaravelPassport')).access_token;
  }

  getRefreshToken(): string {
    return JSON.parse(localStorage.getItem('ngLaravelPassport')).refresh_token;
  }
}
