import { SetError } from '../store/actions';
import { AbstractControl } from './abstract-control';
import { MarkAsTouched, MarkAsUntouched, PatchValue, SetErrors, SetValue } from './actions';
import { FormControl } from './form-control';
import { IFormControlState } from './form-control-state.interface';
import { defaultFormControlState } from './form-control.reducer';
import { IDispatchFn } from './interfaces';
import { IValidationErrors } from './validation';

export abstract class AbstractControlInstance<T> {
    protected constructor(public readonly dispatch: IDispatchFn,
                          public readonly control: AbstractControl<T>,
                          public readonly state: IFormControlState<T>) {
        if (!state)
            this.state = defaultFormControlState;
    }

    get value() {
        return this.state.value;
    }

    getValue() {
        return this.state.value;
    }

    get valid() {
        return !this.state.errors;
    }

    get invalid() {
        return !!this.state.errors;
    }

    get pending() {
        return this.state.pending;
    }

    get disabled() {
        return this.state.disabled;
    }

    get enabled() {
        return !this.state.disabled;
    }

    get dirty() {
        return this.state.dirty;
    }

    get pristine() {
        return !this.state.dirty;
    }

    get touched() {
        return this.state.touched;
    }

    get untouched() {
        return !this.state.touched;
    }

    get errors(): IValidationErrors | null {
        return this.state.errors;
    }

    markAsTouched(opts: {onlySelf?: boolean} = {}) {
        this.control.emitEvent(this.dispatch, MarkAsTouched(opts));
    }
    markAsUntouched(opts: {onlySelf?: boolean;} = {}): void {
        this.control.emitEvent(this.dispatch, MarkAsUntouched(opts));
    }
    // markAllAsTouched(): void {
    //     this.control.emitEvent(this.dispatch, MarkAsTouched(this.control));
    // }

    /**************/
    setValue(value: T): void {
        this.control.emitEvent(this.dispatch, SetValue(value));
    }
    patchValue(value: Partial<T>): void {
        this.control.emitEvent(this.dispatch, PatchValue(value));
    }
    // reset(formState: T = null): void;

    // inherited from forms/AbstractControl

    // parent: FormGroup | FormArray
    // root: AbstractControl
    // setParent(parent: FormGroup | FormArray): void

    // markAsDirty(opts: {onlySelf?: boolean;} = {}): void
    // markAsPristine(opts: {onlySelf?: boolean;} = {}): void
    // markAsPending(opts: {onlySelf?: boolean;} = {}): void
    // disable(opts: {onlySelf?: boolean;} = {}): void
    // enable(opts: {onlySelf?: boolean;} = {}): void
    // // updateValueAndValidity(opts: {onlySelf?: boolean; emitEvent?: boolean;} = {}): void
    setErrors(errors: IValidationErrors): void {
        this.control.emitEvent(this.dispatch, SetErrors(errors));
    }
    // get(path: string | (string | number)[]): AbstractControl | null
    // getError(errorCode: string, path?: string | (string | number)[]): any
    // hasError(errorCode: string, path?: string | (string | number)[]): boolean
}
