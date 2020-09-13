import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WalletService } from '../wallet.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  links = [
    { title: 'Home', routerLink: '/' },
    { title: 'Forests', routerLink: '/forests' },
    { title: 'Burn', routerLink: '/burn' },
    { title: 'Rebase', routerLink: '/rebase' },
  ];

  constructor(public route: ActivatedRoute, public wallet: WalletService) { }

  ngOnInit(): void {
  }

  connectWallet() {
    this.wallet.connect(() => {}, () => {}, false);
  }
}
