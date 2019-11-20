import { AbstractControl } from './abstract-control';
import { FormGroup } from './form-group';
import { EventType, IEvents } from './FormControl';

type IFormGroupScheme<T extends object> = {
    [K in keyof T]: AbstractControl<T[K]>;
};

export class Form<T extends object> extends FormGroup<T> {
    constructor(formName: string,
                scheme: IFormGroupScheme<T>,
                events: IEvents = {}) {
        super(scheme, events);

        this.setHierarchy(formName, []);
    }
}
