import {SharedService} from "./shared.service";
import {APP_INITIALIZER, FactoryProvider} from "@angular/core";
import {tap} from "rxjs/operators";

function init(sharedService: SharedService) {
  return () => sharedService.init().pipe(tap(value => sharedService.setBlockchain(value)));
}

export const initData: FactoryProvider = {
  provide: APP_INITIALIZER,
  useFactory: init,
  deps: [SharedService],
  multi: true
}
