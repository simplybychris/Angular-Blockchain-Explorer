import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService} from "../service/data.service";
import {Transaction} from "../service/interface/transaction";
import {Row} from "../row/row";
import {Block} from "../service/interface/block";
import Utils from "../explorer/utils";

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  paramId: string = '';
  transaction: Transaction | undefined;
  block: Block | undefined;
  rowData: Array<Row> = [];
  confirmations: number = 0;

  constructor(private route: ActivatedRoute,
              private service: DataService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: Params) => {
        this.paramId = params['id'];
        console.log("id: ", this.paramId);
      }
    );

    this.service.getAllTransactions().subscribe((res) => {
      this.transaction = res.find((tx: Transaction) => tx.id == this.paramId);
      if(this.transaction === undefined){
        this.router.navigateByUrl('/');
      }
      // console.log("tx: ", this.transaction);

      this.service.getBlockchain().subscribe((bc) => {
        this.block = bc.find((block: Block) => block.data?.find((tx: Transaction) => tx.id === this.transaction?.id));
        // console.log("block: ", this.block);
        if (this.block) {
          this.service.getBlockConfirmations(this.block?.index!!).subscribe((confirmations) => {
            this.confirmations = confirmations;
            this.transaction!!.confirmations = confirmations;
            this.mapTransactionToRowData();
          })
        } else {
          this.mapTransactionToRowData();
        }
      })
    });
  }

  mapTransactionToRowData() {
    this.rowData = [
      {header: 'Hash', value: this.transaction?.id},
      {header: 'Status', value: this.confirmations > Utils.CONFIRMATION_AMOUNT ? 'Confirmed' : 'Unconfirmed'},
      {header: 'Received Time', value: Utils.timeConverter(<number>this.transaction?.txInput?.timestamp)},
      {header: 'Confirmations', value: this.confirmations},
      {header: 'Total Input', value: this.transaction?.txInput?.amount},
      {header: 'Included in Block', value: this.block?.index || 'Not included'},
    ]
  }

}

