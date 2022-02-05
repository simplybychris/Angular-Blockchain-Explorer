import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExplorerComponent} from "./explorer/explorer.component";
import {BlockComponent} from "./block/block.component";
import {TransactionComponent} from "./transaction/transaction.component";
import {AddressComponent} from "./address/address.component";
import {TransferComponent} from "./transfer/transfer.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  {path: '', component: ExplorerComponent},
  {path: 'block/:id', component: BlockComponent},
  {path: 'transaction/:id', component: TransactionComponent},
  {path: 'address/:id', component: AddressComponent},
  {path: 'transfer', component: TransferComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: '**', pathMatch: 'full', redirectTo: '/not-found'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
