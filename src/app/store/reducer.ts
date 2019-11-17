import { AnyAction } from 'redux';
import { IFormControlState } from '../lib/form-control-state.interface';
import { formControlReducer } from '../lib/form-control.reducer';
import { ActionType } from './actions';

export interface IRootState {
    name: IFormControlState<string>;
    pass: string;
}

const defaultState: IRootState = Object.freeze({
    name: undefined,
    pass: '',
});

export function rootReducer(state: IRootState, action: AnyAction): IRootState {
    if (!state)
        state = defaultState;

    switch (action.type) {
        case ActionType.SetName:
        case ActionType.SetError:
        case ActionType.SetValid:
        case ActionType.MarkAsTouched:
            return {
                ...state,
                name: formControlReducer(state.name, action),
            };
        case ActionType.InitForm:
            return defaultState;
    }
    return state;
}
