import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { VideoComponent } from './video/video.component';
import { authGuard } from './auth.guard';
import { ProfileComponent } from './profile/profile.component'; // New Profile Route

export const routes: Routes = [
  { path: 'login', component: LoginComponent, },
  { path: 'register', component: RegisterComponent},
  { path: 'home', component: HomeComponent, canActivate: [authGuard]},
  { path: 'video', component: VideoComponent, canActivate: [authGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] } // New Profile Route
];