import { Component, Input } from '@angular/core';
import { ISchemaItem } from '../schema';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.less']
})
export class ItemDetailsComponent {
  @Input() item: ISchemaItem;

  constructor() { }
}
