export const testData =
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "title": "AccountNumberRequest",
  "description": "An account number based request",
  "type": "object",
  "required": [
    "ACCOUNT_NUMBER",
    "ACCOUNT_NUMBER2"
  ],
  "properties": {
    "ACCOUNT_NUMBER": {
      "type": "string",
      "description": "The account number used to query the CRM"
    },
    "ACCOUNT_NUMBER2": {
      "type": "string",
      "description": "The account number used to query the CRM"
    },
    "Account": {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "type": "array",
      "properties": {},
      "items": {
        "$schema": "http://json-schema.org/draft-04/schema#",
        "title": "Account",
        "type": "object",
        "description": "A Salesforce Account",
        "required": [
          "Id"
        ],
        "properties": {
          "Id": {
            "type": "string",
            "description": "ID of the Account"
          },
          "Name": {
            "type": "string",
            "description": "Name of the Account"
          },
          "SomeThing": {
            "type": "object",
            "title": "Some Thing",
            "description": "A single thing.",
            "properties": {
              "name": {
                "type": "string",
                "description": "Name of the thing",
                "default": "Waa waa wee woo"
              },
              "color": {
                "type": "string",
                "description": "Color of the thing",
                "default": "blue"
              }
            }
          },
          "AccountNumber": {
            "type": "string",
            "description": "The Account Number"
          },
          "Phone": {
            "type": "array",
            "items":{
              "type": "string"
            }
          },
          "BillingStreet": {
            "type": "number",
            "description": "The billing street address"
          },
          "BillingCity": {
            "type": "integer",
            "description": "The billing city"
          },
          "BillingState": {
            "type": "boolean",
            "description": "The billing state"
          },
          "BillingPostalCode": {
            "type": "string",
            "description": "The billing postal code"
          },
          "BillingCountry": {
            "type": "string",
            "description": "The billing country"
          },
          "ShippingStreet": {
            "type": "string",
            "description": "The shipping street address"
          },
          "ShippingCity": {
            "type": "string",
            "description": "The shipping city"
          },
          "ShippingState": {
            "type": "string",
            "description": "The shipping state"
          },
          "ShippingPostalCode": {
            "type": "string",
            "description": "The shipping postal code"
          },
          "ShippingCountry": {
            "type": "string",
            "description": "The shipping country"
          }
        }
      }
    }
  }
};
