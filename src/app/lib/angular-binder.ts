import { AbstractControl as AngularAbstractControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AbstractControl } from './abstract-control';
import { AbstractControlInstance } from './abstract-control-instance';
import { formControlInstance } from './form-control-instance';
import { IFormControlState } from './form-control-state.interface';
import { IDispatchFn } from './interfaces';

export type ArgumentsType<F> = F extends (...args: infer A) => any ? A : never;

export class AngularFormControlBinder<T> {
    private lastState: IFormControlState<T>;

    protected instance: AbstractControlInstance<T>;

    constructor(public angularControl: AngularAbstractControl,
                public control: AbstractControl<T>,
                private dispatch: IDispatchFn,
                private state$: Observable<IFormControlState<T>>) {
        state$.subscribe(
            state => {
                if (!state)
                    return;

                this.instance = formControlInstance(
                    dispatch,
                    control as any,
                    state,
                    this.instance as any,
                );

                if (state.value !== angularControl.value)
                    angularControl.setValue(state.value);
                if (state.errors !== angularControl.errors)
                    angularControl.setErrors(state.errors);
                if (state.touched && angularControl.untouched) {
                    console.log('touch 1');
                    angularControl.markAsTouched();
                }
                if (!state.touched && angularControl.touched) {
                    console.log('untouch 1');
                    angularControl.markAsUntouched();
                }

                this.lastState = state;
            },
        );

        angularControl.valueChanges
                      .subscribe(value => {
                          if (!this.lastState || value !== this.lastState.value)
                              this.instance.setValue(value);
                      });
        angularControl.statusChanges
                      .subscribe(
                          status => console.log(status),
                      );

        const prevMarkAsTouched   = angularControl.markAsTouched;
        const prevMarkAsUntouched = angularControl.markAsUntouched;

        const touchedChanges$ = new Subject<boolean>();

        const _this = this;

        function nextMarkAsTouched(...args: ArgumentsType<AngularAbstractControl['markAsTouched']>) {
            prevMarkAsTouched.bind(angularControl)(...args);
            touchedChanges$.next(true);
            if (_this.instance.untouched) {
                console.log(_this.instance);
                console.log('touch 2');
                _this.instance.markAsTouched();
            }
        }

        function nextMarkAsUntouched(...args: ArgumentsType<AngularAbstractControl['markAsUntouched']>) {
            prevMarkAsUntouched.bind(angularControl)(...args);
            touchedChanges$.next(false);
            if (_this.instance.touched) {
                console.log('untouch 2');
                _this.instance.markAsUntouched();
            }
        }

        angularControl.markAsTouched   = nextMarkAsTouched;
        angularControl.markAsUntouched = nextMarkAsUntouched;

        touchedChanges$.subscribe(
            status => console.log(status),
        );
    }
}
