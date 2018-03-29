import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderAddComponent } from '../order/order-add/order-add.component';

const routes: Routes = [
  { path: 'order', component: OrderAddComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
