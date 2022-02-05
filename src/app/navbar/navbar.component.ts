import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";
import {Router} from "@angular/router";
import Utils from "../explorer/utils";
import {Block} from "../service/interface/block";
import {SharedService} from "../service/shared.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  search: string = "";
  blocks!: Block[];

  constructor(private service: DataService, private sharedService: SharedService, private router: Router) {
  }

  ngOnInit(): void {
    this.sharedService.blockchain.subscribe(value => this.blocks = value);
  }

  onWalletClick() {
    this.router.navigateByUrl('address/' + this.service.userPubKey);
  }

  handleSubmit() {
    if (this.search.trim() === '') return;
    if (Utils.isAddress(this.search)) {
      this.router.navigateByUrl('address/' + this.search);
    } else if (Utils.isBlockAddress(this.search)) {
      this.router.navigateByUrl('block/' + this.search);
    } else if (Utils.isTransaction(this.search)) {
      this.router.navigateByUrl('transaction/' + this.search);
    } else if (!isNaN(Number(this.search))) {
      const index = Number(this.search);
      this.blocks.length - 1 >= index ? this.router.navigateByUrl('block/' + this.blocks[index].hash) : this.router.navigateByUrl('not-found');
    } else {
      this.router.navigateByUrl('not-found');
    }
  }

  handleKeyUp(e: any) {
    if (e.keyCode === 13) {
      this.handleSubmit();
    }
  }
}
