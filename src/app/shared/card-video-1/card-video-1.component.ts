import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface Video {
    title: string;
    videoId: string;
    description: string;
    safeUrl: SafeResourceUrl | null;
}

@Component({
    selector: 'app-card-video-1',
    templateUrl: './card-video-1.component.html',
    styleUrls: ['./card-video-1.component.scss']
})
export class CardVideo1Component implements OnInit {
    @Output() closeModal = new EventEmitter<void>();
    currentPage = 0;
    currentVideo!: Video;

    videos: Video[] = [
        {
          title: 'Opinión de experto | Juan Pablo Abudelo',
            videoId: 'zEcYZi_46TA',
            description: 'Descubre cómo nuestros clientes están alcanzando sus metas financieras.',
            safeUrl: null
        },
        {
            
            title: 'Opinión de experto | Rene Ochoa',
            videoId: 'SoytL4qboGg',
            description: 'Experiencias reales de inversores que han transformado su futuro financiero.',
            safeUrl: null
        }
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