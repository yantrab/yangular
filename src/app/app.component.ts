import { Component, OnInit } from '@angular/core';
import { ColumnDef, TableComponent } from 'projects/mat-virtual-table/src/public-api';
import { FormComponent, FormModel } from '../../projects/dyna-form/src/lib/form/form.component';
import { IsEmail, IsOptional, IsString, Length,IsEnum } from 'class-validator';
import { NgDialogAnimationService } from '../../projects/ng-dialog-animation/src/lib/ng-dialog-animation.service';
enum IsGirl{
  YES,
  NO
}
export class User {
    @IsString() @IsEmail() email: string;
    @IsString() @Length(4, 10) password: string;
    @IsOptional() @IsString() msg?: string;
    @IsEnum(IsGirl) isGirl: IsGirl;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(private dialog: NgDialogAnimationService) {}
    formModel: FormModel<User> = {
        fields: [
            { placeHolder: 'אמייל', key: 'email', appearance: 'outline' },
            { placeHolder: 'סיסמה', key: 'password', type: 'password' },
            { placeHolder: 'כתוב כאן מה אתה רוצה', key: 'msg', isTextera: true },
            { placeHolder: "some radio", options:[{value:0, title: "YES"}, {value:1, title: "NO"}], key:"isGirl", type:"radio"}
        ],
        modelConstructor: User,
        model: {isGirl: IsGirl.YES}, // or initial user
        errorTranslations: {
            'must be an email': 'נא הכנס מייל תקין',
            'must be a string': 'שדה חובה',
        },
        formTitle: 'עריכה',
    };
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
        this.rows = Array(100)
            .fill(0)
            .map((x, i) => {
                return {
                    name: 'name' + i,
                    id: i,
                    name2: 'Long nameeeeeee' + i,
                    id2: i,
                    long: 'short ',
                    long2: 'short short short',
                    long3: 'short short short',
                    long4: 'short short short',
                };
            });

      this.rows.push(...Array(20)
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
        }));
        // }, 1000);
    }

    openDialog() {
        this.dialog.open(TableComponent, {
            width: '900px',
            height: '500px',
            title: 'title',

            data: {
                rows: this.rows,
                columnsDef: this.columns,
            },
        });
    }

    openForm() {
        this.dialog.open(FormComponent, {
            width: '80%',
            height: '500px',
            maxWidth: '540px',
            data: this.formModel,
            position: {rowEnd: '0'}
        });
    }
    onFormSubmit(val) {
        console.log(val);
    }
}
