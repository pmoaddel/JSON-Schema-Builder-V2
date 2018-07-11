import { Component, Input, OnChanges } from '@angular/core';
import { ISchemaItem } from '../schema';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.less']
})
export class ItemDetailsComponent implements OnChanges{
  @Input() item: ISchemaItem;
  enumCtrlExpanded: bool;

  ngOnChanges() {
    if (this.item.enum && this.item.enum.length) {
      this.enumCtrlExpanded = true;
    }
  }
}
