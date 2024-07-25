import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-video',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatSelectModule, MatFormFieldModule, CommonModule],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  authService = inject(AuthService);
  sanitizer: DomSanitizer = inject(DomSanitizer);

  bodyParts = ['Hand','Arm', 'Leg','Neck', 'Shoulder']; // Add more as needed
  selectedBodyPart: string = this.bodyParts[0];
  videos: { url: string }[] = [];

  private videoUrls: { [key: string]: { url: string }[] } = {
    'Hand': [
      { url: 'https://www.youtube.com/embed/T9H_yu0Me8c' },
      { url: 'https://www.youtube.com/embed/mIxCSJNbfhU' }
    ],
    'Arm': [
      { url: 'https://www.youtube.com/embed/_ELCjpovYTk' },
      { url: 'https://www.youtube.com/embed/nWJ5qRkBZB0' } // Example YouTube URL
    ],
    'Leg': [
      { url: 'https://www.youtube.com/embed/-rwby0zA6Vs' },
      { url: 'https://www.youtube.com/embed/vhWe_cMtsG8' }
    ],
    'Neck': [
      { url: 'https://www.youtube.com/embed/x8QQJy_00ns' },
      { url: 'https://www.youtube.com/embed/3To3K1NFyis' }
    ],
    'Shoulder': [
      { url: 'https://www.youtube.com/embed/Go9FxcMJhxI' },
      { url: 'https://www.youtube.com/embed/U2JlAJ0x8XQ' }
    ]
  };

  constructor() {
    this.videos = this.videoUrls[this.selectedBodyPart];
  }

  onBodyPartChange(event: any) {
    this.videos = this.videoUrls[this.selectedBodyPart];
  }

  isYouTubeUrl(url: string): boolean {
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  sanitizedUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
