import { Component, Input, OnChanges } from '@angular/core';
import { SchemaReaderService } from './schema-reader.service';


@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.less']
})
export class DesignerComponent implements OnChanges {
  @Input() inputSchema: any;
  @Input() outputSchemaCallback: any;

  constructor(
    private schemaReaderService: SchemaReaderService) {}

  ngOnChanges() {
    this.schemaReaderService.loadSchema(this.inputSchema);
  }

  exportSchema() {
    this.outputSchemaCallback(this.schemaReaderService.workingSchema.jsonSchemaString());
  }
}
