export interface ISchemaItem {
    title: string;
    type: string;
    description: string;
    isRequired: boolean;
    parent: IHasChildren;
    default: string;

    jsonSchema(): any
    changeType(type: string): void
}

export interface IHasChildren {
  removeChild(title: string): void;
  addChild(): void;
  getChildren(): ISchemaItem[];
  replaceChild(newItem: ISchemaItem);
}

export class SchemaBasic implements ISchemaItem {
  title: string;
  type: string;
  description: string;
  isRequired: boolean;
  parent: IHasChildren;
  default: string;

  constructor (json: any, parent: IHasChildren) {
    this.title = json.title;
    this.description = json.description;
    this.type = json.type || 'string';
    this.parent = parent;
    this.default = json.default;
    this.isRequired = json.isRequired || false;
  }

  jsonSchema(): any {
    let output = {
      title: this.title ? this.title : undefined,
      description: this.description ? this.description : undefined,
      type: this.type ? this.type : undefined,
      default: this.default ? this.default : undefined
    };
    return output;
  }

  changeType(type: string) {
    if (type === this.type) {
      return;
    }
    const needToCreateNewObject : boolean = (
      type === 'string' || type === 'number' || type === 'integer' || type === 'object' || type === 'array' ||
      this.type === 'string' || this.type === 'number' || this.type === 'integer' || this.type === 'object' || this.type === 'array');
    if (needToCreateNewObject) {
      const valuesToCopy = {
        title: this.title,
        description: this.description,
        type: type,
        isRequired: this.isRequired
      }
      let newObject : ISchemaItem;
      if (type === 'object') {
        newObject = new SchemaObject(valuesToCopy, this.parent)
      } else if (type === 'array') {
        newObject = new SchemaArray(valuesToCopy, this.parent);
      } else if (type === 'string') {
        newObject = new SchemaString(valuesToCopy, this.parent);
      } else if (type === 'number' || type === 'integer') {
        newObject = new SchemaNumeric(valuesToCopy, this.parent);
      } else {
        newObject = new SchemaBasic(valuesToCopy, this.parent);
      }
      this.parent.replaceChild(newObject);
    } else {
      this.type = type;
    }
  }
}

export class SchemaString extends SchemaBasic {
  minLength: number;
  maxLength: number;
  pattern: string;
  format: string;

  constructor (json: any, parent: IHasChildren) {
    super(json, parent);
    this.minLength = json.minLength;
    this.maxLength = json.maxLength;
    this.pattern = json.pattern;
    this.format = json.format;
  }

  jsonSchema(): any {
    let output = super.jsonSchema();
    output.minLength = this.minLength ? this.minLength : undefined;
    output.maxLength = this.maxLength ? this.maxLength : undefined;
    output.pattern = this.pattern ? this.pattern : undefined;
    output.format = this.format ? this.format : undefined;
    return output;
  }

}

export class SchemaNumeric extends SchemaBasic {
  multipleOf: number;
  minimum: number;
  exclusiveMinimum: boolean;
  maximum: number;
  exclusiveMaximum: boolean;

  constructor (json: any, parent: IHasChildren) {
    super(json, parent);
    this.multipleOf = json.multipleOf;
    this.minimum = json.minimum;
    this.exclusiveMinimum = json.exclusiveMinimum;
    this.maximum = json.maximum;
    this.exclusiveMaximum = json.exclusiveMaximum;
  }

  jsonSchema(): any {
    let output = super.jsonSchema();
    output.multipleOf = this.multipleOf ? this.multipleOf : undefined;
    output.minimum = this.minimum ? this.minimum : undefined;
    output.exclusiveMinimum = this.exclusiveMinimum ? this.exclusiveMinimum : undefined;
    output.maximum = this.maximum ? this.maximum : undefined;
    output.exclusiveMaximum = this.exclusiveMaximum ? this.exclusiveMaximum : undefined;
    return output;
  }
}

export class SchemaObject extends SchemaBasic implements ISchemaItem, IHasChildren {
  requiredItems: Array<String>;
  properties: Array<ISchemaItem>;
  isRoot: boolean;
  schema: string;

  additionalProperties: any; // can be boolean or an object
  minProperties: number;
  maxProperties: number;


  //dependancies: any; TODO: Advanced Feature

  constructor (json: any, parent: IHasChildren) {
    super(json, parent);
    this.schema = json.$schema;

    this.properties = [];
    this.isRoot = !parent;
    this.isRequired = this.isRoot;
    this.additionalProperties = json.additionalPropertiesv;
    this.minProperties = json.minPropertiesv;
    this.maxProperties = json.maxPropertiesv;

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
          case 'string':
            this.properties.push(new SchemaString(value, this));
            break;
          case 'integer':
          case 'number':
            this.properties.push(new SchemaNumeric(value, this));
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
            }).isRequired = true;
        });
    }
  }

  jsonSchema(): any {
    let output = super.jsonSchema();
    output.$schema = this.schema;
    output.required = [];
    output.properties = {};

    this.properties.forEach((property: ISchemaItem) => {
        output.properties[property.title] = property.jsonSchema();
        delete output.properties[property.title].title;
        if (property.isRequired) {
            output.required.push(property.title);
        }
    });
    return output;
  }

  jsonSchemaString(): string {
    return JSON.stringify(this.jsonSchema(), null, 2);
  }

  removeChild(title: string): void {
    this.properties = this.properties.filter((property) => {
        return property.title != title;
    });
  }

  addChild(): void {
    this.properties.push(new SchemaBasic({}, this));
  }

  getChildren(): ISchemaItem[] {
    return this.properties;
  }

  replaceChild(newItem: ISchemaItem) {
    this.properties.forEach((item : ISchemaItem, index: number) => {
      if (item.title === newItem.title) {
        this.properties[index] = newItem;
      }
    });
  }
}

export class SchemaArray extends SchemaBasic implements ISchemaItem, IHasChildren {
  schema: string;
  items: ISchemaItem[];
  additionalItems: boolean;
  minItems: number;
  maxItems: number;
  uniqueItems: boolean;

  constructor (json: any, parent: IHasChildren) {
    super(json, parent);
    this.schema = json.$schema;
    this.items = [];

    let items = json.items || {};
    items = items.length ? items : [items];
    items.forEach((item) => {
      switch(item.type) {
        case 'object':
          this.items.push(new SchemaObject(item, this));
          break;
        case 'array':
          this.items.push(new SchemaArray(item, this));
          break;
        case 'string':
          this.items.push(new SchemaString(item, this));
          break;
        case 'integer':
        case 'number':
          this.items.push(new SchemaNumeric(item, this));
          break;
        default:
          this.items.push(new SchemaBasic(item, this));
      }
    });
  }

  jsonSchema(): any {
    let output = super.jsonSchema();
    output.$schema = this.schema;
    if (this.items.length) {
      if (this.items.length > 1) {
        output['items'] = [];
        this.items.forEach((item) => {
          output['items'].push(item.jsonSchema());
        });
      } else {
        output['items'] = this.items[0].jsonSchema();
      }
    }
    return output;
  }

  removeChild(title: string): void {
    this.items = this.items.filter((item) => {
        return item.title != title;
    });
  }

  addChild(): void {
    this.items.push(new SchemaBasic({}, this));
  }

  getChildren(): ISchemaItem[] {
    return this.items;
  }

  replaceChild(newItem: ISchemaItem) {
    this.items.forEach((item : ISchemaItem, index: number) => {
      if (item.title === newItem.title) {
        this.items[index] = newItem;
      }
    });
  }
}
