import { Component, OnInit } from '@angular/core';
import { SchemaReaderService } from './schema-reader.service';
declare var $: any;

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

  onFilesAdded(): void {
    const files: FileList = (<HTMLInputElement> document.getElementById('file')).files;
    if (!files) {
      return;
    }
    const fr: FileReader = new FileReader();
    fr.onload = (e: any) => {
      const result: any = JSON.parse(e.target.result);
      this.schemaReaderService.loadSchema(result);
    }
    fr.readAsText(files.item(0));
  }

  loadTestSchema(): void {
    $.getJSON( '../assets/testData1.js', (data) => {
      this.schemaReaderService.loadSchema(data);
    });
  }

  ngOnInit() {
    const blankSchema: any = {
      title: 'New Schema',
      type: 'object'
    };
    this.schemaReaderService.loadSchema(blankSchema);
    this.activeTab = window.location.pathname.replace('/', '');
    this.loadTestSchema();
  }
}
