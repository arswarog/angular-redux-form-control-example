import { IStrictControlPath } from './interfaces';

export class FormError extends Error {
    public readonly originalMessage: string;
    public readonly code: string;

    constructor(message: string, public controlPath: IStrictControlPath) {
        super(message.replace(/\${path}/g, controlPath.join('.')));
        this.code = 'FORM_ERROR';
        this.originalMessage = message;
        this.updateMessage();
    }

    protected updateMessage() {
        this.message = this.originalMessage.replace(/\${path}/g, this.controlPath.join('.'));
    }

    addPath(path: IStrictControlPath): FormError {
        this.controlPath = [...path, ...this.controlPath];
        this.updateMessage();
        return this;
    }

    setFormName(formName: string): FormError {
        this.controlPath = [formName + ': ', ...this.controlPath];
        this.updateMessage();
        return this;
    }
}

export class InvalidFieldError extends FormError {
    constructor(controlPath: IStrictControlPath) {
        super('Invalid field "${path}"', controlPath);
    }
}

export class UnknownFieldError extends FormError {
    constructor(controlPath: IStrictControlPath) {
        super('Unknown field "${path}"', controlPath);
    }
}
