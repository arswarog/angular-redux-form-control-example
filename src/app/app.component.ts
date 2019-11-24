import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import * as Angular from '@angular/forms';
import { Observable } from 'rxjs';
import { FormBinder } from './angular-binder/form';
import { AbstractControlModel } from './lib/abstract-control.model';
import { MarkAsTouched, MarkAsUntouched, SetValue } from './lib/actions';
import { FormModel } from './lib/form.model';
import { FormControlModel } from './lib/form-control.model';
import { FormControlInstance } from './lib/form-control.instance';
import { FormGroupModel } from './lib/form-group.model';
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

    abstractForm = new FormModel('loginForm',
        {
            name: new FormControlModel<string>(
                'oleg',
                [],
                [],
                {
                    MARK_AS_TOUCHED: eventFactory(MarkAsTouched),
                },
            ),
            pass: new FormControlModel(
                '',
                [],
                [],
                {
                    MARK_AS_TOUCHED: eventFactory(MarkAsTouched),
                },
            ),
        },
    );

    instance: FormControlInstance<string>;

    public dispatch: any;

    @select([])
    state$: Observable<IRootState>;

    constructor(public store: NgRedux<IRootState>) {
        this.dispatch = store.dispatch.bind(store);
    }

    ngOnInit() {
        const binder = new FormBinder(
            this.form,
            this.abstractForm,
            this.dispatch,
            this.store.select(['name']),
        );

        this.store.dispatch({
            type: ActionType.InitForm,
        });

        this.setName('vanya');
        setTimeout(() => this.setName('ollegy'), 1000);

        const control = this.abstractForm.scheme.name as AbstractControlModel<string>;
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
