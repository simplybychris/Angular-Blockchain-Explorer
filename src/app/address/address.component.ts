import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Row} from "../row/row";
import Utils from "../explorer/utils";
import {Block} from "../service/interface/block";
import {Transaction, TransactionOutput} from "../service/interface/transaction";
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  paramId: string = '';
  rowData: Array<Row> = [];
  @ViewChild('qr', {static: true}) qr!: ElementRef;
  addressTxs: Transaction[] = [];
  totalReceived: number = 0;
  totalSent: number = 0;
  balance: number = 0;
  saleData: any[] = [];


  constructor(private route: ActivatedRoute,
              private service: DataService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.paramId = params['id'];
        if (!Utils.isAddress(this.paramId)) this.router.navigateByUrl('/not-found')

        this.service.getBlockchain().subscribe((res) => {
          const txsArr: Transaction[] = res.map((block: Block) => block.data).flat();
          this.addressTxs = txsArr.filter((tx: Transaction) => tx.txInput?.address === this.paramId ||
            tx.txOutputs!!.some((txOut: TransactionOutput) => txOut.address === this.paramId));

          this.totalReceived = this.addressTxs.flatMap(tx => tx.txOutputs).filter(txOut => txOut!!.address === this.paramId).map(txOut => txOut!!.amount).reduce((a, b) => a!! + b!!, 0)!!;
          this.totalSent = this.addressTxs.flatMap(tx => tx.txInput).filter(txOut => txOut!!.address === this.paramId).map(txIn => txIn!!.amount).reduce((a, b) => a!! + b!!, 0)!!;

          this.service.checkAddressBalance(this.paramId).subscribe((res) => {
            this.balance = Number(res);
            this.mapTransactionToRowData();
          });

          this.saleData = [
            {name: "Total Received", value: this.totalReceived},
            {name: "Total Sent", value: this.totalSent}
          ];
        });
      }
    );
  }


  mapTransactionToRowData() {
    this.rowData = [
      {header: 'Address', value: this.paramId},
      {header: 'Total Transactions', value: this.addressTxs.length},
      {header: 'Total Received', value: this.totalReceived + ' STUD'},
      {header: 'Total Sent', value: this.totalSent + ' STUD'},
      {header: 'Final Balance', value: this.balance + ' STUD'},
    ]
  }


}
