import { Component, Input } from '@angular/core';
import { ISchemaItem, SchemaObject } from '../schema';

@Component({
  selector: 'app-schema-row',
  templateUrl: './schema-row.component.html',
  styleUrls: ['./schema-row.component.less']
})
export class SchemaRowComponent {
  @Input() item: ISchemaItem;
  objDetSxpanded: boolean = false;

  removeItem(item: ISchemaItem): void {
    item.parent.removeProperty(item.title);
  }

  addNewProp(item: SchemaObject): void {
    item.addProperty();
  }
}
