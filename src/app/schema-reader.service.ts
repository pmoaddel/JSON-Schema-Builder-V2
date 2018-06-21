import { Injectable } from '@angular/core';
import { SchemaItem } from './schema-item';

@Injectable({ providedIn: 'root' })
export class SchemaReaderService {
  public jsonSchema: SchemaItem;
  // parseSchemeItem(item) {}
  public parseSchema (jsonSchemaObject: Object): SchemaItem {
    let finalSchema = {}
    //parse root schema
    let rootSchema = new SchemaItem(jsonSchemaObject, true);
    this.jsonSchema = rootSchema;
  }
}
