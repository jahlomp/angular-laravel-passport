import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LaravelPassportService } from './laravel-passport.service';

@Injectable({
  providedIn: 'root'
})
export class LPAuthGuard implements CanActivate {
  loginRoute = '/';

  constructor(private laravelPassportService: LaravelPassportService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.loginRoute = next.data['loginRoute'] as string || this.loginRoute;
    const url: string = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.laravelPassportService.isLoggedIn()) { return true; }

    // Store the attempted URL for redirecting
    this.laravelPassportService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate([this.loginRoute]);
    return false;
  }
}
