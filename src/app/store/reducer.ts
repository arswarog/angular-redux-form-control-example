import { AnyAction, combineReducers } from 'redux';
import { IFormState } from '../lib/form-control-state.interface';
import { bindActionToControl, formReducer, initForm } from '../lib/form.reducer';
import { ActionType } from './actions';
import * as FormActions from '../lib/actions';

export interface ILoginFormState {
    name: string;
    pass: string;
}

export interface IRootState {
    loginForm: IFormState<ILoginFormState>;
    regForm: IFormState<ILoginFormState>;
}

export const defaultRootState: IRootState = Object.freeze({
    loginForm: initForm('loginForm'),
    regForm  : initForm('regForm'),
});

export const rootReducer = combineReducers<IRootState>({
    loginForm: loginFormReducer,
    regForm  : regFormReducer,
});

export function loginFormReducer(state: IFormState<ILoginFormState>, action: AnyAction): IFormState<ILoginFormState> {
    if (!state)
        state = initForm('-');

    state = formReducer(state, action);

    switch (action.type) {
        case ActionType.InitForm:
            return formReducer(state, FormActions.Reset());
        case ActionType.SetName:
            return formReducer(
                state,
                bindActionToControl(
                    FormActions.SetValue(action.value),
                    state,
                    ['name'],
                ),
            );
        case ActionType.SetError:
            return formReducer(
                state,
                bindActionToControl(
                    FormActions.SetErrors({
                        foo: 'bar',
                    }),
                    state,
                    'name',
                ),
            );
        case ActionType.SetValid:
            return formReducer(
                state,
                bindActionToControl(
                    FormActions.SetErrors(null),
                    state,
                    ['name'],
                ),
            );
    }
    return state;
}

export function regFormReducer(state: IFormState<ILoginFormState>, action: AnyAction): IFormState<ILoginFormState> {
    if (!state)
        state = initForm('-');

    state = formReducer(state, action);

    switch (action.type) {
        // case ActionType.InitForm:
        //     return formReducer(state, FormActions.Reset());
        // case ActionType.SetName:
        //     return formReducer(
        //         state,
        //         bindActionToControl(
        //             FormActions.SetValue(action.value),
        //             state,
        //             ['name'],
        //         ),
        //     );
        // case ActionType.SetError:
        //     return formReducer(
        //         state,
        //         bindActionToControl(
        //             FormActions.SetErrors({
        //                 foo: 'bar',
        //             }),
        //             state,
        //             'name',
        //         ),
        //     );
        // case ActionType.SetValid:
        //     return formReducer(
        //         state,
        //         bindActionToControl(
        //             FormActions.SetErrors(null),
        //             state,
        //             ['name'],
        //         ),
        //     );
    }
    return state;
}
