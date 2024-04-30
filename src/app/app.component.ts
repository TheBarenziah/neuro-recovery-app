import { Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TopbarComponent } from './topbar/topbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { VideoComponent } from './video/video.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    TopbarComponent,
    MatSidenavModule,
    LoginComponent,
    RegisterComponent,
    RouterLink,
    RouterOutlet,
    MatCardModule,
    MatButton,
    VideoComponent,
  ],
  styleUrl: './app.component.css',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'NeuroRecoveryApp';
  http = inject(HttpClient);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.authService.currentUserSig.set({
          email: user.email!,
          username: user.displayName!,
        });
      } else {
        this.authService.currentUserSig.set(null);
      }
      // console.log(this.authService.currentUserSig()); 
    });
  }

  isSidebarOpened: boolean = false;

  toggleSidebar() {
    // console.log('Sidebar toggled from', this.isSidebarOpened, 'to', !this.isSidebarOpened);
    this.isSidebarOpened = !this.isSidebarOpened;
  }
  
  logout() : void {
    this.authService.logout();
  }
  
}
