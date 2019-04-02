import { Component } from '@angular/core';
import { ColumnDef } from 'projects/mat-virtual-table/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mat-virtual-table';
  rows = Array(1000000).fill(0).map((x, i) => { return { name: 'name' + i, id: i, name2: 'name' + i, id2: i } });
}
