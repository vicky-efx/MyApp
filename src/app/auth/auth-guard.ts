import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'];
    const user = this.auth.getCurrentUser();

    if (!user) {
      this.router.navigate(['/']);
      return false;
    }

    if (requiredRole && user.role !== requiredRole) {
      this.router.navigate([user.role === 'ADMIN' ? '/admin' : '/user']);
      return false;
    }

    return true;
  }
}