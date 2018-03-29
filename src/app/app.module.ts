import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { OrderComponent } from './order/order.component';
import { OrderAddComponent } from './order/order-add/order-add.component';
import { PlaceService } from './shared/place.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ModalsComponent} from './shared/modals/modals.component';


@NgModule({
  declarations: [
    AppComponent,
    OrderComponent,
    OrderAddComponent,
    ModalsComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  entryComponents: [
    ModalsComponent
  ],
  providers: [
    PlaceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
