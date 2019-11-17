import { IFormControlState } from './form-control-state.interface';
import { EventType, FormControl } from './FormControl';

export function formControlInstance<T>(
    dispatch: any,
    scheme: FormControl<T>,
    state: IFormControlState<T>,
    cache?: FormControlInstance<T>,
): FormControlInstance<T> {
    return new FormControlInstance<T>(dispatch, scheme, state);
}

export class FormControlInstance<T> {
    constructor(public readonly dispatch: any,
                public readonly scheme: FormControl<T>,
                public readonly state: IFormControlState<T>) {

    }

    get value() {
        return this.state ? this.state.value : undefined;
    }

    getValue() {
        return this.state ? this.state.value : undefined;
    }

    get valid() {
        return !this.state.errors;
    }

    get invalid() {
        return !!this.state.errors;
    }

    get touched() {
        return this.state.touched;
    }

    markAsTouched() {
        this.scheme.emitEvent(this.dispatch, EventType.MarkAsTouched);
    }
}
