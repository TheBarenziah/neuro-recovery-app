import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup, FormControl  } from '@angular/forms';
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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatButtonModule, 
  MatInputModule, MatFormFieldModule, MatButton, MatCardModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  dbService = inject(DatabaseService);
  
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  errorMessage: string | null = null;

  onSubmit(): void {
    const { email, username, password } = this.form.getRawValue();
    this.authService.register(email, username, password).subscribe({
      next: (user) => {
        // Extract relevant data to be saved in the database
        const userData = { email, username };
        this.dbService.set(`users/${user.uid}`, userData)
          .then(() => {
            this.router.navigateByUrl('/home');
          })
          .catch(error => console.error('Error saving user details:', error));
      },
      error: (err) => {
        this.errorMessage = err.code;
      }  
    });
  }

  // onSubmit(): void {
  //   const rawForm = this.form.getRawValue()
  //   this.authService
  //   .register(rawForm.email, rawForm.username, rawForm.password)
  //   .subscribe({
  //     next: () => {
  //       this.router.navigateByUrl('/home');
  //     },
      
  //   error: (err) => {
  //       this.errorMessage = err.code;
  //     }  
  //   });
  // }

  hide = true;

  // email = new FormControl('', [Validators.required, Validators.email]);

  // errorMessage = '';

  // updateErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     this.errorMessage = 'You must enter a value';
  //   } else if (this.email.hasError('email')) {
  //     this.errorMessage = 'Not a valid email';
  //   } else {
  //     this.errorMessage = '';
  //   }
  // }
}
