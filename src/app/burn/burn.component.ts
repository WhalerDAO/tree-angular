import { Component, OnInit } from '@angular/core';
import BigNumber from 'bignumber.js';
import { ConstantsService } from '../constants.service';
import { ContractService } from '../contract.service';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-burn',
  templateUrl: './burn.component.html',
  styleUrls: ['./burn.component.css']
})
export class BurnComponent implements OnInit {
  burnAmount: string;
  treeBalance: BigNumber;
  treeSupply: BigNumber;
  reserveBalance: BigNumber;
  otherBurnPercent: string;

  constructor(public wallet: WalletService, public contract: ContractService, public constants: ConstantsService) {
    this.resetData();
    this.burnAmount = '10';
    this.otherBurnPercent = '10';
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
    const reserveToken = this.contract.getNamedToken('reserveToken');
    const treeReserve = this.contract.TREEReserve;

    this.treeBalance = new BigNumber(await tree.methods.balanceOf(this.wallet.userAddress).call()).div(this.constants.TREE_PRECISION);
    this.treeSupply = new BigNumber(await tree.methods.totalSupply().call()).div(this.constants.TREE_PRECISION);
    this.reserveBalance = new BigNumber(await reserveToken.methods.balanceOf(treeReserve.options.address).call()).div(this.constants.DAI_PRECISION);
  }

  resetData() {
    this.treeBalance = new BigNumber(0);
    this.treeSupply = new BigNumber(0);
    this.reserveBalance = new BigNumber(0);
  }

  maxBurnAmount() {
    this.burnAmount = this.treeBalance.toFixed(this.constants.TREE_DECIMALS);
  }

  calcBurnPercentage(): string {
    if (this.treeSupply.eq(0)) {
      return 'Loading...';
    }
    if (!this.burnAmount) {
      this.burnAmount = '0';
    }
    return new BigNumber(this.burnAmount).div(this.treeSupply).times(100).toFormat(4);
  }

  calcReceivePercentage(): string {
    if (this.treeSupply.eq(0)) {
      return 'Loading...';
    }
    if (!this.burnAmount) {
      this.burnAmount = '0';
    }
    return new BigNumber(this.burnAmount).pow(2).div(this.treeSupply.pow(2)).times(100).toFormat(4);
  }

  calcReceiveAmount(): string {
    if (this.treeSupply.eq(0)) {
      return 'Loading...';
    }
    if (!this.burnAmount) {
      this.burnAmount = '0';
    }
    return new BigNumber(this.burnAmount).pow(2).div(this.treeSupply.pow(2)).times(this.reserveBalance).toFormat(4);
  }

  calcPercentageAfterOtherBurn(): string {
    if (this.treeSupply.eq(0)) {
      return 'Loading...';
    }
    return this.treeBalance.div(this.treeSupply.times(1 - +this.otherBurnPercent / 100)).times(100).toFormat(4);
  }

  calcReceiveAmountAfterOtherBurn(): string {
    if (this.treeSupply.eq(0)) {
      return 'Loading...';
    }
    return this.treeBalance.pow(2).div(this.treeSupply.times(1 - +this.otherBurnPercent / 100).pow(2)).times(this.reserveBalance.times(1 - Math.pow(+this.otherBurnPercent / 100, 2))).toFormat(4);
  }

  calcReceiveAmountBeforeOtherBurn(): string {
    if (this.treeSupply.eq(0)) {
      return 'Loading...';
    }
    return this.treeBalance.pow(2).div(this.treeSupply.pow(2)).times(this.reserveBalance).toFormat(4);
  }

  calcReturns(): string {
    return new BigNumber(2 * +this.otherBurnPercent / (1 - (+this.otherBurnPercent / 100))).toFormat(4);
  }

  toFormat(x): string {
    if (!x) x = 0;
    return new BigNumber(x).toFormat(4);
  }

  burn() {
    if (!this.burnAmount) {
      this.burnAmount = '0';
    }
    const formattedBurnAmount = new BigNumber(this.burnAmount).times(this.constants.TREE_PRECISION).integerValue().toFixed();
    const func = this.contract.TREEReserve.methods.burnTREE(formattedBurnAmount);
    this.wallet.sendTx(func, () => { }, () => {
      this.loadData();
    }, () => { });
  }
}
