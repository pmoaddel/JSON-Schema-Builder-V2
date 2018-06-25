export interface ISchemaItem {
    title: string;
    type: string;
    description: string;
    required: boolean;
    parent: SchemaObject;
    isArrayItem: boolean;
    jsonSchema(): any
}

export class SchemaBasic implements ISchemaItem{
  title: string;
  type: string;
  description: string;
  required: boolean;
  parent: SchemaObject;
  format: string;
  isArrayItem: boolean;

  constructor (json: any, parent: SchemaObject) {
    this.title = json.title;
    this.description = json.description;
    this.type = json.type || 'string';
    this.format = json.format;
    this.parent = parent;
    this.isArrayItem = false;
  }

  jsonSchema(): any {
    return {
        title: this.title,
        description: this.description,
        type: this.type
    };
  }
}

export class SchemaObject extends SchemaBasic implements ISchemaItem {
  requiredItems: Array<String>;
  properties: Array<ISchemaItem>;
  isRoot: boolean;
  schema: string;

  constructor (json: any, parent: SchemaObject) {
    super(json, parent);
    this.schema = json.$schema;

    this.properties = [];
    this.isRoot = !parent;
    this.required = this.isRoot;

    if (json.properties) {
      Object.entries(json.properties).forEach((entry: any[]) => {
        let key: string= entry[0];
        let value: any = entry[1];
        value.title = key;
        switch(value.type) {
          case 'object':
            this.properties.push(new SchemaObject(value, this));
            break;
          case 'array':
            this.properties.push(new SchemaArray(value, this));
            break;
          default:
            this.properties.push(new SchemaBasic(value, this));
        }
      });
    }
    if (json.required) {
        json.required.forEach((requiredItemName) => {
            this.properties.find((property) => {
                return property.title === requiredItemName;
            }).required = true;
        });
    }
  }

  jsonSchema(): any {
    let output = {
        $schema: this.schema,
        title: this.title,
        description: this.description,
        type: this.type,
        required: [],
        properties: {}
    };
    this.properties.forEach((property: ISchemaItem) => {
        output.properties[property.title] = property.jsonSchema();
        if (property.required) {
            output.required.push(property.title);
        }
    });
    return output;
  }

  jsonSchemaString(): string {
    return JSON.stringify(this.jsonSchema(), null, 2);
  }

  removeProperty(title: string): void {
    this.properties = this.properties.filter((property) => {
        return property.title != title;
    });
  }

  addProperty(): void {
    this.properties.push(new SchemaBasic({}, this));
  }
}

export class SchemaArray extends SchemaBasic implements ISchemaItem {
  schema: string;
  items: ISchemaItem;

  constructor (json: any, parent: SchemaObject) {
    super(json, parent);
    this.schema = json.$schema;

    const itemType = json.items ? json.items.type : undefined;
    const itemContent = json.items || {};
    switch(json.items.type) {
      case 'object':
        this.items = new SchemaObject(itemContent, this.parent);
        break;
      case 'array':
        this.items = new SchemaArray(itemContent, this.parent);
        break;
      default:
        this.items = new SchemaBasic(itemContent, this.parent);
    }
    this.items.isArrayItem = true;
  }
  jsonSchema(): any {
    let output = {
      $schema: this.schema,
      description: this.description,
      type: this.type
    };
    if (this.items) {
        output['items'] = this.items.jsonSchema();
    }
    return output;
  }
}
