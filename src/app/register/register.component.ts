import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl, NonNullableFormBuilder  } from '@angular/forms';
import { AuthService } from '../auth.service';
import { raw } from 'express';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatabaseService } from '../database.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, 
  MatInputModule, MatFormFieldModule, MatButton, MatCardModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(NonNullableFormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  dbService = inject(DatabaseService);

  form = this.fb.group({
    username: ['', Validators.required],
    email: this.fb.control<string>('', [Validators.required, Validators.email]),
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  }, { validators: RegisterComponent.passwordMatchValidator });

  errorMessage: string | null = null;

  static passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control as FormGroup;
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notMatched: true };
  };
  

  // onSubmit(): void {
  //   const { email, username, password } = this.form.getRawValue();
  //   this.authService.register(email, username, password).subscribe({
  //     next: (user) => {
  //       // Extract relevant data to be saved in the database
  //       const userData = { email, username };
  //       this.dbService.set(`users/${user.uid}`, userData)
  //         .then(() => {
  //           this.router.navigateByUrl('/home');
  //         })
  //         .catch(error => console.error('Error saving user details:', error));
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.code;
  //     }  
  //   });
  // }

  onSubmit(): void {
    if (this.form.valid) {
      const { email, username, password } = this.form.getRawValue();
      this.authService.register(email, username, password).subscribe({
        next: (user) => {
          this.dbService.set(`users/${user.uid}`, { email, username })
            .then(() => this.router.navigateByUrl('/home'))
            .catch(error => console.error('Error saving user details:', error));
        },
        error: (err) => this.errorMessage = err.code
      });
    } else {
      // Handle the case when form is not valid
      console.error('Form is not valid');
    }
  }
  

  hide = true;

}
