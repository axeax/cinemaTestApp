import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {OrderAddComponent} from './order-add/order-add.component';
import {OrderComponent} from './order.component';

@NgModule({
  declarations: [
    OrderComponent,
    OrderAddComponent
  ],
  imports: [
    SharedModule,
  ]
})

export class OrderModule {

}
