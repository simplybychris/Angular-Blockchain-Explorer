import {Component, OnInit} from '@angular/core';
import {Column} from "./table/column";
import {DataService} from "../service/data.service";
import Utils from "./utils";
import {SharedService} from "../service/shared.service";

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  blocks: any[] = [];
  txs: any[] = [];

  constructor(private service: DataService, private sharedService: SharedService) {
    this.service.getBlockchain()
      .subscribe((res) => {
        [...res].forEach(r => {
          const diff = Utils.timeDiffCalc(Date.now(), r.timestamp);
          r.timestamp = diff+' ago';
        })
        this.blocks = res;
        this.sharedService.setBlockchain(res);
      });

    this.service.getAllTransactions()
      .subscribe((res) => {
        [...res].forEach(r => {
          const date = new Date(r.txInput.timestamp);
          r.txInput.formatTimestamp = date.getHours() + ':' + date.getMinutes();
        })

        this.txs = [...res].filter(tx =>
          tx.txOutputs.every((out: any) => out.address != Utils.COINBASE_ADDRESS)
        ).map(res => {
          return {
            id: res.id, formatTimestamp: res.txInput.formatTimestamp, timestamp: res.txInput.timestamp, amount: res.txOutputs
              .filter((tx: { address: any; }) => tx.address !== res.txInput.address)
              .map((tx: { amount: any; }) => tx.amount)
              .reduce((a: any, b: any) => a + b)
          }
        }).sort((a, b) => a.timestamp - b.timestamp);
      });
  }

  ngOnInit(): void {
  }

  blockCols: Column[] = [
    {name: 'index', header: 'Height', link: 'block/{hash}'},
    {name: 'hash', header: 'Hash', link: 'block/{hash}'},
    {name: 'timestamp', header: 'Mined'},
  ];

  txCols: Column[] = [
    {name: 'id', header: 'Id', link: 'transaction/{id}'},
    {name: 'formatTimestamp', header: 'Time'},
    {name: 'amount', header: 'Amount'},
  ]


}
