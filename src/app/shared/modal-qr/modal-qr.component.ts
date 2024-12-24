import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-qr',
  templateUrl: './modal-qr.component.html',
  styleUrls: ['./modal-qr.component.scss']
})
export class ModalQrComponent {
  @Output() closeModal = new EventEmitter<void>();

  currentPage = 0;
  itemsPerPage = 2;

  wallets = [
    {
      title: 'Bitcoin (BTC)',
      address: 'bc1qhmtm0arem6n4k7skv495z5jgg4pqx524zds2w9',  
      qrImage: '/assets/image/btc.png'
  },
  {
      title: 'Ethereum (ETH)',
      address: '0x2D017Ba20F8dDA2377fE7Ce93Fc6f256b2fE03c9',  
      qrImage: '/assets/image/eth.png'
  },
  {
      title: 'Tether TRX (USDT)',
      address: 'TEW4nXecTPETW4QUy1NndeSSLQf7MFZmkv',  
      qrImage: '/assets/image/tethertrx.png'
  },
  {
      title: 'Tether BSC (USDT)',
      address: '0x2D017Ba20F8dDA2377fE7Ce93Fc6f256b2fE03c9',  
      qrImage: '/assets/image/tetherbsc.png'
  },
  {
      title: 'BNB ',
      address: '0x2D017Ba20F8dDA2377fE7Ce93Fc6f256b2fE03c9',  
      qrImage: '/assets/image/bnb.png'
  },  
  {
      title: 'Ripple (XRP)',
      address: 'rhvBDGVHHFmdcEbmsEE5bkEjxKGwoirUHu',  
      qrImage: '/assets/image/ripple.png'
  },
  {
    title: 'USDC',
    address: '0x2D017Ba20F8dDA2377fE7Ce93Fc6f256b2fE03c9',  
    qrImage: '/assets/image/usdc.png'
  },
  {
    title: 'ADA',
    address: 'addr1q9qeyqeawxqayrapmmn7ejy6r53rud77slpvgn7gkj2t6r6pjgpn6uvp6g86rhh8anyf58fz8cmaap7zc38u3dy5h58s6fly3v',  
    qrImage: '/assets/image/ada.png'
  },
  {
    title: 'SOL',
    address: 'FeUzdPEDZPXwcd5WJ84n25ETDzZ8qBDoUbAdPGbkTEBp',  
    qrImage: '/assets/image/sol.png'
  },
  {
    title: 'LCT',
    address: 'LLB3GhC4GXywcMZJ8mwo7YESvNQLENWED2',  
    qrImage: '/assets/image/lct.png'
  },
  {
      title: 'DAI',
      address: '0x2D017Ba20F8dDA2377fE7Ce93Fc6f256b2fE03c9',  
      qrImage: '/assets/image/dai.png'
  }

  ];

  get currentPageWallets() {
    const start = this.currentPage * this.itemsPerPage;
    return this.wallets.slice(start, start + this.itemsPerPage);
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