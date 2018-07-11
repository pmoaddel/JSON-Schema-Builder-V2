{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "Skype for Business Application Properties",
  "description": "Defines the basic configuration for the Skype for Business client",
  "type": "object",
  "properties": {
    "displayType": {
      "default": "widget",
      "description": "Dictates the way the application will appear and function inside of PureCloud",
      "type": "string",
      "title": "Application Type",
      "enum": [
        "widget",
        "panda",
        "armpit"
      ]
    },
    "groupFilter": {
      "$ref": "#/definitions/purecloudGroupIdFilterList"
    },
    "numbertype": {
      "default": "widget",
      "description": "Dictates the way the application will appear and function inside of PureCloud",
      "type": "number",
      "title": "Application Type",
      "enum": [
        1,
        2,
        3
      ]
    }
  },
  "additionalProperties": false,
  "displayOrder": [
    "displayType",
    "groupFilter"
  ],
  "definitions": {
    "purecloudGroupIdFilterList": {
      "type": [
        "null",
        "array"
      ],
      "title": "Group Filtering",
      "description": "Limit visibility of permissioned users to selected groups. Leaving blank will allow visibility for all users in this integration's defined permissions.",
      "items": {
        "type": "string",
        "title": "Group GUID",
        "pattern": "^[a-zA-Z0-9]+(-[a-zA-Z0-9]+)*$"
      }
    }
  }
}
