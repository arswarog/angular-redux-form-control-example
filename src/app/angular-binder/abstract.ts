import { AbstractControl as AngularAbstractControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { AbstractControlModel } from '../lib/abstract-control.model';
import { AbstractControlInstance } from '../lib/abstract-control-instance';
import { formControlInstance } from '../lib/form-control.instance';
import { IAbstractControlState } from '../lib/form-control-state.interface';
import { IDispatchFn } from '../lib/interfaces';

export type ArgumentsType<F> = F extends (...args: infer A) => any ? A : never;

export abstract class AbstractControlBinder<T> {
    private lastState: IAbstractControlState<T>;

    protected instance: AbstractControlInstance<T>;

    constructor(public angularControl: AngularAbstractControl,
                public control: AbstractControlModel<T>,
                private dispatch: IDispatchFn,
                private state$: Observable<IAbstractControlState<T>>) {
        state$.subscribe(
            state => {
                console.log('UPDATE STATE', state);

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
                          if (this.instance)
                              if (!this.lastState || value !== this.lastState.value)
                                  this.instance.setValue(value);
                      });
        angularControl.statusChanges
                      .subscribe(
                          status => true, // console.log(status),
                      );

        const prevMarkAsTouched = angularControl.markAsTouched;
        const prevMarkAsUntouched = angularControl.markAsUntouched;

        const touchedChanges$ = new Subject<boolean>();

        const _this = this;

        function nextMarkAsTouched(...args: ArgumentsType<AngularAbstractControl['markAsTouched']>) {
            prevMarkAsTouched.bind(angularControl)(...args);
            touchedChanges$.next(true);
            if (_this.instance.untouched) {
                console.log(_this.instance);
                console.log('touch 2');
                if (_this.instance)
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

        angularControl.markAsTouched = nextMarkAsTouched;
        angularControl.markAsUntouched = nextMarkAsUntouched;

        touchedChanges$.subscribe(
            status => console.log(status),
        );
    }
}
