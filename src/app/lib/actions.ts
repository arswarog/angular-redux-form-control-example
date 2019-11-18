import { AbstractControl } from './abstract-control';
import { AnyAction } from './interfaces';
import { IValidationErrors } from './validation';

export enum ControlActionTypes {
    SetValue        = 'reduxFormControl.setValue',
    PatchValue      = 'reduxFormControl.patchValue',
    MarkAsTouched   = 'reduxFormControl.markAsTouched',
    MarkAsUntouched = 'reduxFormControl.markAsUntouched',
    SetErrors       = 'reduxFormControl.setErrors',
}

export function createFormAction(type: ControlActionTypes) {
    return <T>(control: AbstractControl<T>,
               value?: Partial<T>) => ({
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
