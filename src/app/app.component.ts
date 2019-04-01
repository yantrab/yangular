import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mat-virtual-table';
  rows = Array(1000000).fill(0).map((x, i) => { return { name: i + 'name' + i, id: i } });
}
