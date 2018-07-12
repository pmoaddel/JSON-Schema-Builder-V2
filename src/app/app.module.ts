//Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

//Components
import { AppComponent } from './app.component';
import { DesignerComponent } from './designer/designer.component';
import { SchemaRowComponent } from './designer/schema-row/schema-row.component';
import { ItemDetailsComponent } from './designer/item-details/item-details.component';

//Other Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Font Awesome Icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faChevronRight, faChevronDown, faAsterisk, faPlus, faPencilAlt, faTimes, faCommentAlt, faCheck} from '@fortawesome/free-solid-svg-icons';

// import { far } from '@fortawesome/free-regular-svg-icons'; //don't need this one currently
library.add(faCoffee, faChevronRight, faChevronDown, faAsterisk, faPlus, faPencilAlt, faTimes, faCommentAlt, faCheck);

const appRoutes: Routes = [
  { path: 'designer', component: DesignerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    DesignerComponent,
    SchemaRowComponent,
    ItemDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes
    ),
    BrowserModule,
    NgbModule.forRoot(),
    FontAwesomeModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
