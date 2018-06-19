import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JSON Schema Builder V2';
  string: tab = 'editor';

  constructor(private location: Location) {}

  setTab(tabName) {
    this.tab = tabName;
  }

  ngOnInit() {
    let hash = this.location.hash;
  }
}
