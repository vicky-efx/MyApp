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
export class AuthService {
  currentUser$ = new BehaviorSubject<UserPayload | null>(null);
  private isBrowser: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    if (this.isBrowser) {
      const raw = sessionStorage.getItem('currentUser');
      if (raw) this.currentUser$.next(JSON.parse(raw));
    }
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    throw new Error('Method not implemented.');
  }

  login(email: string, password: string) {
    return this.http.post<UserPayload>(`${environment.apiUrl}/auth/login`, { email, password });
  }

  setUser(user: UserPayload) {
    this.currentUser$.next(user);
    if (this.isBrowser) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  logout() {
    this.currentUser$.next(null);
    if (this.isBrowser) sessionStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  getCurrentUser(): UserPayload | null {
    return this.currentUser$.value;
  }

  isLoggedIn(): boolean {
    return !!this.getCurrentUser();
  }
}
