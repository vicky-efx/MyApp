import { Component } from '@angular/core';
import { AuthService } from '../auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private Auth: AuthService, private router: Router) { }

  login() {
    this.Auth.login(this.email, this.password).subscribe({
      next: (res: any) => {
        this.Auth.setUser(res);

        if (res.role === 'ADMIN') this.router.navigate(['/admin']);
        else this.router.navigate(['/user']);
      },
      error: () => {
        this.error = "Invalid email or password";
      }
    });
  }
}
