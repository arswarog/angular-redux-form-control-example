import { IAbstractControlState } from './form-control-state.interface';
import { AnyAction, IAsyncValidator, IDispatchFn, IStrictControlPath, IValidator } from './interfaces';
import { IEvents } from './FormControl';

export interface IAbstractControlModelOptions {
    events?: IEvents;
    debounceTime?: number;
}

export abstract class AbstractControlModel<T> {
    protected _formName: string;
    protected _controlPath: IStrictControlPath;

    get formName(): string {
        return this._formName;
    }

    get controlPath(): IStrictControlPath {
        return this._controlPath;
    }

    protected constructor(public readonly defaultValue: T = null,
                          public readonly validators: IValidator | IValidator[] = [],
                          public readonly asyncValidators: IAsyncValidator | IAsyncValidator[] = [],
                          public readonly options: IAbstractControlModelOptions = {}) {
        this.options = Object.assign({events: {}}, options);
    }

    public setHierarchy(formName: string, controlPath: IStrictControlPath) {
        if (this._formName)
            throw new Error('Can not change control hierarchy');
        this._formName = formName;
        this._controlPath = controlPath as IStrictControlPath;
    }

    public emitEvent(dispatch: IDispatchFn, action: AnyAction): void {
        action = {
            type       : action.type,
            formName   : this._formName,
            controlPath: this._controlPath,
            ...action,
        };

        console.log(this.options);
        if (action.type in this.options.events) {
            const replace = this.options.events[action.type](action);

            if (Array.isArray(replace))
                replace.forEach(fn => dispatch(fn));
            else
                dispatch(replace);
        } else {
            dispatch(action);
        }
    }

    public getDefaultState(): Partial<IAbstractControlState<T>> {
        return {
            dirty   : false,
            pending : false,
            disabled: false,
            touched : false,
        };
    }

    abstract updateControlState(dispatch: IDispatchFn): void;
}
