# NgDialogAnimation

This library using angular material dialog with animation, title, and rtl support.
 
## options
1. Title.
2. Auto set diraction rtl when find dit='rtl'.
3. position.rowEnd/position.rowStart.
4. Animation - 
```typescript
    animation?:
        | {
              to: 'aside' | 'top' | 'bottom' | 'left' | 'right';
              incomingOptions?: { keyframes?: Keyframe[]; keyframeAnimationOptions: KeyframeAnimationOptions };
              outgoingOptions?: { keyframes?: Keyframe[]; keyframeAnimationOptions: KeyframeAnimationOptions }
          }
        | {
              to?: 'aside' | 'top' | 'bottom' | 'left' | 'right';
              incomingOptions?: { keyframes: Keyframe[]; keyframeAnimationOptions: KeyframeAnimationOptions };
              outgoingOptions?: { keyframes: Keyframe[]; keyframeAnimationOptions: KeyframeAnimationOptions };
          };

```
[stackblitz playground](https://stackblitz.com/edit/angular-material-animation?file=app/dialog-overview-example.ts)

## Get started
### install
```
npm i ng-dialog-animation

```

### add to providers 
```typescript
@NgModule({
//....
    providers: [
        NgDialogAnimationService,
    ],
})
//......
```

### inject to your component
```typescript
import { NgDialogAnimationService } from 'ng-dialog-animation';

export class SomeComponent {
  constructor(public dialog: NgDialogAnimationService) {
  }
}
```

### now you can use it like material dialog with the extra things
```typescript
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "250px",
      animation: { to: "aside" }
    }
}
```
