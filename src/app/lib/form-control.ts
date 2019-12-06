import { IAbstractControlState } from './form-control-state.interface';
import { AbstractControl } from './abstract-control';
import { FormControlModel } from './form-control.model';
import { ControlActionTypes, IFormAction } from './actions';
import { FormError } from './errors';

export class FormControl<T> extends AbstractControl<T> {
    constructor(model: Partial<IAbstractControlState<T>> | FormControlModel<T>) {
        if (model instanceof FormControlModel)
            super(model, {});
        else
            super(model);
    }

    protected updateSelf(state: IAbstractControlState<T>): this {
        return new FormControl(state) as this;
    }

    patchValue(value: Partial<T>): this {
        return this.updateSelf({
            ...this,
            value,
        });
    }

    dispatch(action: IFormAction): this {
        if (!Array.isArray(action.controlPath) || action.controlPath.length > 0)
            throw new FormError(`Ignore path because FormControl can process only direct actions`, []);

        switch (action.type) {
            case ControlActionTypes.SetValue:
                return this.setValue(action.value);
        }
        return this;
    }
}
