import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {DataService} from "../../service/data.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, OnChanges {

  @Input() columns: Array<any> = [];
  @Input() dataset: Array<any> = [];
  dataSource: MatTableDataSource<any> = new MatTableDataSource;
  tableCols: string[] = [];
  constructor(private service: DataService) {
  }

  ngOnInit(): void {
    this.tableCols = this.tableCols.concat(this.columns.map(c => c.name));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.embedLinks();
    this.refresh();
  }

  refresh(): void {
    this.dataSource = new MatTableDataSource<any>(this.dataset);
  }

  embedLinks() {
    this.columns.forEach(col => {
      if (col.link !== undefined) {
        this.dataset.forEach(row => {
          const result = col.link.match(/\{(.*)\}/);
          let newLink = result.input.replace(result[0], row[result[1]]);
          row.link = ''+newLink;
        });
      }
      return;
    })
  }
}

