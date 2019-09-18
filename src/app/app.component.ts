import { Component, OnInit } from '@angular/core';
import { ColumnDef, TableComponent } from 'projects/mat-virtual-table/src/public-api';
import { MatDialog } from '@angular/material';
import { FormComponent } from '../../projects/dyna-form/src/lib/form/form.component';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
export class User {
  @IsOptional() @IsString() @Length(5, 10) password: string;
  @IsString() company: string;
  @IsString() phone: string;
  @IsString() @IsEmail() email: string;
  @IsOptional() @IsString() details?: string;
  @IsOptional() @IsString() fName?: string;
  @IsOptional() @IsString() lName?: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
   constructor(private dialog: MatDialog){}
    rows = [];
    columns: ColumnDef[] = [
        { field: 'name' },
        { field: 'name2', title: 'שם' },
        { field: 'long' },
        { field: 'long2' },
        { field: 'long3' },
    ];
    ngOnInit(): void {
        // setTimeout(() => {
        this.columns = [
            { field: 'name' },
            { field: 'name2', title: 'שם' },
            { field: 'long' },
            { field: 'long2', format: value => value + '----------' },
            { field: 'long3' },
            { field: 'long4' },
        ];
        this.rows = Array(1000)
            .fill(0)
            .map((x, i) => {
                return {
                    name: 'name' + i,
                    id: i,
                    name2: 'Long nameeeeeee' + i,
                    id2: i,
                    long: 'long long long long long long',
                    long2: 'long long long long long long, long long long long long long',
                    long3: 'long long long long long long long long long long long long long long long long long long',
                    long4: 'long long long long long long',
                };
            });
        // }, 1000);
    }

  openDialog() {
    this.dialog.open(TableComponent, {
      width: '900px',
      height:'500px',
      data: {
        rows: this.rows,
        columnsDef: this.columns
      },
    });
  }

  openForm() {
    const formModel = {
      feilds: [
        { placeHolder: 'אמייל', key: 'email' },
        { placeHolder: 'חברה', key: 'company' },
        { placeHolder: 'שם פרטי', key: 'fName' },
        { placeHolder: 'שם משפחה', key: 'lName' },
        { placeHolder: 'טלפון', key: 'phone' },
      ],
      modelConstructor: User,
      model: new User,
    };

      this.dialog.open(FormComponent, {
      width: '80%',
      maxWidth: '540px',
      data: formModel,
      direction: 'rtl',
    });
  }
}
