import { FormGroup } from './form-group';
import { FormGroupModel } from './form-group.model';
import { IFormAction } from './actions';

export class Form<T extends object> extends FormGroup<T> {
    public readonly formName: string;

    constructor(form: Form<T>);
    constructor(formName: string, model?: FormGroupModel<T>);
    constructor(formName: string | Form<T>, model?: FormGroupModel<T>) {
        if (formName instanceof Form) {
            super(formName);
            this.formName = formName.formName;
        } else if (model instanceof FormGroupModel) {
            super(model);
            this.formName = formName;
        }
    }

    protected updateSelf(state: Form<T>): this {
        return super.updateSelf(state);
    }

    public dispatch(action: IFormAction): this {
        if (action.formName !== this.formName)
            return this;

        return super.dispatch(action);
    }
}
