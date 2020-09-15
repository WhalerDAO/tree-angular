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
    const tree = this.contract.TREE;

    this.treeBalance = new BigNumber(await tree.methods.balanceOf(this.wallet.userAddress).call()).div(this.constants.TREE_PRECISION);
    this.treeSupply = new BigNumber(await tree.methods.totalSupply().call()).div(this.constants.TREE_PRECISION);

    let pendingHarvest = new BigNumber(0);
    await Promise.all(this.constants.FOREST_IDS.map(async (forestID) => {
      const forestPendingHarvest = new BigNumber(await this.contract.getForest(forestID).methods.earned(this.wallet.userAddress).call()).div(this.constants.TREE_PRECISION);
      pendingHarvest = pendingHarvest.plus(forestPendingHarvest);
    }));
    this.pendingHarvest = pendingHarvest;
  }

  resetData() {
    this.treeBalance = new BigNumber(0);
    this.treeSupply = new BigNumber(0);
    this.pendingHarvest = new BigNumber(0);
  }
}
