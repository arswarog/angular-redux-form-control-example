import { ControlActionTypes } from './actions';

export type IControlPath = string | (string | number)[];
export type IStrictControlPath = (string | number)[];

export type IValidator = any;
export type IAsyncValidator = any;

export interface AnyAction {
    type: string;
    [key: string]: any;
}

export interface NothingFormAction extends AnyAction {
    type: ControlActionTypes;
    formName?: never;
    controlPath?: IControlPath;
}

export interface FormAction extends AnyAction {
    type: ControlActionTypes;
    formName: string;
    controlPath: IControlPath;
}

export type IDispatchFn = (action: AnyAction) => void;
