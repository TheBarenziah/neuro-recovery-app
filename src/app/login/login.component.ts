import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatButton } from '@angular/material/button';
import { AuthService } from '../auth.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, MatIconModule, MatButtonModule, MatInputModule, 
    MatFormFieldModule, MatButton, MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;

  onSubmit(): void {
    const rawForm = this.form.getRawValue()
    this.authService
    .login(rawForm.email, rawForm.password)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/home');
      },
    error: (err) => {
        this.errorMessage = err.code;
      }  
    });
  }

  // email = new FormControl('', [Validators.required, Validators.email]);

//   errorMessage = '';

//   constructor() {
//     merge(this.email.statusChanges, this.email.valueChanges)
//       .pipe(takeUntilDestroyed())
//       .subscribe(() => this.updateErrorMessage());
//   }

//   updateErrorMessage() {
//     if (this.email.hasError('required')) {
//       this.errorMessage = 'You must enter a value';
//     } else if (this.email.hasError('email')) {
//       this.errorMessage = 'Not a valid email';
//     } else {
//       this.errorMessage = '';
//     }
//   }

  }
