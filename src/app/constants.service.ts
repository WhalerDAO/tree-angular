import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {
  TREE_PRECISION = 1e18;
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
  }
}
