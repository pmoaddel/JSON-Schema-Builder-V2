import { Component, OnInit } from '@angular/core';
import { SchemaReaderService } from './schema-reader.service';
import { testData } from '../assets/testData.js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title: string = 'JSON Schema Builder V2';
  activeTab: string;

  constructor(
    private schemaReaderService: SchemaReaderService) { }

  ngOnInit() {
    this.schemaReaderService.loadSchema(testData);
    this.activeTab = window.location.pathname.replace('/', '');
  }
}
