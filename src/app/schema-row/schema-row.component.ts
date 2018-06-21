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

  removeItem(item: ISchemaItem): void {
    console.log('remove item', item);
  }

  addNewProp(): void {
    console.error('add prop not implemented');
  }
}
