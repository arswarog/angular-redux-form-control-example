import { AbstractControlBinder } from './abstract';
import { FormControl as AngularFormControl } from '@angular/forms';
import { FormGroupModel } from '../lib/form-group.model';
import { IDispatchFn } from '../lib/interfaces';
import { Observable } from 'rxjs';
import { FormGroup } from '../lib/form-group';
import { FormControlModel } from '../lib/form-control.model';
import { FormControl } from '../lib/form-control';

export class FormControlBinder<T extends object> extends AbstractControlBinder<T> {
    constructor(angularControl: AngularFormControl,
                formControlModel: FormControlModel<T>,
                dispatch: IDispatchFn,
                state$: Observable<FormControl<T>>) {
        console.log(angularControl);
        super(angularControl, formControlModel, dispatch, state$);
    }
}
