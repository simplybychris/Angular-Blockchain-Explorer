import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Transfer} from "../service/interface/transfer";
import {Router} from "@angular/router";
import {Transaction} from "../service/interface/transaction";
import Swal from 'sweetalert2';

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

  constructor(private service: DataService, private formBuilder: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.senderAddress = this.service.userPubKey;

    this.transferForm = this.formBuilder.group({
      recipient: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(1)]],
    });
  }

  onFormSubmit(value: any) {
    console.log(value);
    const transferData: Transfer = value;
    this.service.transfer(transferData.recipient, transferData.amount).subscribe(result => {
        this.txs = result;
      },
      error => {
        this.errors = 'Error while sending transaction. Check your info and try again.'
      })
  }

  mine() {
    this.service.mineBlock().subscribe(() => {
      Swal.fire('New block mined successfully!');
    }, () => {
      Swal.fire('Error while mining new block.');
    });
  }
}
