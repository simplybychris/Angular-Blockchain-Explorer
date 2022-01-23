import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL: string = environment.baseUrl;
  userPubKey: string = "";

  constructor(private http: HttpClient) {
    this.getPubKey().subscribe((res) => {
      this.userPubKey = res.publicKey;
    })
  }

  getBlockchain(): Observable<any> {
    return this.http.get(this.baseURL + '/blocks');
  }

  getPubKey(): Observable<any> {
    return this.http.get(this.baseURL + '/pubkey')
  }

  mineBlock(): Observable<any> {
    return this.http.get(this.baseURL + '/mine-transactions');
  }

  getTransactions(): Observable<any> {
    return this.http.get(this.baseURL + '/transactions');
  }

  getAllTransactions(): Observable<any> {
    return this.http.get(this.baseURL + '/allTxs');
  }

  checkAddressBalance(pubKey: string): Observable<any> {
    return this.http.post(this.baseURL + '/balance', {publicKey: pubKey});
  }

  transfer(recipient: string, amount: string): Observable<any> {
    return this.http.post(this.baseURL + '/transact', {recipient: recipient, amount: amount});
  }

  getBlockConfirmations(blockHeight: number): Observable<any> {
    return this.http.post(this.baseURL + '/confirmations', {index: blockHeight});
  }
}
