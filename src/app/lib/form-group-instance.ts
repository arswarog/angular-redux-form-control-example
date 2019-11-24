import { AbstractControlInstance } from './abstract-control-instance';
import { IAbstractControlState } from './form-control-state.interface';
import { FormGroupModel } from './form-group.model';

export function formGroupInstance<T extends object>(
    dispatch: any,
    scheme: FormGroupModel<T>,
    state: IAbstractControlState<T>,
    cache?: FormGroupInstance<T>,
): FormGroupInstance<T> {
    if (state === state && cache)
        return cache;
    return new FormGroupInstance<T>(dispatch, scheme, state);
}

export class FormGroupInstance<T extends object> extends AbstractControlInstance<T> {
    constructor(dispatch: any,
                control: FormGroupModel<T>,
                state: IAbstractControlState<T>) {
        super(dispatch, control, state);
    }

}
