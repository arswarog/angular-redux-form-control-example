import { ControlActionTypes } from './actions';
import { IFormControlState } from './form-control-state.interface';
import { AnyAction, FormAction, IControlPath, NothingFormAction } from './interfaces';

export const defaultFormControlState: Readonly<IFormControlState<any>> = Object.freeze({
    formName   : null,
    controlPath: null,
    value      : undefined,
    errors     : null,
    touched    : false,
    disabled   : false,
    pending    : false,
    dirty      : false,
});

export interface IFormAction extends AnyAction {
    type: string;
    formName?: string;
    controlPath?: IControlPath;
}

export function bindActionToControl(action: NothingFormAction,
                                    formState: IFormControlState<any>): FormAction {
    return {
        ...action,
        formName   : formState.formName,
        controlPath: 'controlPath' in action ? action.controlPath : formState.controlPath,
    };
}

export function formControlReducer<T>(state: IFormControlState<T>, action: IFormAction): IFormControlState<T> {
    if (!state)
        throw new Error('Form not initialized'); // TODO change message, add right way

    if (!('formName' in action) ||
        !('controlPath' in action) ||
        action.formName !== state.formName ||
        action.controlPath !== state.controlPath)
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
