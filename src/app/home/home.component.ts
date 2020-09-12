import { Component, OnInit } from '@angular/core';
import BigNumber from 'bignumber.js';
import { WalletService } from '../wallet.service';
import { ContractService } from '../contract.service';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  treeBalance: BigNumber;
  treeSupply: BigNumber;
  pendingHarvest: BigNumber;

  constructor(public wallet: WalletService, public contract: ContractService, public constants: ConstantsService) {
    this.resetData();
  }

  ngOnInit(): void {
    if (this.wallet.connected) {
      this.loadData();
    }
    this.wallet.connectedEvent.subscribe(() => {
      this.loadData();
    });
    this.wallet.errorEvent.subscribe(() => {
      this.resetData();
    });
  }

  async loadData() {
    this.treeBalance = new BigNumber(await this.contract.TREE.methods.balanceOf(this.wallet.userAddress).call()).div(this.constants.TREE_PRECISION);
    this.treeSupply = new BigNumber(await this.contract.TREE.methods.totalSupply().call()).div(this.constants.TREE_PRECISION);
  }

  resetData() {
    this.treeBalance = new BigNumber(0);
    this.treeSupply = new BigNumber(0);
    this.pendingHarvest = new BigNumber(0);
  }
}
