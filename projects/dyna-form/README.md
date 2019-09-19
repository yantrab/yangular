# Angular Dynamic Form
with [class-validator](https://github.com/typestack/class-validator) we can using decorators validation like this:

```typescript
export class User {
  @IsString() @IsEmail() email: string;
  @IsOptional() @IsString() details?: string;
  @IsString() fName: string;
  @IsString() lName: string;
} 
```

This module help you to prevent rewrite the validation in angular forms.

## Get Started
### instalation 

```
npm i ng-dyna-form
```

### import to NgModule
```typescript
@NgModule({
    imports: [
        //...
        DynaFormModule,
        //...
    ],
})
```
### build form
```typescript
  constructor(private dynaFB: DynaFormBuilder) {
      this.dynaFB.buildFormFromClass(User, new User())
        .then(form => (this.form = form));
    }
  }
```

You can create your custom template, or using my form template:
```typescript
const formModel: FormModel<User> = {
    feilds: [
      { placeHolder: 'אמייל', key: 'email' },
      { placeHolder: 'שם פרטי', key: 'fName' },
      { placeHolder: 'שם משפחה', key: 'lName' },
      { placeHolder: 'פרטים נוספים', key: 'details' },
    ],
    modelConstructor: User,
    model: new User(),
    errorTranslations: {
      'must be an email': 'נא הכנס מייל תקין',
      'must be a string': 'שדה חובה'
    }
  };

    this.dialog.open(FormComponent, {
      width: '80%',
      maxWidth: '540px',
      data: this.formModel,
      direction: 'rtl',
    });
    // or 
    // <p-form [formModel]="formModel"></p-form>

``` 

[stackblitz demo](https://stackblitz.com/edit/mat-virtual-table-special-cells-tpapjd)
