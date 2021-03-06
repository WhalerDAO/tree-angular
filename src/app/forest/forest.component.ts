import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';
import { ActivatedRoute } from '@angular/router';
import BigNumber from 'bignumber.js';
import { WalletService } from '../wallet.service';
import { ContractService } from '../contract.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.css']
})
export class ForestComponent implements OnInit {
  forestID: string;
  earnedTreeBalance: BigNumber;
  stakedTokenBalance: BigNumber;
  totalTVL: BigNumber;
  poolProportion: BigNumber;
  availableStakeTokenBalance: BigNumber;
  poolTreeBalance: BigNumber;
  predictedTreeAmount: BigNumber;
  url: String;

  constructor(public wallet: WalletService, public contract: ContractService, public constants: ConstantsService, private activatedRoute: ActivatedRoute, private modalService: NgbModal) {
    this.resetData();
  }

  ngOnInit(): void {
    this.forestID = this.activatedRoute.snapshot.paramMap.get('id');
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
    const forest = this.contract.getForest(this.forestID);
    const forestStakeToken = this.contract.getForestStakeToken(this.forestID);
    const stakeTokenPrecision = Math.pow(10, +(await forestStakeToken.methods.decimals().call()));

    this.earnedTreeBalance = new BigNumber(await forest.methods.earned(this.wallet.userAddress).call()).div(this.constants.TREE_PRECISION);
    this.stakedTokenBalance = new BigNumber(await forest.methods.balanceOf(this.wallet.userAddress).call()).div(stakeTokenPrecision);
    this.availableStakeTokenBalance = new BigNumber(await forestStakeToken.methods.balanceOf(this.wallet.userAddress).call()).div(stakeTokenPrecision);
    this.totalTVL = new BigNumber(await this.contract.getForestStakeToken(this.forestID).methods.balanceOf(this.contract.getForestAddress(this.forestID)).call()).div(stakeTokenPrecision);
    this.poolProportion = this.stakedTokenBalance.div(this.totalTVL);
    this.url = "https://etherscan.io/address/" + this.contract.getForestAddress(this.forestID);
    this.poolTreeBalance = new BigNumber(await this.contract.getNamedToken("TREE").methods.balanceOf(this.contract.getForestAddress(this.forestID)).call()).div(stakeTokenPrecision);
    this.predictedTreeAmount = this.poolTreeBalance.multipliedBy(this.poolProportion);
  }

  resetData() {
    this.earnedTreeBalance = new BigNumber(0);
    this.stakedTokenBalance = new BigNumber(0);
    this.availableStakeTokenBalance = new BigNumber(0);
    this.totalTVL = new BigNumber(0);
    this.poolProportion = new BigNumber(0);
    this.poolTreeBalance = new BigNumber(0);
    this.predictedTreeAmount = new BigNumber(0);
    this.url = "";
  }

  openModal(modal) {
    this.modalService.open(modal, { centered: true })
  }

  setMaxStakeAmount(input) {
    input.value = this.availableStakeTokenBalance.toString();
  }

  setMaxWithdrawAmount(input) {
    input.value = this.stakedTokenBalance.toString();
  }

  harvest() {
    const func = this.contract.getForest(this.forestID).methods.getReward();
    this.wallet.sendTx(func, () => { }, () => {
      this.loadData();
    }, () => { });
  }

  async stake(amount) {
    const forestAddress = this.contract.getForestAddress(this.forestID);
    const stakeToken = this.contract.getForestStakeToken(this.forestID);
    const stakeTokenPrecision = Math.pow(10, +(await stakeToken.methods.decimals().call()));
    const stakeAmount = new BigNumber(amount).times(stakeTokenPrecision).integerValue().toFixed();
    const func = this.contract.getForest(this.forestID).methods.stake(stakeAmount);
    this.wallet.sendTxWithToken(func, stakeToken, forestAddress, stakeAmount, () => { }, () => {
      this.loadData();
    }, () => { });
  }

  withdrawAllAndHarvest() {
    const func = this.contract.getForest(this.forestID).methods.exit();
    this.wallet.sendTx(func, () => { }, () => {
      this.loadData();
    }, () => { });
  }

  async withdraw(amount) {
    const stakeToken = this.contract.getForestStakeToken(this.forestID);
    const stakeTokenPrecision = Math.pow(10, +(await stakeToken.methods.decimals().call()));
    const stakeAmount = new BigNumber(amount).times(stakeTokenPrecision).integerValue().toFixed();
    const func = this.contract.getForest(this.forestID).methods.withdraw(stakeAmount);
    this.wallet.sendTx(func, () => { }, () => {
      this.loadData();
    }, () => { });
  }
}
