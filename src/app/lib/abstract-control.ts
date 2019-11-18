import { AnyAction, IDispatchFn, IStrictControlPath } from './interfaces';

export abstract class AbstractControl<T> {
    protected _formName: string;
    protected _controlPath: IStrictControlPath;

    get formName(): string {
        return this._formName;
    }

    get controlPath(): IStrictControlPath {
        return this._controlPath;
    }

    protected constructor(defaultValue: T) {}

    public setHierarchy(formName: string, controlPath: IStrictControlPath) {
        if (this._formName)
            throw new Error('Can not change control hierarchy');
        this._formName    = formName;
        this._controlPath = controlPath as IStrictControlPath;
    }

    public emitEvent(dispatch: IDispatchFn, action: AnyAction): void {
        console.log(`emit event "${action.type}"`);
        dispatch({
            type       : action.type,
            formName   : this._formName,
            controlPath: this._controlPath,
            ...action
        });
    }
}
