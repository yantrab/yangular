import { Component} from '@angular/core';
import { ColumnDef } from 'projects/mat-virtual-table/src/public-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mat-virtual-table';
  rows = Array(100000).fill(0).map((x, i) => { return { name: 'name' + i, id: i } });
  columns: ColumnDef[] = [{ field: 'name', title: 'שם' }, { field: 'id', title: 'זהות' }];
}
