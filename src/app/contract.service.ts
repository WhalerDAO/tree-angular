import { Injectable } from '@angular/core';
import { WalletService } from './wallet.service';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor(public wallet: WalletService) { }

  public get TREE() {
    return this.getNamedContract('TREE');
  }

  public get TREEReserve() {
    return this.getNamedContract('TREEReserve');
  }

  public get TREERebaser() {
    return this.getNamedContract('TREERebaser');
  }

  public get ITREEOracle() {
    return this.getNamedContract('ITREEOracle');
  }

  getForest(forestID: string) {
    const abi = require(`../assets/abi/TREERewards.json`);
    const address = this.getForestAddress(forestID);
    return new this.wallet.web3.eth.Contract(abi, address);
  }

  getOldForest(forestID: string) {
    const abi = require(`../assets/abi/TREERewards.json`);
    const address = this.getOldForestAddress(forestID);
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

  getOldForestAddress(forestID: string) {
    const address = require('../assets/addresses.json').oldForests[forestID];
    return address;
  }

  getNamedContract(name: string) {
    const abi = require(`../assets/abi/${name}.json`);
    const address = require('../assets/addresses.json')[name];
    return new this.wallet.web3.eth.Contract(abi, address);
  }

  getNamedToken(name: string) {
    const abi = require(`../assets/abi/ERC20.json`);
    const address = require('../assets/addresses.json')[name];
    return new this.wallet.web3.eth.Contract(abi, address);
  }
}
