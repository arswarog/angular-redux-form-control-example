import { AnyAction } from 'redux';
import { ActionType } from '../store/actions';
import { IFormControlState } from './form-control-state.interface';

const defaultState: Readonly<IFormControlState<any>> = Object.freeze({
    value   : undefined,
    errors  : null,
    touched : false,
    disabled: false,
    pending : false,
});

export function formControlReducer<T>(state: IFormControlState<T>, action: AnyAction): IFormControlState<T> {
    if (!state)
        state = defaultState;

    switch (action.type) {
        case ActionType.SetName:
            return {
                ...state,
                value: action.value,
            };
        case ActionType.MarkAsTouched:
            return {
                ...state,
                touched: true,
            };
        case ActionType.SetError:
            return {
                ...state,
                errors: {
                    foo: true,
                },
            };
        case ActionType.SetValid:
            return {
                ...state,
                errors: null,
            };
    }

    return state;
}
