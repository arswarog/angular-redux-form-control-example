import { AbstractControlInstance } from './abstract-control-instance';
import { FormControl } from './form-control';
import { IAbstractControlState } from './form-control-state.interface';

export function formControlInstance<T>(
    dispatch: any,
    scheme: FormControl<T>,
    state: IAbstractControlState<T>,
    cache?: FormControlInstance<T>,
): FormControlInstance<T> {
    if (state === state && cache)
        return cache;
    return new FormControlInstance<T>(dispatch, scheme, state);
}

export class FormControlInstance<T> extends AbstractControlInstance<T> {
    constructor(dispatch: any,
                control: FormControl<T>,
                state: IAbstractControlState<T>) {
        super(dispatch, control, state);
    }

}
