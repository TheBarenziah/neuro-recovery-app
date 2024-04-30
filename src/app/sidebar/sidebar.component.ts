import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatSidenavModule, MatToolbarModule, MatSidenav, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isSidebarOpened: boolean = false;
  authService = inject(AuthService);
  router = inject(Router);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isSidebarOpened']) {
      // console.log('Sidebar opened state changed to:', this.isSidebarOpened);
    }
  }

  logout() : void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
