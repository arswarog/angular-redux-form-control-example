import { AbstractControlModel } from './abstract-control.model';
import { IAbstractControlState } from './form-control-state.interface';
import { IFormGroupScheme } from './form-group.model';
import { AnyAction, FormAction } from './interfaces';
import { IValidationErrors } from './validation';
import { FormModel } from './form.model';

export enum ControlActionTypes {
    SetValue = 'reduxFormControl.setValue',
    PatchValue = 'reduxFormControl.patchValue',
    ChangeValue = 'reduxFormControl.changeValue',
    MarkAsTouched = 'reduxFormControl.markAsTouched',
    MarkAsUntouched = 'reduxFormControl.markAsUntouched',
    SetErrors = 'reduxFormControl.setErrors',
    Reset = 'reduxFormControl.reset',

    ControlInitForm = 'reduxFormControl.control.initForm',
    ControlUpdate = 'reduxFormControl.control.update',
    ControlAdd = 'reduxFormControl.control.add',
    ControlRemove = 'reduxFormControl.control.remove',
}

export type IFormAction =
    IFormActionSetValue<any> |
    IFormActionControlInitForm<any> |
    IFormActionControlUpdate<any>
    ;

export function createFormAction(type: ControlActionTypes) {
    return <T>(control: AbstractControlModel<T>,
               value?: Partial<T>): FormAction => ({
        type,
        formName   : control.formName,
        controlPath: control.controlPath,
        value,
    });
}

export interface IFormActionSetValue<T> extends FormAction {
    value: T;
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

export const MarkAsTouched = <T>(options: { onlySelf?: boolean } = {}) =>
    ({
        type: ControlActionTypes.MarkAsTouched,
        options,
    });

export const MarkAsUntouched = <T>(options: { onlySelf?: boolean } = {}) =>
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

export interface IFormActionControlInitForm<T extends object> extends FormAction {
    form: FormModel<T>;
}

export interface IFormActionControlUpdate<T> extends FormAction {
    control: AbstractControlModel<T>;
}

export const ControlActions = Object.freeze({
    InitForm: <T extends object>(formModel: FormModel<T>): FormAction => ({
        type       : ControlActionTypes.ControlInitForm,
        formName   : formModel.formName,
        controlPath: null,
        formModel,
    }),
    Update  : (control: AbstractControlModel<any>,
               children?: IFormGroupScheme<any> | IAbstractControlState<any>[]): FormAction => {
        const action: FormAction = {
            type       : ControlActionTypes.ControlUpdate,
            formName   : control.formName,
            controlPath: control.controlPath,
            // state      : control.getDefaultState(),
        };
        // if (Array.isArray(children))
        //     throw new Error('not implements array control');
        // else if (typeof children === 'object') {
        //     action.children = {};
        //     Object.keys(children).forEach((key) => {
        //         const control: AbstractControlModel<any> = this.scheme[key];
        //         console.log(key, control);
        //         // control.setHierarchy(formName, [key]);
        //     });
        // } else
        //     throw         new Error('Incorrect childred');
        // return {type: 'UPDATE (NONE)'} as any;
        return action;
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
