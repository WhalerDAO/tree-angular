import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../constants.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forest',
  templateUrl: './forest.component.html',
  styleUrls: ['./forest.component.css']
})
export class ForestComponent implements OnInit {
  forestID: string;

  constructor(public constants: ConstantsService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.forestID = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
