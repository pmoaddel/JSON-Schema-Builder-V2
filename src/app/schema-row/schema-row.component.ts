import { Component, OnInit, Input } from '@angular/core';
import { SchemaItem } from '../schema-item';

@Component({
  selector: 'app-schema-row',
  templateUrl: './schema-row.component.html',
  styleUrls: ['./schema-row.component.less']
})
export class SchemaRowComponent implements OnInit {
  @Input() item: SchemaItem;
  objDetSxpanded: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
