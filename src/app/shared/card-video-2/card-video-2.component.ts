import { Component, EventEmitter, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Video {
  title: string;
  videoId: string;
  description: string;
  safeUrl: SafeResourceUrl | null;
}


@Component({
  selector: 'app-card-video-2',
  templateUrl: './card-video-2.component.html',
  styleUrls: ['./card-video-2.component.scss']
})


export class CardVideo2Component {
  @Output() closeModal = new EventEmitter<void>();
  currentPage = 0;
  currentVideo!: Video;

  videos: Video[] = [
      {
        title: 'Regístrate con código de afiliado',
          videoId: 'jfUQsFEl_64',
          description: '',
          safeUrl: null
      },
 
  ];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
      this.videos = this.videos.map(video => ({
          ...video,
          safeUrl: this.getSafeUrl(video.videoId)
      }));
      this.updateCurrentVideo();
  }

  private updateCurrentVideo() {
      this.currentVideo = this.videos[this.currentPage];
  }

  getSafeUrl(videoId: string): SafeResourceUrl {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
          `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=0`
      );
  }

  prevPage() {
      if (this.currentPage > 0) {
          this.currentPage--;
          this.updateCurrentVideo();
      }
  }

  nextPage() {
      if (this.hasNextPage) {
          this.currentPage++;
          this.updateCurrentVideo();
      }
  }

  get hasNextPage(): boolean {
      return this.currentPage < this.videos.length - 1;
  }

  onClose(): void {
      this.closeModal.emit();
  }

  stopPropagation(event: Event): void {
      event.stopPropagation();
  }
}
