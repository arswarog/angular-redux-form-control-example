import { AbstractControlModel } from './abstract-control.model';
import { IEvents } from './FormControl';
import { AnyAction, IAsyncValidator, IValidator } from './interfaces';
import { IAbstractControlState } from './form-control-state.interface';
import { FormControl } from './form-control';


export class FormControlModel<T> extends AbstractControlModel<T> {
    constructor(defaultValue: T = null,
                validators?: IValidator | IValidator[],
                asyncValidators?: IAsyncValidator | IAsyncValidator[],
                events?: IEvents) {
        super(defaultValue, validators, asyncValidators, events);
    }

    public setHierarchy(formName: string, controlPath: (string | number)[]) {
        super.setHierarchy(formName, controlPath);
    }

    public updateControlState(): void {
        alert('update control state for ' + this._formName + ' ' + this._controlPath);
    }
}
