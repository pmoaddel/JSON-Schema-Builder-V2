import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { RawComponent } from './raw/raw.component';
import { DesignerComponent } from './designer/designer.component';
import { SchemaRowComponent } from './schema-row/schema-row.component';


const appRoutes: Routes = [
  { path: 'designer', component: DesignerComponent },
  { path: 'raw',      component: RawComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RawComponent,
    DesignerComponent,
    SchemaRowComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    )
    BrowserModule,
    NgbModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
