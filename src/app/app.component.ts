import { Component, inject } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';
import { afterNextRender } from '@angular/core';
import { UserInterface } from './user.interface';

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
  ],
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'NeuroRecoveryApp';
  http = inject(HttpClient);
  authService = inject(AuthService);

  constructor() {
    afterNextRender(() => {
      this.authService.user$.subscribe((user) => {
        if (user) {
          // Explicitly cast the object to UserInterface
          const userInfo: UserInterface = {
            email: user.email!,
            displayName: user.displayName!,
          };
          this.authService.currentUserSig.set(userInfo);
        } else {
          this.authService.currentUserSig.set(null);
        }
        // console.log(this.authService.currentUserSig());
      });
    });
  }

  isSidebarOpened: boolean = false;

  toggleSidebar() {
    this.isSidebarOpened = !this.isSidebarOpened;
  }

  logout(): void {
    this.authService.logout();
  }
}
