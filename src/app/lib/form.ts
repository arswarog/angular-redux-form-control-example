import { FormGroup } from './form-group';
import { FormGroupModel } from './form-group.model';
import { ControlActionTypes, IFormAction } from './actions';
import { FormModel } from './form.model';

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

        switch (action.type) {
            case ControlActionTypes.ControlInitForm:
                if (action.formModel.formName !== this.formName)
                    throw new Error('Incorrect form model: formNames not equils');
                return generateForm(action.formModel) as any;
        }

        return super.dispatch(action);
    }
}

export function generateForm<T extends object>(model: FormModel<T>, defaultValue: T = null): Form<T> {
    return new Form(model.formName, model);
}
