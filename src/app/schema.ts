export interface ISchemaItem {
    title: string;
    type: string;
    description: string;
    required: boolean;
    parent: ISchemaItem;

    generateJSONSchema(): any
}

export class SchemaBasic implements ISchemaItem{
  title: string;
  type: string;
  description: string;
  required: boolean;
  parent: ISchemaItem;

  constructor (json: any, parent: ISchemaItem) {
    this.title = json.title;
    this.description = json.description;
    this.type = json.type;
    this.parent = parent;
  }

  generateJSONSchema(): any {
    return {
        title: this.title,
        description: this.description,
        type: this.type
    };
  }
}

export class SchemaObject extends SchemaBasic implements ISchemaItem {
  schema: string;
  requiredItems: Array<String>;
  properties: Array<ISchemaItem>;
  isRoot: boolean;

  constructor (json: any, parent: ISchemaItem) {
    super(json, parent);
    this.schema = json.$schema;

    this.properties = [];
    this.requiredItems = json.required;
    this.isRoot = !!parent;

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
  }

  generateJSONSchema(): any {
    let output = {
        $schema: this.schema,
        title: this.title,
        description: this.description,
        type: this.type,
        required: this.requiredItems,
        properties: {},
    }
    this.properties.forEach((property: ISchemaItem) => {
        output.properties[property.title] = property.generateJSONSchema();
    });
    return output;
  }
}

export class SchemaArray extends SchemaBasic implements ISchemaItem {
  schema: string;
  items: ISchemaItem;

  constructor (json: any, parent: ISchemaItem) {
    super(json, parent);
    this.schema = json.$schema;

    if (json.items) {
      switch(json.items.type) {
        case 'object':
          this.items = new SchemaObject(json.items, this);
          break;
        case 'array':
          this.items = new SchemaArray(json.items, this);
          break;
        default:
          this.items = new SchemaBasic(json.items, this);
      }
    }
  }
  generateJSONSchema(): any {
    let output = {
      $schema: this.schema,
      description: this.description,
      type: this.type
    };
    if (this.items) {
        output['items'] = this.items.generateJSONSchema();
    }
    return output;
  }
}
