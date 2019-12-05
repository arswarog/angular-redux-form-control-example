import { describe, it } from 'mocha';
import { ControlActionTypes, IFormAction } from './actions';
import * as should from 'should';
import { FormControlModel } from './form-control.model';
import { FormControl } from './form-control';
import { FormControlInstance } from './form-control.instance';
import { EventType } from './FormControl';
import { AnyAction, FormAction } from './interfaces';

describe('FormControlModel', () => {
    it('simple', () => {
        const model = new FormControlModel(
            '',
            [],
            [],
            {
                events: {
                    [ControlActionTypes.SetValue]: (action: FormAction): AnyAction => ({
                        type : 'some',
                        value: action.value,
                    }),
                },
            },
        );

        const control = new FormControl(model);

        const actions: IFormAction[] = [];
        const dispatch = (action: IFormAction) => {
            actions.push(action);
        };

        const instance = new FormControlInstance(
            dispatch,
            model,
            control,
        );

        instance.setValue('value');

        should(actions).length(1);

        should(actions.shift()).eql({
            type : 'some',
            value: 'value',
        });
    });
    it('multiple', () => {
        const model = new FormControlModel(
            '',
            [],
            [],
            {
                events: {
                    [ControlActionTypes.SetValue]: (action: FormAction) => (
                        [
                            {
                                type : 'some',
                                value: action.value,
                            },
                            action,
                        ]
                    ),
                },
            },
        );

        const control = new FormControl(model);

        const actions: IFormAction[] = [];
        const dispatch = (action: IFormAction) => {
            actions.push(action);
        };

        const instance = new FormControlInstance(
            dispatch,
            model,
            control,
        );

        instance.setValue('value');

        should(actions).length(2);

        should(actions.shift()).eql({
            type : 'some',
            value: 'value',
        });

        should(actions.shift()).eql({
            type       : ControlActionTypes.SetValue,
            formName   : undefined,
            controlPath: undefined,
            value      : 'value',
        });
    });
    it('no change', () => {
        const model = new FormControlModel('value');
        const control = new FormControl(model);

        const actions: IFormAction[] = [];
        const dispatch = (action: IFormAction) => {
            actions.push(action);
        };

        const instance = new FormControlInstance(
            dispatch,
            model,
            control,
        );

        instance.setValue('value');

        should(actions).length(0);
    });
    // });
    //
    // describe('Methods', () => {
    //     describe('setValue', () => {
    //         it('set value', () => {
    //             const model = new FormControlModel('');
    //             const control = new FormControl(model);
    //
    //             const control2 = control.setValue('value');
    //
    //             const json = control.toJSON();
    //
    //             should(json).eql({
    //                 value   : '',
    //                 pending : false,
    //                 dirty   : false,
    //                 disabled: false,
    //                 touched : false,
    //                 errors  : null,
    //             });
    //
    //             const json2 = control2.toJSON();
    //
    //             should(json2).eql({
    //                 value   : 'value',
    //                 pending : false,
    //                 dirty   : false,
    //                 disabled: false,
    //                 touched : false,
    //                 errors  : null,
    //             });
    //
    //             should(control.dispatch({
    //                 type       : ControlActionTypes.SetValue,
    //                 formName   : '',
    //                 controlPath: '',
    //                 value      : 'value',
    //             }).toJSON()).eql(json2);
    //         });
    //     });
    // });
});
