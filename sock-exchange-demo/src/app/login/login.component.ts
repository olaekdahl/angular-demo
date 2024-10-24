import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginError: string | null = null;

  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.loginError = 'Login failed. Please check your credentials.';
      }
    });
  }
}