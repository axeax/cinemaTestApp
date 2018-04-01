import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";

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
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    MatSelectModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {

}
