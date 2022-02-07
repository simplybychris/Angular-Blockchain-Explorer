import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MaterialModule} from './material/material.module';
import {NavbarComponent} from './navbar/navbar.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ExplorerComponent} from './explorer/explorer.component';
import {TableComponent} from "./explorer/table/table.component";
import {DataService} from "./service/data.service";
import {HttpClientModule} from "@angular/common/http";
import {BlockComponent} from './block/block.component';
import {TransactionComponent} from './transaction/transaction.component';
import {AddressComponent} from './address/address.component';
import {RowComponent} from './row/row.component';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {QRCodeModule} from "angular2-qrcode";
import {APP_BASE_HREF} from "@angular/common";
import {TransferComponent} from './transfer/transfer.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NotFoundComponent} from './not-found/not-found.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {initData} from "./service/app.initializer";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ExplorerComponent,
    TableComponent,
    BlockComponent,
    TransactionComponent,
    AddressComponent,
    RowComponent,
    TransactionsListComponent,
    TransferComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    QRCodeModule,
    NgxChartsModule,
  ],
  providers: [
    initData,
    DataService,
    {provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
