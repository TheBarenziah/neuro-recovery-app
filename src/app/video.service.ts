import { Injectable } from '@angular/core';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage'; // Import from @angular/fire
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private storage = inject(Storage); // Inject Firebase Storage

  constructor() {}

  getVideoUrl(filePath: string): Promise<string> {
    const videoRef = ref(this.storage, filePath); // Reference to the file
    return getDownloadURL(videoRef); // Get the download URL
  }
}
