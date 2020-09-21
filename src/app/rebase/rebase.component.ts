import { Component, OnInit, OnDestroy } from '@angular/core';
import { WalletService } from '../wallet.service';
import { ContractService } from '../contract.service';
import { ConstantsService } from '../constants.service';
import BigNumber from 'bignumber.js';
import { Timer } from '../timer';

@Component({
  selector: 'app-rebase',
  templateUrl: './rebase.component.html',
  styleUrls: ['./rebase.component.css']
})
export class RebaseComponent implements OnInit, OnDestroy {
  oracleTREEPrice: BigNumber;
  lastRebaseTimestamp: number;
  lastRebaseTimer: Timer;
  nextOracleUpdateTimestamp: number;
  nextOracleUpdateTimer: Timer;

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

  ngOnDestroy() {
    this.lastRebaseTimer.stop();
    this.nextOracleUpdateTimer.stop();
  }

  async loadData() {
    this.oracleTREEPrice = new BigNumber(await this.contract.ITREEOracle.methods.updateAndConsult(this.contract.TREE.options.address, this.constants.TREE_PRECISION_STR).call()).div(this.constants.YUSD_PRECISION);
    this.lastRebaseTimestamp = +(await this.contract.TREERebaser.methods.lastRebaseTimestamp().call());
    this.lastRebaseTimer = new Timer(this.lastRebaseTimestamp);
    this.lastRebaseTimer.start();
    const HOUR = 60 * 60;
    this.nextOracleUpdateTimestamp = +(await this.contract.ITREEOracle.methods.blockTimestampLast().call()) + this.constants.ORACLE_UPDATE_INTERVAL * HOUR;
    const now = Math.floor(Date.now() / 1e3);
    if (this.nextOracleUpdateTimestamp < now) {
      const numJumps = Math.ceil((now - this.nextOracleUpdateTimestamp) / (this.constants.ORACLE_UPDATE_INTERVAL * HOUR))
      this.nextOracleUpdateTimestamp += numJumps * this.constants.ORACLE_UPDATE_INTERVAL * HOUR;
    }
    this.nextOracleUpdateTimer = new Timer(this.nextOracleUpdateTimestamp);
    this.nextOracleUpdateTimer.start();
  }

  resetData() {
    this.oracleTREEPrice = new BigNumber(0);
    this.lastRebaseTimestamp = 0;
    this.nextOracleUpdateTimestamp = 0;
    this.lastRebaseTimer = new Timer(0);
    this.nextOracleUpdateTimer = new Timer(0);
  }

  timeSinceLastRebaseReady(): boolean {
    return false;
  }

  oraclePriceReady(): boolean {
    return this.oracleTREEPrice.gte(this.constants.REBASE_THRESHOLD);
  }

  rebase() {
    const func = this.contract.TREERebaser.methods.rebase();
    this.wallet.sendTx(func, () => { }, () => {
      this.loadData();
    }, () => { });
  }
}
