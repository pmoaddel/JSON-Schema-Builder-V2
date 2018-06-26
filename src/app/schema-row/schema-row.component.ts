import { Component, Input } from '@angular/core';
import { ISchemaItem, IHasChildren } from '../schema';

@Component({
  selector: 'app-schema-row',
  templateUrl: './schema-row.component.html',
  styleUrls: ['./schema-row.component.less']
})
export class SchemaRowComponent {
  @Input() item: ISchemaItem;
  objDetSxpanded: boolean = false;

  removeItem(item: ISchemaItem): void {
    item.parent.removeChild(item.title);
  }

  addNewProp(item: IHasChildren): void {
    item.addChild();
  }
}
