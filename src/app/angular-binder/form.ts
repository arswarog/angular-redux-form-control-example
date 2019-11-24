import { AbstractControl as AngularAbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AbstractControlModel } from '../lib/abstract-control.model';
import { FormModel } from '../lib/form.model';
import { IAbstractControlState } from '../lib/form-control-state.interface';
import { IDispatchFn } from '../lib/interfaces';
import { FormGroupBinder } from './form-group';

export class FormBinder<T extends object> extends FormGroupBinder<T> {
    constructor(angularControl: AngularAbstractControl,
                control: FormModel<T>,
                dispatch: IDispatchFn,
                state$: Observable<IAbstractControlState<T>>) {
        super(angularControl, control, dispatch, state$);

        console.log(control.updateControlState(dispatch))
    }
}