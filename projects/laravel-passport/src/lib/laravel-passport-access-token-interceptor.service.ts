import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LaravelPassportService } from './laravel-passport.service';

@Injectable({
  providedIn: 'root'
})
export class LaravelPassportAccessTokenInterceptorService implements HttpInterceptor {

  constructor(private authService: LaravelPassportService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.authService.getAccessToken();

    if (idToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `${this.authService.getTokenType()} ${this.authService.getAccessToken()}`)
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
