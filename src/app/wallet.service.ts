import { Injectable, Inject } from '@angular/core';
import { Web3Enabled } from './web3Enabled';
import Web3 from 'web3';
import { WEB3 } from './web3';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class WalletService extends Web3Enabled {

  constructor(@Inject(WEB3) web3: Web3) {
    super(web3);
  }

  userAddress() {
    return this.state.address;
  }

  connected() {
    return !isNullOrUndefined(this.userAddress());
  }
}
