import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Transaction} from "../service/interface/transaction";
import Utils from "../explorer/utils";

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnChanges {

  @Input() data: Array<Transaction> = [];
  confirmationsNumber: number = Utils.CONFIRMATION_AMOUNT;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes.data.currentValue;
  }
}
