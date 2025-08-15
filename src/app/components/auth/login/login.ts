import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Por favor, complete todos los campos';
      return;
    }
    this.loading = true;
    this.errorMessage = '';
    this.authService.login(this.username, this.password).subscribe({
      next: (response: any) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.error?.message || 'Error al iniciar sesión';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
