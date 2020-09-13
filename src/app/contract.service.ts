import { Injectable } from '@angular/core';
import { WalletService } from './wallet.service';
import { Wallet } from 'bnc-onboard/dist/src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(public wallet: WalletService) { }

  
  public get TREE() {
    return this.getNamedContract('TREE')
  }

  getForest(forestID: string) {
    const abi = require(`../assets/abi/TREERewards.json`);
    const address = this.getForestAddress(forestID);
    return new this.wallet.web3.eth.Contract(abi, address);
  }

  getForestAddress(forestID: string) {
    const address = require('../assets/addresses.json').forests[forestID];
    return address;
  }

  getForestStakeToken(forestID: string) {
    const abi = require(`../assets/abi/ERC20.json`);
    const address = require('../assets/addresses.json')[forestID];
    return new this.wallet.web3.eth.Contract(abi, address);
  }

  private getNamedContract(name: string) {
    const abi = require(`../assets/abi/${name}.json`);
    const address = require('../assets/addresses.json')[name];
    return new this.wallet.web3.eth.Contract(abi, address);
  }
}
