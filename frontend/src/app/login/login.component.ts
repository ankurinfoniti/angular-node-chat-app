import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Credentials } from '../models/credentials.model';
import { AuthService } from '../auth/auth.service';
import { FormMessageComponent } from '../form-message/form-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormMessageComponent,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loginResult = {
    message: '',
    state: '',
  };

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    const credentials: Credentials = {
      ...this.loginForm.value,
    } as Credentials;

    if (this.loginForm.valid) {
      this.authService.login(credentials).subscribe({
        next: (result) => {
          this.authService.setToken(result.token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          const { message } = err.error;

          this.loginResult = {
            message: message,
            state: 'error',
          };
        },
      });
    }
  }
}
