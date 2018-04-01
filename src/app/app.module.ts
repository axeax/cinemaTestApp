import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PlaceService } from './shared/place.service';
import {ModalsComponent} from './shared/modals/modals.component';
import {OrderModule} from './order/order.module';

@NgModule({
  declarations: [
    AppComponent,
    ModalsComponent
  ],
  imports: [
    OrderModule,
    BrowserModule,
    SharedModule,
    HttpClientModule,
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
