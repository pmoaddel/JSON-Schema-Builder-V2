import { Component, OnInit } from '@angular/core';
import { testData } from '../../assets/testData.js';
import { SchemaItem } from '../schema-item';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.less']
})
export class DesignerComponent implements OnInit {
  rawJSON: object;
  items = [
    {
      id: 1,
      name: 'Account Number Request',
      description: 'description',
      required: true,
      type: 'Object',
      _properties: []
    },
    {
      id: 2,
      name: 'Account',
      description: 'description',
      required: false,
      type: 'Object',
      _properties: []
    }
  ];

  constructor() { }

  ngOnInit() {
    this.rawJSON = testData;
  }
}
