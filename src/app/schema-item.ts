export class SchemaItem {
  id: string;
  schema: string;
  title: string;
  description: string;
  required: boolean;
  requiredItems: Array<String>;
  type: string;
  _properties: Array<SchemaItem>;
  isRoot: boolean;

  constructor (json: Object, isRoot: boolean) {
    this.schema = json.$schema;
    this.title = json.title;
    this.description = json.description;
    this.required = json.required;
    this.requiredItems = json.requiredItems;
    this.type = json.type;
    this.properties = [];
    this.isRoot = isRoot;

    if (json.properties) {
      Object.entries(json.properties).forEach((entry) => {
        let key = entry[0];
        let value = entry[1];
        value.title = key;
        this.properties.push(new SchemaItem(value, false));
      });
    }

    if (json.items) {
      this.items = new SchemaItem(json.items, false);
    }
  }
