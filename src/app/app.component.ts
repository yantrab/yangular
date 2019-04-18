import { Component, OnInit } from '@angular/core';
import { ColumnDef } from 'projects/mat-virtual-table/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mat-virtual-table';
  rows: any = Array(500000).fill(0).map((x, i) => {
    return {
      name: 'name' + i, id: i, name2: 'name' + i, id2: i,
      long: 'fdsasdfdsasdfdsasdfdsasdfdsasdf',
      long3: 'fdsasdfdsasdfdsasdfdsasdfdsasdf'
    };
  });
  columns: ColumnDef[] = [
    { field: 'name' },
    { field: 'name2', title: 'שם', width: '10px' },
    { field: 'long' },
    { field: 'long3' },
  ];
  ngOnInit(): void {
    setTimeout(() => {
      //this.rows = Array(500000).fill(0).map((x, i) => { return { name: 'name' + i, id: i, } });;
    }, 1000);
  }
}
