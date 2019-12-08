import { AbstractControlModel, IAbstractControlModelOptions } from './abstract-control.model';
import { ControlActions, ControlActionTypes } from './actions';
import { EventType, IEvents } from './FormControl';
import { FormAction, IAsyncValidator, IDispatchFn, IValidator } from './interfaces';

export type IFormGroupScheme<T extends object> = {
    [K in keyof T]: AbstractControlModel<T[K]>;
};

export class FormGroupModel<T extends object> extends AbstractControlModel<T> {
    constructor(public readonly scheme: IFormGroupScheme<T>,
                options: IAbstractControlModelOptions = {}) {
        super(
            {} as any,
            [],
            [],
            options,
        );
    }

    public setHierarchy(formName: string, controlPath: (string | number)[]) {
        super.setHierarchy(formName, controlPath);

        Object.keys(this.scheme).forEach((key) => {
            const control: AbstractControlModel<any> = this.scheme[key];
            control.setHierarchy(formName, [key]);
        });
    }

    public updateControlState(dispatch: IDispatchFn): void {
        const action = {
            type       : ControlActionTypes.ControlUpdate,
            formName   : this.formName,
            controlPath: this.controlPath,
            state      : this.getDefaultState(),
            children   : {},
        };

        Object.keys(this.scheme).forEach((key) => {
            const control: AbstractControlModel<any> = this.scheme[key];
            action.children[key] = control;
            console.log(key, control);
            // control.setHierarchy(formName, [key]);
        });

        dispatch(action)
        // dispatch(ControlActions.Update(this, this.scheme));

        Object.keys(this.scheme).forEach((key) => {
            const control: AbstractControlModel<any> = this.scheme[key];
            console.log(key, control);
            // control.setHierarchy(formName, [key]);
        });
    }
}
