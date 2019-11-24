import { ControlActionTypes, IFormAction } from './actions';
import { IAbstractControlState, IFormGroupState, IFormState } from './form-control-state.interface';
import { FormAction, IControlPath, IStrictControlPath, NothingFormAction } from './interfaces';
import { AbstractControlModel } from './abstract-control.model';


// export abstract class

export const defaultAbstractControlState: Readonly<IAbstractControlState<any>> = Object.freeze({
    value   : undefined,
    errors  : null,
    touched : false,
    disabled: false,
    pending : false,
    dirty   : false,
});

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
        case ControlActionTypes.ControlInitForm: {
            return formGroupReducer(state, action, []);
        }
        // default:
        //     return abstractControlReducer(state, action);

    }

    return state;
}

function formGroupReducer<T extends IFormGroupState<any>>(state: T, action: IFormAction, path: IStrictControlPath): T {
    switch (action.type) {
        case ControlActionTypes.ControlInitForm:
        case ControlActionTypes.ControlUpdate:
            const controls = {};
            const value = {};

            Object.entries(action.form.scheme)
                  .forEach(([key, control]: [string, AbstractControlModel<any> & { controls?: any }]) => {
                      if ('controls' in control)
                          return true;
                      // else
                          // controls[key] = abstractControlReducer()
                  });

            return {
                ...abstractControlReducer(state, action, []),
                controls: controls as any,
                value   : value as any,
            };
    }
    return state;
}

function abstractControlReducer<T extends IAbstractControlState<any>>(state: T, action: IFormAction,
                                                                      path: IStrictControlPath): T {
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
        case ControlActionTypes.ControlInitForm:
        case ControlActionTypes.ControlUpdate:
            return {
                ...state,
                pending : state.pending || false,
                dirty   : state.dirty || false,
                disabled: state.disabled || false,
                touched : state.touched || false,
                errors  : state.errors || null,
                value   : state.value || null,
            };
    }

    return state;
}
