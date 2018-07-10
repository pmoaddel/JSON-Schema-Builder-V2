import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-raw',
  templateUrl: './raw.component.html',
  styleUrls: ['./raw.component.less']
})
export class RawComponent implements OnInit {
  rawJSON = 'raw json';

  constructor(
  ) { }
}
