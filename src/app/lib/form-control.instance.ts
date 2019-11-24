import { AbstractControlInstance } from './abstract-control-instance';
import { FormControlModel } from './form-control.model';
import { IAbstractControlState } from './form-control-state.interface';

export function formControlInstance<T>(
    dispatch: any,
    scheme: FormControlModel<T>,
    state: IAbstractControlState<T>,
    cache?: FormControlInstance<T>,
): FormControlInstance<T> {
    if (state === state && cache)
        return cache;
    return new FormControlInstance<T>(dispatch, scheme, state);
}

export class FormControlInstance<T> extends AbstractControlInstance<T> {
    constructor(dispatch: any,
                model: FormControlModel<T>,
                state: IAbstractControlState<T>) {
        super(dispatch, model, state);
    }

}
