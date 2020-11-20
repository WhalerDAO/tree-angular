import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  TREE_DECIMALS = 18;
  TREE_PRECISION = 1e18;
  TREE_PRECISION_STR = new BigNumber(this.TREE_PRECISION).toFixed();
  DAI_PRECISION = 1e18;
  REBASE_THRESHOLD = 1.05; // 5% threshold
  REBASE_INTERVAL = 12; // 12 hours
  ORACLE_UPDATE_INTERVAL = 12; // 12 hours
  FORESTS = {
    LP: {
      name: "TREE-DAI LP Garden",
      emoji: "🌳",
      tokenName: "TREE-DAI Uniswap LP"
    },
    PAN: {
      name: "PAN Forest",
      emoji: "🍳",
      tokenName: "Panvala"
    },
    UNI: {
      name: "UNI Undergrowth",
      emoji: "🦄",
      tokenName: "Uniswap"
    },
    YFI: {
      name: "YFI Weald",
      emoji: "🎍",
      tokenName: "yearn"
    },
    COMP: {
      name: "COMP Jungle",
      emoji: "🌾",
      tokenName: "Compound"
    },
    WETH: {
      name: "WETH Grove",
      emoji: "☰",
      tokenName: "Wrapped ETH"
    },
    AAVE: {
      name: "AAVE Woodland",
      emoji: "👻",
      tokenName: "Aave"
    },
    ANT: {
      name: "ANT Arboretum",
      emoji: "🐜",
      tokenName: "Aragon ANT"
    },
    BAL: {
      name: "BAL Courtyard",
      emoji: "🍄",
      tokenName: "Balancer"
    },
    STAKE: {
      name: "STAKE Sylva",
      emoji: "🐍",
      tokenName: "XDAI STAKE"
    }
  };


  public get FOREST_IDS(): string[] {
    return Object.keys(this.FORESTS);
  }
}
