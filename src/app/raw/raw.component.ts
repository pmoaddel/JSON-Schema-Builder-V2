import { Component, OnInit } from '@angular/core';
import { testData } from '../../assets/testData.js';

@Component({
  selector: 'app-raw',
  templateUrl: './raw.component.html',
  styleUrls: ['./raw.component.less']
})
export class RawComponent implements OnInit {
  rawJSON = 'raw json';

  constructor(
  ) { }

  ngOnInit() {
    this.rawJSON = JSON.stringify(testData, null, 1);
  }

}
