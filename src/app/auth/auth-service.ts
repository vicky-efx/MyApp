import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

export interface UserPayload {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivate {
  currentUser$ = new BehaviorSubject<UserPayload | null>(null);
  private isBrowser: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    // Only load from localStorage in browser
    if (this.isBrowser) {
      const raw = localStorage.getItem('currentUser');
      if (raw) this.currentUser$.next(JSON.parse(raw));
    }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    throw new Error('Method not implemented.');
  }

  login(email: string, password: string) {
    return this.http.post<UserPayload>(`${environment.apiUrl}/auth/login`, {
      email,
      password,
    });
  }

  setUser(user: UserPayload) {
    this.currentUser$.next(user);

    // Safe in browser only
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  logout() {
    this.currentUser$.next(null);

    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }

    this.router.navigate(['/']);
  }

  getCurrentUser(): UserPayload | null {
    return this.currentUser$.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
