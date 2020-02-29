import { Inject, Injectable, NgZone, Optional, TemplateRef } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig as _MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

const diractionMap = { left: 'left', right: 'left', top: 'top', bottom: 'top' };
const multyMap = { left: 1, right: -1, top: 1, bottom: -1 };

export interface AnimationOption {
    keyframes?: Keyframe[];
    keyframeAnimationOptions: KeyframeAnimationOptions;
}

export interface MatDialogConfig extends _MatDialogConfig {
    title?: string;
    animation?:
        | {
              to: 'aside' | 'top' | 'bottom' | 'left' | 'right';
              incomingOptions?: { keyframes?: Keyframe[]; keyframeAnimationOptions: KeyframeAnimationOptions };
              outgoingOptions?: { keyframes?: Keyframe[]; keyframeAnimationOptions: KeyframeAnimationOptions };
          }
        | {
              to?: 'aside' | 'top' | 'bottom' | 'left' | 'right';
              incomingOptions?: { keyframes: Keyframe[]; keyframeAnimationOptions: KeyframeAnimationOptions };
              outgoingOptions?: { keyframes: Keyframe[]; keyframeAnimationOptions: KeyframeAnimationOptions };
          };
    position?: DialogPosition & { rowStart?: string; rowEnd?: string };
}

@Injectable({
    providedIn: 'root',
})
export class NgDialogAnimationService {
    constructor(
        private dialog: MatDialog,
        private ngZone: NgZone,
        @Optional()
        @Inject('INCOMING_OPTION')
        private incomingOptions?: AnimationOption,
        @Optional()
        @Inject('OUTGOING_OPTION')
        private outgoingOptions?: AnimationOption,
    ) {}

    open<T, D = any, R = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: MatDialogConfig,
    ): MatDialogRef<T, R> {
        const dir: 'ltr' | 'rtl' =
            config.direction || (document.querySelectorAll('[dir="rtl"]').length ? 'rtl' : 'ltr');
        config.direction = config.direction || dir;
        if (config.animation) {
            if (config.animation.to === 'aside') {
                config.animation.to = dir === 'rtl' ? 'left' : 'right';
            }
        }

        if (config.position && config.position.rowEnd) {
          if (dir === 'rtl') {
            config.position.right = config.position.rowEnd;
          } else {
            config.position.left = config.position.rowEnd;
          }
        }

        if (config.position && config.position.rowStart) {
          if (dir === 'rtl') {
            config.position.left = config.position.rowStart;
          } else {
            config.position.right = config.position.rowStart;
          }
        }

        const ref = this.dialog.open(componentOrTemplateRef, config);
        const container = document.getElementsByTagName('mat-dialog-container')[0] as HTMLElement;
        if (config.title) {
            const el = document.createElement('span');
            el.textContent = config.title;
            el.className = 'dialogTitle';

            const elClose = document.createElement('span');
            elClose.textContent = 'X';
            elClose.className = 'dialogClose';
            elClose.addEventListener('click', () => {
                ref.close();
            });

            const titleContainer = document.createElement('div');
            titleContainer.className = 'titleContainer';
            titleContainer.append(el);
            titleContainer.append(elClose);
            container.prepend(titleContainer);
        }

        if (config.animation) {
            const incomingOptions: AnimationOption = config.animation.incomingOptions ||
                this.incomingOptions || { keyframeAnimationOptions: { duration: 600, easing: 'ease-in' } };

            const outgoingOptions: AnimationOption = config.animation.outgoingOptions ||
                this.outgoingOptions || { keyframeAnimationOptions: { duration: 600, easing: 'ease-out' } };

            const wrapper = document.getElementsByClassName('cdk-global-overlay-wrapper')[0];

            const animate = (keyframes, options) => {
                return wrapper.animate(keyframes, options);
            };
            const _afterClosed = new Subject();
            ref.afterClosed = () => {
                return _afterClosed.asObservable();
            };
            const closeFunction = ref.close;

            let incomeKeyFrames = incomingOptions.keyframes;
            let outgoingKeyFrames = outgoingOptions.keyframes;
            if (config.animation.to) {
                const to = diractionMap[config.animation.to];
                const keyFrame100 = {};
                const keyFrame0 = {};
                keyFrame0[to] = 0;
                keyFrame100[to] =
                    to === 'top' || to === 'bottom'
                        ? container.clientHeight * multyMap[config.animation.to] + 'px'
                        : container.clientWidth * multyMap[config.animation.to] + 'px';
                incomeKeyFrames = incomeKeyFrames || [keyFrame100, keyFrame0];
                outgoingKeyFrames = outgoingKeyFrames || [keyFrame0, keyFrame100];
            }
            animate(incomeKeyFrames, incomingOptions.keyframeAnimationOptions);
            const closeHandler = (dialogResult?: R) => {
                _afterClosed.next(dialogResult);
                const animation = animate(outgoingKeyFrames, outgoingOptions.keyframeAnimationOptions);
                animation.onfinish = () => {
                    (wrapper as HTMLElement).style.display = 'none';
                    this.ngZone.run(() => ref.close(dialogResult));
                };
                ref.close = closeFunction;
            };
            ref.close = (dialogResult?: R) => closeHandler(dialogResult);
        }

        return ref;
    }
}
