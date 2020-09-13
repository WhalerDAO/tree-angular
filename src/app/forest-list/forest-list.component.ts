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
      "LP",
      "yYFI",
      "yDAI"
    ],
    [
      "yWETH",
      "yaLINK",
      "SNX"
    ],
    [
      "LEND",
      "ANT",
      "COMP"
    ]
  ];

  constructor(public constants: ConstantsService) { }

  ngOnInit(): void {
  }

}
