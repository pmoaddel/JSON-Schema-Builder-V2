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
  loadedFile: string;

  constructor(
    private schemaReaderService: SchemaReaderService) { }

  onFilesAdded() {
    const files = document.getElementById('file').files;
    const fr = new FileReader();
    fr.onload = (e) => {
      const result = JSON.parse(e.target.result);
      this.schemaReaderService.loadSchema(result);
    }
    fr.readAsText(files.item(0));
  }

  ngOnInit() {
    this.schemaReaderService.loadSchema(testData);
    this.activeTab = window.location.pathname.replace('/', '');
  }
}
