import { Component, OnInit } from '@angular/core';
import { ColumnDef } from 'projects/mat-virtual-table/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.rows = Array(500000).fill(0).map((x, i) => { return { name: 'name' + i, id: i, } });;
    }, 1000);
  }
  title = 'mat-virtual-table';
  rows: any = Array(100).fill(0).map((x, i) => { return { name: 'name' + i, id: i, name2: 'name' + i, id2: i } });
}
