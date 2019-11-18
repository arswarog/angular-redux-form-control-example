import { AbstractControl } from './abstract-control';
import { EventType, IEvents } from './FormControl';

type IFormGroupScheme<T extends object> = {
    [K in keyof T]: AbstractControl<T[K]>;
};

export class FormGroup<T extends object> extends AbstractControl<T> {
    constructor(formName: string,
                public readonly scheme: IFormGroupScheme<T>,
                public readonly events: IEvents = {}) {
        super({} as T);

        this.setHierarchy(formName, []);
    }

    public setHierarchy(formName: string, controlPath: (string | number)[]) {
        super.setHierarchy(formName, controlPath);

        Object.keys(this.scheme).forEach((key) => {
            const control: AbstractControl<any> = this.scheme[key];
            control.setHierarchy(formName, [key]);
        });
    }
}
