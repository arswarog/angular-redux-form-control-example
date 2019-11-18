import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import * as Angular from '@angular/forms';
import { Observable } from 'rxjs';
import { AbstractControl } from './lib/abstract-control';
import { MarkAsTouched, MarkAsUntouched, SetValue } from './lib/actions';
import { AngularFormControlBinder } from './lib/angular-binder';
import { FormControl } from './lib/form-control';
import { formControlInstance, FormControlInstance } from './lib/form-control-instance';
import { FormGroup } from './lib/form-group';
import { eventFactory } from './lib/FormControl';
import { ActionType, SetError, SetName, SetValid } from './store/actions';
import { IRootState } from './store/reducer';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    public title = 'angular-redux-form-control-example';

    public form = new Angular.FormGroup({
        name: new Angular.FormControl('login', Validators.required),
        pass: new Angular.FormControl('', Validators.required),
    });

    abstractForm = new FormGroup('loginForm',
        {
            name: new FormControl<string>(
                'oleg',
                [],
                [],
                {
                    MARK_AS_TOUCHED: eventFactory(MarkAsTouched),
                },
            ),
            pass: new FormControl(
                '',
                [],
                [],
                {
                    MARK_AS_TOUCHED: eventFactory(MarkAsTouched),
                },
            ),
        },
    );

    abstractName = new FormControl(
        'oleg',
        [],
        [],
        {
            MARK_AS_TOUCHED: eventFactory(MarkAsTouched),
        },
    );

    name: FormControlInstance<string>;

    public dispatch: any;

    @select([])
    state$: Observable<IRootState>;

    constructor(public store: NgRedux<IRootState>) {
        this.dispatch = store.dispatch.bind(store);
    }

    ngOnInit() {
        const binder = new AngularFormControlBinder(
            this.form.controls.name,
            this.abstractName,
            this.dispatch,
            this.store.select(['name']),
        );

        this.store.dispatch({
            type: ActionType.InitForm,
        });

        this.setName('vanya');
        setTimeout(() => this.setName('ollegy'), 1000);

        const control = this.abstractForm.scheme.name as AbstractControl<string>;
    }

    setName(name: string) {
        this.store.dispatch(SetName(name));
    }

    setError() {
        this.store.dispatch(SetError());
    }

    setValid() {
        this.store.dispatch(SetValid());
    }
    public touch() {
        this.store.dispatch(MarkAsTouched());
    }
    public unTouch() {
        this.store.dispatch(MarkAsUntouched());
    }
}
