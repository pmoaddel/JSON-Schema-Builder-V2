import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title: string = 'JSON Schema Builder V2';
  activeTab: string;
  jsonSchema: any = {};

  constructor() { }

  onFilesAdded(): void {
    const files: FileList = (<HTMLInputElement> document.getElementById('file')).files;
    if (!files) {
      return;
    }
    const fr: FileReader = new FileReader();
    fr.onload = (e: any) => {
      const result: any = JSON.parse(e.target.result);
      this.jsonSchema = result;
    }
    fr.readAsText(files.item(0));
  }

  loadTestSchema(): void {
    $.getJSON( '../assets/testData1.js', (data) => {
      this.jsonSchema = data;
    });
  }

  ngOnInit() {
    const blankSchema: any = {
      title: 'New Schema',
      type: 'object'
    };
    this.loadTestSchema();
  }

  jsonChangeCallback(json: any): void {
    console.log(json);
  }
}
