import { describe, it } from 'mocha';
import { ControlActionTypes } from './actions';
import * as should from 'should';
import { FormModel } from './form.model';
import { FormControlModel } from './form-control.model';
import { Form, generateForm } from './form';
import { FormGroupModel } from './form-group.model';

describe('Form', () => {
    describe('Make form from model', () => {
        it('init simple form', () => {
            const model = new FormModel('login', {
                user: new FormControlModel(''),
                pass: new FormControlModel(''),
                meta: new FormGroupModel({
                    location: new FormControlModel(''),
                    age     : new FormControlModel(0),
                }),
            });
            const form = new Form('login', model);

            const json = form.toJSON();

            should(json).eql({
                formName: 'login',
                value   : {
                    user: '',
                    pass: '',
                    meta: {
                        age     : 0,
                        location: '',
                    },
                },
                pending : false,
                dirty   : false,
                disabled: false,
                touched : false,
                errors  : null,
                controls: {
                    user: {
                        value   : '',
                        pending : false,
                        dirty   : false,
                        disabled: false,
                        touched : false,
                        errors  : null,
                    },
                    pass: {
                        value   : '',
                        pending : false,
                        dirty   : false,
                        disabled: false,
                        touched : false,
                        errors  : null,
                    },
                    meta: {
                        value   : {
                            location: '',
                            age     : 0,
                        },
                        pending : false,
                        dirty   : false,
                        disabled: false,
                        touched : false,
                        errors  : null,
                        controls: {
                            location: {
                                value   : '',
                                pending : false,
                                dirty   : false,
                                disabled: false,
                                touched : false,
                                errors  : null,
                            },
                            age     : {
                                value   : 0,
                                pending : false,
                                dirty   : false,
                                disabled: false,
                                touched : false,
                                errors  : null,
                            },
                        },
                    },
                },
            });
        });
    });
    describe('Change control in form', () => {
        it('change value in deep child', () => {
            const model = new FormModel('login', {
                user: new FormControlModel(''),
                pass: new FormControlModel(''),
                meta: new FormGroupModel({
                    location: new FormControlModel(''),
                    age     : new FormControlModel(0),
                }),
            });
            const form = new Form('login', model);

            const json = form.toJSON();

            const form2 = form.dispatch({
                type       : ControlActionTypes.SetValue,
                formName   : 'login',
                controlPath: ['meta', 'age'],
                value      : 1,
            });

            const json2 = {
                ...json,
                value   : {
                    user: '',
                    pass: '',
                    meta: {
                        location: '',
                        age     : 1,
                    },
                },
                controls: {
                    ...json.controls,
                    meta: {
                        ...json.controls.meta,
                        controls: {
                            ...json.controls.meta.controls,
                            age: {
                                ...json.controls.meta.controls.age,
                                value: 1,
                            },
                        },
                        value   : {
                            location: '',
                            age     : 1,
                        },
                    },
                },
            };

            should(form2.toJSON()).eql(json2);
        });
        it('set value', () => {
            const model = new FormModel('login', {
                user: new FormControlModel(''),
                pass: new FormControlModel(''),
                meta: new FormGroupModel({
                    location: new FormControlModel(''),
                    age     : new FormControlModel(0),
                }),
            });
            const form = new Form('login', model);

            const json = form.toJSON();

            const form2 = form.dispatch({
                type       : ControlActionTypes.SetValue,
                formName   : 'login',
                controlPath: ['meta'],
                value      : {
                    location: 'Amsterdam',
                    age     : 26,
                },
            });

            const json2 = {
                ...json,
                value   : {
                    user: '',
                    pass: '',
                    meta: {
                        location: 'Amsterdam',
                        age     : 26,
                    },
                },
                controls: {
                    ...json.controls,
                    meta: {
                        ...json.controls.meta,
                        controls: {
                            ...json.controls.meta.controls,
                            age     : {
                                ...json.controls.meta.controls.age,
                                value: 26,
                            },
                            location: {
                                ...json.controls.meta.controls.location,
                                value: 'Amsterdam',
                            },
                        },
                        value   : {
                            location: 'Amsterdam',
                            age     : 26,
                        },
                    },
                },
            };

            should(form2.toJSON()).eql(json2);
        });
        it('patch value', () => {
            const model = new FormModel('login', {
                user: new FormControlModel(''),
                pass: new FormControlModel(''),
                meta: new FormGroupModel({
                    location: new FormControlModel(''),
                    age     : new FormControlModel(0),
                }),
            });
            const form = new Form('login', model);

            const json = form.toJSON();

            const form2 = form.dispatch({
                type       : ControlActionTypes.PatchValue,
                formName   : 'login',
                controlPath: ['meta'],
                value      : {
                    location: 'Amsterdam',
                },
            });

            const json2 = {
                ...json,
                value   : {
                    user: '',
                    pass: '',
                    meta: {
                        location: 'Amsterdam',
                        age     : 0,
                    },
                },
                controls: {
                    ...json.controls,
                    meta: {
                        ...json.controls.meta,
                        controls: {
                            ...json.controls.meta.controls,
                            location: {
                                ...json.controls.meta.controls.location,
                                value: 'Amsterdam',
                            },
                        },
                        value   : {
                            location: 'Amsterdam',
                            age     : 0,
                        },
                    },
                },
            };

            should(form2.toJSON()).eql(json2);
        });
        it('ignore action with invalid formName', () => {
            const model = new FormModel('login', {
                user: new FormControlModel(''),
                pass: new FormControlModel(''),
            });
            const form = new Form('login', model);

            const json = form.toJSON();

            const form2 = form.dispatch({
                type       : ControlActionTypes.SetValue,
                formName   : 'invalid-name',
                controlPath: ['meta', 'age'],
                value      : 1,
            });

            should(form2).equal(form);
            should(form2.toJSON()).eql(json);
        });
        it('throw action with invalid controlPath', () => {
            const model = new FormModel('login', {
                user: new FormControlModel(''),
                pass: new FormControlModel(''),
            });
            const form = new Form('login', model);

            const json = form.toJSON();

            function run() {
                form.dispatch({
                    type       : ControlActionTypes.SetValue,
                    formName   : 'login',
                    controlPath: ['meta', 'invalid-path'],
                    value      : 1,
                });
            }

            try {
                run();
            } catch (e) {
                console.log(e);
            }
            should(run).throw('Unknown field "login: .meta"');
        });
    });
    describe('generateForm', () => {
        it('flat form', () => {
            const model = new FormModel('test', {
                user: new FormControlModel(''),
                pass: new FormControlModel(''),
            });

            const form = generateForm(model);

            should(form.toJSON()).eql({
                formName: 'test',
                value   : {
                    user: '',
                    pass: '',
                },
                controls: {
                    user: {
                        value   : '',
                        pending : false,
                        dirty   : false,
                        disabled: false,
                        touched : false,
                        errors  : null,
                    },
                    pass: {
                        value   : '',
                        pending : false,
                        dirty   : false,
                        disabled: false,
                        touched : false,
                        errors  : null,
                    },
                },
                pending : false,
                dirty   : false,
                disabled: false,
                touched : false,
                errors  : null,
            });

        });
        it('deep form', () => {
            const model = new FormModel('test', {
                user   : new FormControlModel(''),
                pass   : new FormControlModel(''),
                details: new FormGroupModel({
                    email: new FormControlModel('user@example.com'),
                }),
            });

            const form = generateForm(model);

            should(form.toJSON()).eql({
                formName: 'test',
                value   : {
                    user   : '',
                    pass   : '',
                    details: {
                        email: 'user@example.com',
                    },
                },
                controls: {
                    user   : {
                        value   : '',
                        pending : false,
                        dirty   : false,
                        disabled: false,
                        touched : false,
                        errors  : null,
                    },
                    pass   : {
                        value   : '',
                        pending : false,
                        dirty   : false,
                        disabled: false,
                        touched : false,
                        errors  : null,
                    },
                    details: {
                        value   : {
                            email: 'user@example.com',
                        },
                        controls: {
                            email: {
                                value   : 'user@example.com',
                                pending : false,
                                dirty   : false,
                                disabled: false,
                                touched : false,
                                errors  : null,
                            },
                        },
                        pending : false,
                        dirty   : false,
                        disabled: false,
                        touched : false,
                        errors  : null,
                    },
                },
                pending : false,
                dirty   : false,
                disabled: false,
                touched : false,
                errors  : null,
            });

        });
    });
});
