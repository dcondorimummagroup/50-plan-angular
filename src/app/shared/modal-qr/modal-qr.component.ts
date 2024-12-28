import { Component, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-modal-qr',
  templateUrl: './modal-qr.component.html',
  styleUrls: ['./modal-qr.component.scss']
})
export class ModalQrComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  
  private readonly CACHE_KEY = 'qr_wallets_cache';
  currentPage = 0;
  itemsPerPage = 2;
  imagesLoaded = false;
  loadedImages = 0;

  wallets = [
    {
      title: 'Bitcoin (BTC)',
      address: 'bc1qhmtm0arem6n4k7skv495z5jgg4pqx524zds2w9',  
      qrImage: '/assets/image/btc.png',
      loaded: false
    },
    {
      title: 'Ethereum (ETH)',
      address: '0x2D017Ba20F8dDA2377fE7Ce93Fc6f256b2fE03c9',  
      qrImage: '/assets/image/eth.png',
      loaded: false
    },
    {
      title: 'Tether TRX (USDT)',
      address: 'TEW4nXecTPETW4QUy1NndeSSLQf7MFZmkv',  
      qrImage: '/assets/image/tethertrx.png',
      loaded: false
    },
    {
      title: 'Tether BSC (USDT)',
      address: '0x2D017Ba20F8dDA2377fE7Ce93Fc6f256b2fE03c9',  
      qrImage: '/assets/image/tetherbsc.png',
      loaded: false
    },
    {
      title: 'BNB',
      address: '0x2D017Ba20F8dDA2377fE7Ce93Fc6f256b2fE03c9',  
      qrImage: '/assets/image/bnb.png',
      loaded: false
    },
    {
      title: 'Ripple (XRP)',
      address: 'rhvBDGVHHFmdcEbmsEE5bkEjxKGwoirUHu',  
      qrImage: '/assets/image/ripple.png',
      loaded: false
    },
    {
      title: 'USDC',
      address: '0x2D017Ba20F8dDA2377fE7Ce93Fc6f256b2fE03c9',  
      qrImage: '/assets/image/usdc.png',
      loaded: false
    },
    {
      title: 'ADA',
      address: 'addr1q9qeyqeawxqayrapmmn7ejy6r53rud77slpvgn7gkj2t6r6pjgpn6uvp6g86rhh8anyf58fz8cmaap7zc38u3dy5h58s6fly3v',  
      qrImage: '/assets/image/ada.png',
      loaded: false
    },
    {
      title: 'SOL',
      address: 'FeUzdPEDZPXwcd5WJ84n25ETDzZ8qBDoUbAdPGbkTEBp',  
      qrImage: '/assets/image/sol.png',
      loaded: false
    },
    {
      title: 'LCT',
      address: 'LLB3GhC4GXywcMZJ8mwo7YESvNQLENWED2',  
      qrImage: '/assets/image/lct.png',
      loaded: false
    },
    {
      title: 'DAI',
      address: '0x2D017Ba20F8dDA2377fE7Ce93Fc6f256b2fE03c9',  
      qrImage: '/assets/image/dai.png',
      loaded: false
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadImagesWithCache();
  }

  private loadImagesWithCache() {
    // Intentar cargar desde caché
    const cachedData = localStorage.getItem(this.CACHE_KEY);
    
    if (cachedData) {
      const cachedWallets = JSON.parse(cachedData);
      this.wallets = cachedWallets;
      this.imagesLoaded = true;
      this.loadedImages = this.wallets.length;
      this.cdr.markForCheck();
    } else {
      // Si no hay caché, cargar y cachear las imágenes
      this.preloadAndCacheImages();
    }
  }

  private preloadAndCacheImages(): void {
    const imagePromises = this.wallets.map(wallet => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        
        img.onload = () => {
          wallet.loaded = true;
          this.loadedImages++;
          
          if (this.loadedImages === this.wallets.length) {
            // Guardar en caché cuando todas las imágenes estén cargadas
            localStorage.setItem(this.CACHE_KEY, JSON.stringify(this.wallets));
            this.imagesLoaded = true;
            this.cdr.markForCheck();
          }
          resolve();
        };

        img.onerror = () => {
          wallet.loaded = false;
          resolve();
        };

        img.src = wallet.qrImage;
      });
    });

    // Esperar a que todas las imágenes se carguen
    Promise.all(imagePromises).then(() => {
      console.log('Todas las imágenes han sido procesadas');
    });
  }

  // Método para limpiar caché si es necesario
  clearCache() {
    localStorage.removeItem(this.CACHE_KEY);
    this.loadImagesWithCache();
  }

  get currentPageWallets() {
    const start = this.currentPage * this.itemsPerPage;
    return this.wallets.slice(start, start + this.itemsPerPage);
  }

  get loadingProgress() {
    return Math.round((this.loadedImages / this.wallets.length) * 100);
  }

  get hasNextPage() {
    return (this.currentPage + 1) * this.itemsPerPage < this.wallets.length;
  }

  get totalPages() {
    return Math.ceil(this.wallets.length / this.itemsPerPage);
  }

  get currentPageNumber() {
    return this.currentPage + 1;
  }

  nextPage() {
    if (this.hasNextPage) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  onClose() {
    this.closeModal.emit();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  goToFirstPage() {
    this.currentPage = 0;
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
  }
}