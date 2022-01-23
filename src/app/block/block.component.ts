import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataService} from "../service/data.service";
import {Block} from "../service/interface/block";
import Utils from "../explorer/utils";
import {Row} from "../row/row";
import {Transaction} from "../service/interface/transaction";

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss'],
})
export class BlockComponent implements OnInit {

  paramId: string = '';
  block: Block = {};
  time: string = '';
  miner: string | undefined = '';
  rewardAmount: number = 0;
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
      }
    );

    this.service.getBlockchain().subscribe((res) => {
      this.block = res.find((block:Block) => block.hash === this.paramId);

      if (this.block === undefined) {
        this.router.navigateByUrl('/');
      }
      this.time = Utils.timeConverter(<number>this.block.timestamp);
      this.miner = Utils.getMinerAddress(this.block);
      this.rewardAmount = Utils.getBlockTotalMoney(this.block);

      this.service.getBlockConfirmations(this.block?.index!!).subscribe((confirmations) => {
        this.confirmations = confirmations;
        this.block.data!!.forEach((tx: Transaction) => tx.confirmations = confirmations);
        this.mapBlockToRowData();
      })

      // console.log(block);
    })
  }

  mapBlockToRowData() {
    this.rowData = [
      {header: 'Hash', value: this.block.hash},
      {header: 'Height', value: this.block.index},
      {header: 'Confirmations', value: this.confirmations},
      {header: 'Timestamp', value: this.time},
      {header: 'Status', value: this.confirmations > Utils.CONFIRMATION_AMOUNT ? 'Confirmed' : 'Unconfirmed'},
      {header: 'Miner', value: this.miner},
      {header: 'Number of Transactions', value: this.block.data?.length},
      {header: 'Transaction volume', value: this.rewardAmount},
      {header: 'Difficulty', value: this.block.difficulty},
      {header: 'Nonce', value: this.block.nonce},
      {header: 'Block Reward', value: '50 STUD'},
    ]
  }

}
