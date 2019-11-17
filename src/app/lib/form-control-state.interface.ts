export interface IFormControlState<T> {
    value: T;
    errors: {[key: string]: any};
    pending: boolean;
    disabled: boolean;
    touched: boolean;
}
