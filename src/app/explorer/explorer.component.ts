import {Component, OnInit} from '@angular/core';
import {Column} from "./table/column";
import {DataService} from "../service/data.service";
import Utils from "./utils";

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

  blocks: any[] = [];
  txs: any[] = [];

  constructor(private service: DataService) {
    this.service.getBlockchain()
      .subscribe((res) => {
        [...res].forEach(r => {
          const diff = Utils.timeDiffCalc(Date.now(), r.timestamp);
          r.timestamp = diff+' ago';

          // r.miner = [r.data[r.data.length - 1]].find((tx:Transaction) => {
          //   tx.txOutputs.forEach(txOut => {
          //     return txOut.address === "0000000000000000000000000000000000000000000000000000000000000000";
          //   })
          // }).map((tx:Transaction) => {
          //   return tx?.txOutputs[0]?.address;
          // })
        })
        this.blocks = [...res]
        console.log("blocks: ", this.blocks);
      });

    this.service.getAllTransactions()
      .subscribe((res) => {
        // console.log("txs:", res);
        // const data = res;
        [...res].sort((a, b) => a.timestamp - b.timestamp).forEach(r => {
          const date = new Date(r.txInput.timestamp);
          r.txInput.timestamp = date.getHours() + ':' + date.getMinutes();
          r.txInput
        })

        this.txs = [...res].filter(tx =>
          tx.txOutputs.every((out: any) => out.address != Utils.COINBASE_ADDRESS)
        ).map(res => {
          return {
            id: res.id, timestamp: res.txInput.timestamp, amount: res.txOutputs
              .filter((tx: { address: any; }) => tx.address !== res.txInput.address)
              .map((tx: { amount: any; }) => tx.amount)
              .reduce((a: any, b: any) => a + b)
          }
        })
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
    {name: 'timestamp', header: 'Time'},
    {name: 'amount', header: 'Amount'},
  ]


}
