import { AbstractControl } from './abstract-control';
import { ControlActions, ControlActionTypes } from './actions';
import { EventType, IEvents } from './FormControl';
import { FormAction, IDispatchFn } from './interfaces';

export type IFormGroupScheme<T extends object> = {
    [K in keyof T]: AbstractControl<T[K]>;
};

export class FormGroup<T extends object> extends AbstractControl<T> {
    constructor(public readonly scheme: IFormGroupScheme<T>,
                public readonly events: IEvents = {}) {
        super({} as T);
    }

    public setHierarchy(formName: string, controlPath: (string | number)[]) {
        super.setHierarchy(formName, controlPath);

        Object.keys(this.scheme).forEach((key) => {
            const control: AbstractControl<any> = this.scheme[key];
            control.setHierarchy(formName, [key]);
        });
    }

    public updateControlState(dispatch: IDispatchFn): void {
        const action = {
            type       : ControlActionTypes.ControlUpdate,
            formName   : this.formName,
            controlPath: this.controlPath,
            state      : this.getDefaultState(),
            children: {}
        };

            Object.keys(this.scheme).forEach((key) => {
                const control: AbstractControl<any> = this.scheme[key];
                action.children[key].con
                console.log(key, control);
                // control.setHierarchy(formName, [key]);
            });
        } else
            throw         new Error('Incorrect childred');

        dispatch(ControlActions.Update(this, this.scheme));

        Object.keys(this.scheme).forEach((key) => {
            const control: AbstractControl<any> = this.scheme[key];
            console.log(key, control);
            // control.setHierarchy(formName, [key]);
        });
    }
}
