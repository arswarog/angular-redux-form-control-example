import { IAbstractControlState } from './form-control-state.interface';
import { AnyAction, IAsyncValidator, IDispatchFn, IStrictControlPath, IValidator } from './interfaces';
import { IEvents } from './FormControl';


export abstract class AbstractControlModel<T> {
    protected _formName: string;
    protected _controlPath: IStrictControlPath;

    get formName(): string {
        return this._formName;
    }

    get controlPath(): IStrictControlPath {
        return this._controlPath;
    }

    protected constructor(public readonly defaultValue: T,
                          public readonly validators: IValidator | IValidator[] = [],
                          public readonly asyncValidators: IAsyncValidator | IAsyncValidator[] = [],
                          public readonly events: IEvents = {}) {
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

        if (action.type in this.events) {
            const replace = this.events[action.type](action);

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
