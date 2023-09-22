import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  fb = inject(FormBuilder);
  autghService = inject(AuthService);

  signupForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  signupLoading = false;
  emailValidating = false;
  signupResult: any;

  ngOnInit() {}

  onSubmit() {
    if (this.signupForm.valid) {
      this.signupLoading = true;
      const newUser = { ...this.signupForm.value } as User;

      this.autghService.signup(newUser).subscribe({
        next: (result) => {
          this.signupLoading = false;
        },
        error: (err) => {
          this.signupLoading = false;
        },
      });
    }
  }
}
