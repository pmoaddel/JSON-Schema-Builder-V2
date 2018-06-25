import { Component } from '@angular/core';
import { SchemaReaderService } from '../schema-reader.service';


@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.less']
})
export class DesignerComponent {

  constructor(
    private schemaReaderService: SchemaReaderService) {}
}
