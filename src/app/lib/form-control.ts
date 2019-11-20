import { AbstractControl } from './abstract-control';
import { IEvents } from './FormControl';
import { AnyAction, IAsyncValidator, IValidator } from './interfaces';

export class FormControl<T> extends AbstractControl<T> {
    constructor(defaultValue: T,
                public readonly validators: IValidator | IValidator[],
                public readonly asyncValidators: IAsyncValidator | IAsyncValidator[],
                public readonly events: IEvents) {
        super(defaultValue);
    }

    public setHierarchy(formName: string, controlPath: (string | number)[]) {
        super.setHierarchy(formName, controlPath);
    }

    public updateControlState(): void {
        alert('update control state for ' + this._formName + ' ' + this._controlPath);
    }
}


