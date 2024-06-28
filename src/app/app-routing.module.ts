import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPageComponent } from './details-page/details-page.component';
import { TransactionListComponent } from './transaction-list/tansaction-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/transactions',
    pathMatch: 'full',
  },
  {
    path: 'transactions',
    component: TransactionListComponent,
  },
  {
    path: 'transaction/:id',
    component: DetailsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
