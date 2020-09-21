import { Injectable } from '@angular/core';
import BigNumber from 'bignumber.js';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  TREE_DECIMALS = 18;
  TREE_PRECISION = 1e18;
  TREE_PRECISION_STR = new BigNumber(this.TREE_PRECISION).toFixed();
  YUSD_PRECISION = 1e18;
  REBASE_THRESHOLD = 1.05; // 5% threshold
  REBASE_INTERVAL = 12; // 12 hours
  ORACLE_UPDATE_INTERVAL = 12; // 12 hours
  FORESTS = {
    LP: {
      name: "TREE-yUSD LP Garden",
      emoji: "🦄",
      tokenName: "TREE-yUSD Uniswap LP"
    },
    yYFI: {
      name: "yYFI Forest",
      emoji: "🎄",
      tokenName: "yYFI yEarn vault"
    },
    yDAI: {
      name: "yDAI Undergrowth",
      emoji: "🥦",
      tokenName: "yDAI yEarn vault"
    },
    yWETH: {
      name: "yWETH Weald",
      emoji: "🌸",
      tokenName: "yWETH yEarn vault"
    },
    yaLINK: {
      name: "yaLINK Jungle",
      emoji: "🐸",
      tokenName: "yaLINK yEarn vault"
    },
    SNX: {
      name: "SNX Grove",
      emoji: "🐍",
      tokenName: "Synthetix"
    },
    LEND: {
      name: "LEND Woodland",
      emoji: "🌳",
      tokenName: "Aave LEND"
    },
    ANT: {
      name: "ANT Arboretum",
      emoji: "🐜",
      tokenName: "Aragon ANT"
    },
    COMP: {
      name: "COMP Courtyard",
      emoji: "🍄",
      tokenName: "Compound COMP"
    }
  };


  public get FOREST_IDS(): string[] {
    return Object.keys(this.FORESTS);
  }
}
