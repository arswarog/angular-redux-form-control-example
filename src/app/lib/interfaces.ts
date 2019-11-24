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

export class FormError extends Error {
    public readonly originalMessage: string;

    constructor(message: string, public readonly controlPath: IStrictControlPath, formName?: string) {
        super(message.replace(/\${path}/g, controlPath.join('.')));
        this.originalMessage = message;
    }
}

export class UnknownFieldError extends FormError {
    constructor(controlPath: IStrictControlPath) {
        super('Unknown field "${path}"', controlPath);
    }
}
