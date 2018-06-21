import { Component, Input } from '@angular/core';
import { ISchemaItem } from '../schema';

@Component({
  selector: 'app-schema-row',
  templateUrl: './schema-row.component.html',
  styleUrls: ['./schema-row.component.less']
})
export class SchemaRowComponent {
  @Input() item: ISchemaItem;
  objDetSxpanded: boolean = false;
}
