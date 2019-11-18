import { AnyAction } from 'redux';
import { IFormControlState } from '../lib/form-control-state.interface';
import { bindActionToControl, formControlReducer } from '../lib/form-control.reducer';
import { ActionType } from './actions';
import * as FormActions from '../lib/actions';

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

    state = {
        ...state,
        name: formControlReducer(state.name, action),
    };

    switch (action.type) {
        case ActionType.InitForm:
            return defaultState;
        case ActionType.SetName:
            return {
                ...state,
                name: formControlReducer(
                    state.name,
                    bindActionToControl(
                        FormActions.SetValue(action.value),
                        state.name,
                    ),
                ),
            };
        case ActionType.SetError:
            return {
                ...state,
                name: formControlReducer(
                    state.name,
                    bindActionToControl(
                        FormActions.SetErrors({
                            foo: 'bar',
                        }),
                        state.name,
                    ),
                ),
            };
        case ActionType.SetValid:
            return {
                ...state,
                name: formControlReducer(
                    state.name,
                    bindActionToControl(
                        FormActions.SetErrors(null),
                        state.name,
                    ),
                ),
            };
    }
    return state;
}
