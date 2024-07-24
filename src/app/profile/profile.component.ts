import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { DatabaseService } from '../database.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterface } from '../user.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  authService = inject(AuthService);
  dbService = inject(DatabaseService);
  router = inject(Router);
  fb = inject(FormBuilder);

  userProfile: UserInterface | null = null;
  isEditing: boolean = false; // Ensure this is set to false initially

  userProfileForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    dateOfBirth: ['', Validators.required]
  });

  constructor() {
    const user = this.authService.currentUserSig();
    if (user) {
      this.userProfile = user;
      this.userProfileForm.patchValue(user);
    }
  }

  get user(): UserInterface | null {
    return this.authService.currentUserSig() ?? null;
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  editProfile() {
    this.isEditing = true;
  }

  saveProfile() {
    if (this.userProfileForm.valid) {
      const userData = this.userProfileForm.value as UserInterface;
      const userId = this.user?.email; // Use email as user identifier
      if (userId) {
        this.dbService.set(`users/${userId}`, userData)
          .then(() => {
            console.log('User profile updated successfully');
            this.userProfile = userData; // Update the displayed profile data
            this.isEditing = false; // Exit edit mode
          })
          .catch((error) => console.error('Error updating user profile:', error));
      }
    }
  }
}
