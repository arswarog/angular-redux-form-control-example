import { AbstractControlModel } from './abstract-control.model';
import { FormGroupModel } from './form-group.model';
import { EventType, IEvents } from './FormControl';
import { IDispatchFn } from './interfaces';

type IFormGroupScheme<T extends object> = {
    [K in keyof T]: AbstractControlModel<T[K]>;
};

export class FormModel<T extends object> extends FormGroupModel<T> {
    constructor(formName: string,
                scheme: IFormGroupScheme<T>,
                events: IEvents = {}) {
        super(scheme, events);

        this.setHierarchy(formName, []);
    }
}
