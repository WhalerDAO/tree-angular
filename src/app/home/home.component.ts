import { Component, OnInit } from '@angular/core';
import BigNumber from 'bignumber.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  treeBalance: BigNumber;
  treeSupply: BigNumber;
  pendingHarvest: BigNumber;

  constructor() {
    this.treeBalance = new BigNumber(0);
    this.treeSupply = new BigNumber(0);
    this.pendingHarvest = new BigNumber(0);
  }

  ngOnInit(): void {
  }

}
