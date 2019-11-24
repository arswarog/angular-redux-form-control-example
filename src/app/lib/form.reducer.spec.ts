import * as should from 'should';
import { describe, it } from 'mocha';
import { formReducer, initForm } from './form.reducer';
import { FormAction } from './interfaces';
import { ControlActionTypes } from './actions';
import { FormModel } from './form.model';
import { FormControlModel } from './form-control.model';
import { IFormState } from './form-control-state.interface';

interface ILogin {
    user: string;
    pass: string;
}

describe('From reducer', () => {
    describe('ControlInitForm action', () => {
        it('init simple form', () => {
            // const action: FormAction = {
            //     type       : ControlActionTypes.ControlInitForm,
            //     formName   : 'form',
            //     controlPath: null,
            //     // form,
            // };
            //
            // const state = formReducer<ILogin>(initForm('login'), action);
            //
            // const expected: IFormState<ILogin> = {
            //     formName: 'login',
            //     value   : {
            //         user: null,
            //         pass: null,
            //     },
            //     pending : false,
            //     dirty   : false,
            //     disabled: false,
            //     touched : false,
            //     errors  : null,
            //     controls: {
            //         user: {
            //             value   : null,
            //             pending : false,
            //             dirty   : false,
            //             disabled: false,
            //             touched : false,
            //             errors  : null,
            //         },
            //         pass: {
            //             value   : null,
            //             pending : false,
            //             dirty   : false,
            //             disabled: false,
            //             touched : false,
            //             errors  : null,
            //         },
            //     },
            // };
            //
            // should(state).eql(expected);
        });
    });
});
