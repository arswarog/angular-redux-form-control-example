import { IAbstractControlState } from './form-control-state.interface';
import { AbstractControl } from './abstract-control';
import { FormGroupModel } from './form-group.model';
import { FormControlModel } from './form-control.model';
import { FormControl } from './form-control';
import { ControlActionTypes, IFormAction } from './actions';
import { FormError, UnknownFieldError } from './interfaces';
import { catchError } from 'rxjs/operators';

export class FormGroup<T extends object> extends AbstractControl<T> {
    public readonly controls: { [K in keyof T]: AbstractControl<T[K]> };

    constructor(model: Partial<IAbstractControlState<T>> | FormGroupModel<T>) {
        if (model instanceof FormGroupModel) {
            const controls: any = {};
            const value: any = {};
            Object.entries(model.scheme).forEach(
                ([key, control]) => {
                    if (control instanceof FormGroupModel)
                        controls[key] = new FormGroup(control);
                    else if (control instanceof FormControlModel)
                        controls[key] = new FormControl(control);
                    else
                        throw new Error('Invalid scheme item');
                    value[key] = controls[key].value;
                },
            );
            super(model, {
                controls,
                value,
            });
        } else
            super(model);
    }

    protected updateSelf(state: IAbstractControlState<T>): this {
        return new FormGroup(state) as this;
    }

    public patchValue(value: Partial<T>): this { // TODO
        return this.updateSelf({
            ...this,
            // value: {
            //     ...this.value,
            //     value,
            // },
        });
    }

    public toJSON(): IAbstractControlState<T> {
        const controls: any = {};
        Object.keys(this.controls).forEach(
            key => controls[key] = this.controls[key].toJSON(),
        );
        return {
            ...this,
            controls,
        };
    }

    public dispatch(action: IFormAction): this {
        if (!Array.isArray(action.controlPath))
            throw new Error('Control path must be an array');

        if (action.controlPath.length) {
            const [field, ...controlPath] = action.controlPath;
            const fieldAction = {
                ...action,
                controlPath,
            };

            if (field in this.controls)
                return this.dispatchField(field, fieldAction);
            else
                throw new UnknownFieldError([field]);
        }

        switch (action.type) {
            case ControlActionTypes.SetValue: {
                return this.updateSelf({
                    ...this,
                    value: action.value,
                });
            }
        }

        return this;
    }

    private dispatchField(field: string | number, action: IFormAction): this {
        try {
            const control: AbstractControl<any> = this.controls[field].dispatch(action);

            if (control === this.controls[field])
                return this;

            return this.updateSelf({
                ...this,
                controls: {
                    ...this.controls,
                    [field]: control,
                },
                value   : {
                    ...this.value,
                    [field]: control.value,
                },
            });
        } catch (e) {
            // if (e instanceof FormError)
            //     throw FormError.addParent(e, [field]);
            // else
            throw e;
        }
    }
}
