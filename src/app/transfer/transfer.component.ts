import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Transfer} from "../service/interface/transfer";
import {Router} from "@angular/router";
import {Transaction} from "../service/interface/transaction";
import Swal from 'sweetalert2';
import {finalize} from "rxjs/operators";
import {SharedService} from "../service/shared.service";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {
  transferForm!: FormGroup;
  senderAddress: string = "";
  errors: any;
  txs: Transaction[] = [];
  isBlockMined: boolean = false;

  constructor(private service: DataService, private sharedService: SharedService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.service.getPubKey().subscribe((res) => {
      this.senderAddress = res.publicKey;
    })

    this.transferForm = this.formBuilder.group({
      recipient: [null, [Validators.required, Validators.pattern('^[A-Fa-f0-9]{130}$')]],
      amount: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onFormSubmit(value: any) {
    const transferData: Transfer = value;
    this.service.transfer(transferData.recipient, transferData.amount).subscribe(result => {
        this.txs = result;
      },
      () => {
        Swal.fire('Transaction Error', 'Error while sending transaction. Check your data/balance and try again.', 'error');
      })
  }

  mine() {
    this.isBlockMined = true;
    this.service.mineBlock().pipe(finalize(() => this.isBlockMined = false)).subscribe(value => {
      this.sharedService.setBlockchain(value)
      this.txs = [];
      Swal.fire('New block mined successfully!');
    }, () => {
      Swal.fire('Error while mining new block.');
    });
  }
}
