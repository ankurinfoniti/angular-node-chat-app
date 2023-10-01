import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { LoginUser } from '../models/user.model';
import { FormMessageComponent } from '../form-message/form-message.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    FormMessageComponent,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  fb = inject(FormBuilder);
  autghService = inject(AuthService);

  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  signupResult = {
    message: '',
    state: '',
  };

  get name() {
    return this.signupForm.get('name');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const newUser = { ...this.signupForm.value } as LoginUser;

      this.autghService.signup(newUser).subscribe({
        next: (result) => {
          this.signupResult = {
            message: result.message,
            state: 'success',
          };
          this.signupForm.reset();
        },
        error: (err) => {
          const { message } = err.error;
          this.signupResult = {
            message: message,
            state: 'error',
          };
        },
      });
    }
  }
}
