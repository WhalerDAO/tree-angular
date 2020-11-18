import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-forest-list',
  templateUrl: './forest-list.component.html',
  styleUrls: ['./forest-list.component.css']
})
export class ForestListComponent implements OnInit {
  FORESTS = [
    [
      "LP"
    ],
    [
      "PAN",
      "UNI",
      "YFI"
    ],
    [
      "COMP",
      "WETH",
      "AAVE"
    ],
    [
      "ANT",
      "BAL",
      "STAKE"
    ]
  ];

  constructor(public constants: ConstantsService) { }

  ngOnInit(): void {
  }

}
