export interface IAbstractControlState<T> {
    value: T;
    errors: {[key: string]: any};
    dirty: boolean;
    pending: boolean;
    disabled: boolean;
    touched: boolean;
    controls?: any;
}

export interface IFormGroupState<T> extends IAbstractControlState<T> {
    controls: { [K in keyof T]: IAbstractControlState<T[K]> };
}

export interface IFormState<T> extends IFormGroupState<T> {
    formName: string;
}
