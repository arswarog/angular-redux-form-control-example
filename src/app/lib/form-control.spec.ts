import { describe, it } from 'mocha';
import { ControlActionTypes } from './actions';
import * as should from 'should';
import { FormControlModel } from './form-control.model';
import { FormControl } from './form-control';

describe('FormControl', () => {
    describe('Make FormControl from model', () => {
        it('init simple form', () => {
            const model = new FormControlModel('');
            const control = new FormControl(model);

            const json = control.toJSON();

            should(json).eql({
                value   : '',
                pending : false,
                dirty   : false,
                disabled: false,
                touched : false,
                errors  : null,
            });
        });
    });

    describe('Methods', () => {
        describe('setValue', () => {
            it('set value', () => {
                const model = new FormControlModel('');
                const control = new FormControl(model);

                const control2 = control.setValue('value');

                const json = control.toJSON();

                should(json).eql({
                    value   : '',
                    pending : false,
                    dirty   : false,
                    disabled: false,
                    touched : false,
                    errors  : null,
                });

                const json2 = control2.toJSON();

                should(json2).eql({
                    value   : 'value',
                    pending : false,
                    dirty   : false,
                    disabled: false,
                    touched : false,
                    errors  : null,
                });

                should(control.dispatch({
                    type       : ControlActionTypes.SetValue,
                    formName   : '',
                    controlPath: [],
                    value      : 'value',
                }).toJSON()).eql(json2);
            });
        });
    });

    describe('dispatch', () => {
        it('ignore invalid controlPath', () => {
            const model = new FormControlModel('');
            const control = new FormControl(model);

            const control2 = control.dispatch({
                type       : ControlActionTypes.SetValue,
                formName   : '',
                controlPath: [],
                value      : 'value',
            });

            should(control2.toJSON()).eql({
                value   : 'value',
                pending : false,
                dirty   : false,
                disabled: false,
                touched : false,
                errors  : null,
            });

            should(() => control2.dispatch({
                type       : ControlActionTypes.SetValue,
                formName   : '',
                controlPath: [''],
                value      : 'value',
            })).throwError('Ignore path because FormControl can process only direct actions');
        });
    });
});
