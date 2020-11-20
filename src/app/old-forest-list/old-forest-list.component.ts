import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';

@Component({
  selector: 'app-old-forest-list',
  templateUrl: './old-forest-list.component.html',
  styleUrls: ['./old-forest-list.component.css']
})
export class OldForestListComponent implements OnInit {

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