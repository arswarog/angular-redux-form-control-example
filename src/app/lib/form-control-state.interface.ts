import { IStrictControlPath } from './interfaces';

export interface IFormControlState<T> {
    formName: string;
    controlPath: IStrictControlPath;
    value: T;
    errors: {[key: string]: any};
    dirty: boolean;
    pending: boolean;
    disabled: boolean;
    touched: boolean;
}
