import { ControlActionTypes } from './actions';
import { IAbstractControlState, IFormState } from './form-control-state.interface';
import { AnyAction, FormAction, IControlPath, NothingFormAction } from './interfaces';

export const defaultAbstractControlState: Readonly<IAbstractControlState<any>> = Object.freeze({
    value   : undefined,
    errors  : null,
    touched : false,
    disabled: false,
    pending : false,
    dirty   : false,
});

export interface IFormAction extends AnyAction {
    type: string;
    formName?: string;
    controlPath?: IControlPath;
}

export function initForm(formName: string): IFormState<any> {
    console.log('init ' + formName);
    return {
        formName,
        ...defaultAbstractControlState,
        controls: {},
    };
}

export function bindActionToControl(action: NothingFormAction,
                                    form: IFormState<any>,
                                    controlPath: IControlPath): FormAction {
    return {
        ...action,
        formName: form.formName,
        controlPath,
    };
}

export function formReducer<T>(state: IFormState<T>, action: IFormAction): IFormState<T> {
    console.log(state);
    if (!state || !state.formName)
        throw new Error('Form not initialized'); // TODO change message, add right way

    if (!('formName' in action) ||
        action.formName !== state.formName ||
        !('controlPath' in action))
        return state;

    switch (action.type) {
        case ControlActionTypes.SetValue:
        case ControlActionTypes.PatchValue:
            return {
                ...state,
                value: action.value,
            };
        case ControlActionTypes.MarkAsTouched:
            return {
                ...state,
                touched: true,
            };
        case ControlActionTypes.MarkAsUntouched:
            return {
                ...state,
                touched: false,
            };
        case ControlActionTypes.SetErrors:
            return {
                ...state,
                errors: action.errors,
            };
    }

    return state;
}
