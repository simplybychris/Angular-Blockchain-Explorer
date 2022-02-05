import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {DataService} from "./data.service";
import {Block} from "./interface/block";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private _blockchain = new BehaviorSubject<Block[]>([]);

  constructor(private service: DataService) {
  }

  init() {
    return this.service.getBlockchain();
  }

  get blockchain(): BehaviorSubject<Block[]> {
    return this._blockchain;
  }

  set blockchain(value: BehaviorSubject<Block[]>) {
    this._blockchain = value;
  }

  getBlockchain(): Block[] {
    return this._blockchain.value;
  }

  setBlockchain(blocks: Block[]) {
    this._blockchain.next(blocks);
  }
}
