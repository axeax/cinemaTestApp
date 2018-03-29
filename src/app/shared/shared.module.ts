import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {MatToolbarModule} from '@angular/material/toolbar';
import {
  MatSelectModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatSidenavModule,
  MatDialogModule,
} from '@angular/material';

@NgModule({
  exports: [
    BrowserAnimationsModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ]
})
export class SharedModule {

}
