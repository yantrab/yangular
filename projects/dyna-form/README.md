# Angular Dynamic Form

with [class-validator](https://github.com/typestack/class-validator) we can using decorators validation like this:

```typescript
export class User {
    @IsString() @IsEmail() email: string;
    @IsString() @Length(4, 10) password: string;
    @IsOptional() @IsString() msg?: string;
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
      this.dynaFB.buildFormFromClass(User)
        .then(form => (this.form = form));
    }
  }
```

You can create your custom template, or using my form template:

```typescript
formModel: FormModel<User> = {
    feilds: [
        { placeHolder: 'אמייל', key: 'email', appearance: 'outline' },
        { placeHolder: 'סיסמה', key: 'password', type: 'password' },
        { placeHolder: 'כתוב כאן מה אתה רוצה', key: 'msg', isTextera: true },
    ],
    modelConstructor: User,
    model: undefined, // or initial user
    errorTranslations: {
        'must be an email': 'נא הכנס מייל תקין',
        'must be a string': 'שדה חובה',
    },
    formTitle: 'עריכה',
};

this.dialog.open(FormComponent, {
    width: '80%',
    maxWidth: '540px',
    data: this.formModel,
    direction: 'rtl',
});
// or
// <p-form [formModel]="formModel" (submit)="onFormSubmit($event)"></p-form>
```

[stackblitz demo](https://stackblitz.com/edit/angular-material-animation?file=app/dialog-overview-example.ts)
