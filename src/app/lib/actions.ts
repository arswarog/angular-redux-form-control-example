import { AbstractControl } from './abstract-control';
import { IAbstractControlState } from './form-control-state.interface';
import { IFormGroupScheme } from './form-group';
import { AnyAction, FormAction } from './interfaces';
import { IValidationErrors } from './validation';

export enum ControlActionTypes {
    SetValue        = 'reduxFormControl.setValue',
    PatchValue      = 'reduxFormControl.patchValue',
    MarkAsTouched   = 'reduxFormControl.markAsTouched',
    MarkAsUntouched = 'reduxFormControl.markAsUntouched',
    SetErrors       = 'reduxFormControl.setErrors',
    Reset           = 'reduxFormControl.reset',

    ControlUpdate   = 'reduxFormControl.control.update',
    ControlAdd      = 'reduxFormControl.control.add',
    ControlRemove   = 'reduxFormControl.control.remove',
}

export function createFormAction(type: ControlActionTypes) {
    return <T>(control: AbstractControl<T>,
               value?: Partial<T>): FormAction => ({
        type,
        formName   : control.formName,
        controlPath: control.controlPath,
        value,
    });
}

export const SetValue = <T>(value: T) =>
    ({
        type: ControlActionTypes.SetValue,
        value,
    });

export const PatchValue = <T>(value: Partial<T>) =>
    ({
        type: ControlActionTypes.PatchValue,
        value,
    });

export const MarkAsTouched = <T>(options: {onlySelf?: boolean} = {}) =>
    ({
        type: ControlActionTypes.MarkAsTouched,
        options,
    });

export const MarkAsUntouched = <T>(options: {onlySelf?: boolean} = {}) =>
    ({
        type: ControlActionTypes.MarkAsUntouched,
        options,
    });

export const SetErrors = <T>(errors: IValidationErrors | null) =>
    ({
        type: ControlActionTypes.SetErrors,
        errors,
    });

export const Reset = () =>
    ({
        type: ControlActionTypes.Reset,
    });

export const ControlActions = Object.freeze({
    Update: (control: AbstractControl<any>,
             children?: IFormGroupScheme<any> | IAbstractControlState<any>[]): FormAction => {
        const action: FormAction = {
            type       : ControlActionTypes.ControlUpdate,
            formName   : control.formName,
            controlPath: control.controlPath,
            state      : control.getDefaultState(),
        };
        if (Array.isArray(children))
            throw new Error('not implements array control');
        else if (typeof children === 'object') {
            action.children = {};
            Object.keys(this.children).forEach((key) => {
                const control: AbstractControl<any> = this.scheme[key];
                console.log(key, control);
                // control.setHierarchy(formName, [key]);
            });
        } else
            throw         new Error('Incorrect childred');
    },
    // Add   : <T>(control: AbstractControl<T>,
    //             controls?: { [K in keyof T]: IAbstractControlState<T[K]> } | IAbstractControlState<any>[]): FormAction =>
    //     ({
    //         type       : ControlActionTypes.ControlUpdate,
    //         formName   : control.formName,
    //         controlPath: control.controlPath,
    //         state      : control.getDefaultState(),
    //     }),
    // Remove: <T>(control: AbstractControl<T>): FormAction =>
    //     ({
    //         type       : ControlActionTypes.ControlUpdate,
    //         formName   : control.formName,
    //         controlPath: control.controlPath,
    //         state      : control.getDefaultState(),
    //     }),
});
