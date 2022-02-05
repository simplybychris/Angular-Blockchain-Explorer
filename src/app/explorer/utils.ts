import {Transaction} from "../service/interface/transaction";
import {Block} from "../service/interface/block";
import {environment} from "../../environments/environment";
import {SharedService} from "../service/shared.service";

export default class Utils {

  public static CONFIRMATION_AMOUNT: number = environment.confirmation_amount;
  public static COINBASE_ADDRESS: string = environment.coinbase_address;

  static timeDiffCalc(dateFuture: number, dateNow: number) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

    const days = Math.floor(diffInMilliSeconds / 86400);
    diffInMilliSeconds -= days * 86400;

    const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
    diffInMilliSeconds -= hours * 3600;

    const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
    diffInMilliSeconds -= minutes * 60;

    let difference = '';
    if (days > 0) {
      difference += (days === 1) ? `${days} day, ` : `${days} days, `;
    }

    if (hours > 0) {
      difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
    }

    difference += (minutes === 0 || hours === 1) ? `${minutes} minute` : `${minutes} minutes`;

    return difference;
  }

  static timeConverter(UNIX_timestamp: number) {
    const a = new Date(UNIX_timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  }

  static getMinerAddress(block: Block) {
    const tx = block.data?.find((tx: Transaction) => {
      return tx.txOutputs?.find((txOut => {
        return txOut.address == Utils.COINBASE_ADDRESS;
      }));
    });

    return tx?.txOutputs![0].address;
  }

  static getBlockTotalMoney(block: Block) {
    let amount = 0;
    block.data?.forEach((tx: Transaction) => {
      tx.txOutputs?.forEach(txOut => {
        txOut && txOut.address != Utils.COINBASE_ADDRESS ? (amount += txOut.amount || 0) : 0;
      })
    })

    return amount;
  }

  static isAddress(address: string) {
    return (/^[0-9a-f]{130}$/.test(address) || /^[0-9A-F]{130}$/.test(address));
  };

  static isBlockAddress(blockAddress: string) {
    return /^[0]{4}[a-fA-F0-9]{60}$/i.test(blockAddress);
  }

  static isTransaction(txId: string) {
    return (/^[0-9a-f]{64}$/i.test(txId));
  }
}
