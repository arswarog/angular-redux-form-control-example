import { IAbstractControlState } from './form-control-state.interface';
import { IValidationErrors } from './validation';
import { AbstractControlModel } from './abstract-control.model';
import { IFormAction } from './actions';

export abstract class AbstractControl<T> implements IAbstractControlState<T> {
    public readonly value: T;
    public readonly errors: IValidationErrors | null;
    public readonly dirty: boolean;
    public readonly pending: boolean;
    public readonly disabled: boolean;
    public readonly touched: boolean;

    getValue() {
        return this.value;
    }

    get valid() {
        return !this.errors;
    }

    get invalid() {
        return !!this.errors;
    }

    get enabled() {
        return !this.disabled;
    }

    get pristine() {
        return !this.dirty;
    }

    get untouched() {
        return !this.touched;
    }

    public toJSON(): IAbstractControlState<T> {
        return {
            ...this,
        };
    }

    public abstract dispatch(action: IFormAction): this;

    protected constructor(proto: Partial<IAbstractControlState<T>>);
    protected constructor(model: AbstractControlModel<T>, proto: Partial<IAbstractControlState<T>>);
    protected constructor(model: Partial<IAbstractControlState<T>> | AbstractControlModel<T>,
                          proto?: Partial<IAbstractControlState<T>>) {
        Object.assign(
            this,
            {
                value   : null,
                pending : false,
                dirty   : false,
                disabled: false,
                touched : false,
                errors  : null,
            },
            model instanceof AbstractControlModel ? {value: model.defaultValue} : model,
            proto ? proto : null,
        );
    }

    protected abstract updateSelf(state: IAbstractControlState<T>): this;

    markAsTouched(opts: { onlySelf?: boolean } = {}): this {
        return this.updateSelf({
            ...this,
            touched: true,
        });
    }

    markAsUntouched(opts: { onlySelf?: boolean; } = {}): this {
        return this.updateSelf({
            ...this,
            touched: false,
        });
    }

    // markAllAsTouched(): void {
    //     this.control.emitEvent(this.dispatch, MarkAsTouched(this.control));
    // }

    /**************/
    setValue(value: T): this {
        return this.updateSelf({
            ...this,
            value,
        });
    }

    changeValue(value: T): this {
        return this.updateSelf({
            ...this,
            value,
            dirty  : true,
            // touched: true,
        });
    }

    abstract patchValue(value: Partial<T>): this;

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
    setErrors(errors: IValidationErrors): this {
        return this.updateSelf({
            ...this,
            errors,
        });
    }

    // get(path: string | (string | number)[]): AbstractControl | null
    // getError(errorCode: string, path?: string | (string | number)[]): any
    // hasError(errorCode: string, path?: string | (string | number)[]): boolean
}
