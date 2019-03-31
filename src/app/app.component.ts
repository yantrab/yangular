import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mat-virtual-table';
  rows = Array(10000).fill({ name: 'name', id: 'id' });
  ngOnInit() {
    setTimeout(() => {
      this.rows = Array(10000).fill({ name: 'name', id: 'id' });

    }, 200);
  }
}
