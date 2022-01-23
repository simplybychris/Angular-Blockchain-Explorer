import {Component, OnInit} from '@angular/core';
import {DataService} from "../service/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  search: String = "";

  constructor(private service: DataService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onWalletClick() {
    this.router.navigateByUrl('address/' + this.service.userPubKey);
  }


}
