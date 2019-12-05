import { AbstractControlBinder } from './abstract';
import {
    FormArray as AngularFormArray,
    FormControl as AngularFormControl,
    FormGroup as AngularFormGroup,
} from '@angular/forms';
import { IDispatchFn, UnknownFieldError } from '../lib/interfaces';
import { Observable } from 'rxjs';
import { FormGroupModel } from '../lib/form-group.model';
import { FormGroup } from '../lib/form-group';
import { filter, map } from 'rxjs/operators';
import { FormControlBinder } from './form-control';

export class FormGroupBinder<T extends object> extends AbstractControlBinder<T> {
    constructor(angularFormGroup: AngularFormGroup,
                formGroupModel: FormGroupModel<T>,
                dispatch: IDispatchFn,
                state$: Observable<FormGroup<T>>) {
        console.log(angularFormGroup);
        super(angularFormGroup, formGroupModel, dispatch, state$);

        Object.entries(formGroupModel.scheme).forEach(
            ([key, control]) => {
                if (!(key in angularFormGroup.controls))
                    throw new UnknownFieldError([key]);

                const angularControl = angularFormGroup.controls[key];

                if (angularControl instanceof AngularFormGroup)
                    return new FormGroupBinder(
                        angularControl,
                        formGroupModel.scheme[key],
                        dispatch,
                        state$.pipe(
                            map(state => state.controls[key]),
                        ),
                    );

                // if (control instanceof FormArrayControl)
                //     return new FormArrayBinder(
                //         control,
                //         formGroupModel.scheme[key],
                //         dispatch,
                //         state$.pipe(
                //             map(state => state.controls[key]),
                //         ),
                //     );

                if (angularControl instanceof AngularFormControl)
                    return new FormControlBinder(
                        angularControl,
                        formGroupModel.scheme[key],
                        dispatch,
                        state$.pipe(
                            filter(state => !!state),
                            map(state => state.controls[key]),
                            filter(state => !!state),
                        ),
                    );

                console.error(angularControl);
                throw new Error('Unknown control');
            },
        );
    }
}
