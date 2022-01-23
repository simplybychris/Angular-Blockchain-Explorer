import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Row} from "./row";

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit, OnChanges {

  @Input() data: Array<Row> = [];

  constructor() { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    this.data = changes.data.currentValue;
  }

}
