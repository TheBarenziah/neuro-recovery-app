import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-video',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent {
  authService = inject(AuthService);

}
