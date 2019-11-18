import { AbstractControlInstance } from './abstract-control-instance';
import { IFormControlState } from './form-control-state.interface';
import { FormGroup } from './form-group';

export function formGroupInstance<T extends object>(
    dispatch: any,
    scheme: FormGroup<T>,
    state: IFormControlState<T>,
    cache?: FormGroupInstance<T>,
): FormGroupInstance<T> {
    if (state === state && cache)
        return cache;
    return new FormGroupInstance<T>(dispatch, scheme, state);
}

export class FormGroupInstance<T extends object> extends AbstractControlInstance<T> {
    constructor(dispatch: any,
                control: FormGroup<T>,
                state: IFormControlState<T>) {
        super(dispatch, control, state);
    }

}
