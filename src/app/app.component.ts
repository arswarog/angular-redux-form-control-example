import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import * as Angular from '@angular/forms';
import { Observable } from 'rxjs';
import { formControlInstance, FormControlInstance } from './lib/form-control-instance';
import { eventFactory, FormControl } from './lib/FormControl';
import { ActionType, MarkAsTouched, SetError, SetName, SetValid } from './store/actions';
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

    constructor(private store: NgRedux<IRootState>) {
        this.dispatch = store.dispatch.bind(store);
    }

    ngOnInit() {
        this.store
            .select(['name'])
            .subscribe(
                (name: any) => {
                    console.log('formControlInstance', name);
                    this.name = formControlInstance(
                        this.dispatch,
                        this.abstractName,
                        name,
                        this.name,
                    );
                },
            );

        this.store.dispatch({
            type: ActionType.InitForm,
        });

        this.setName('vanya');
        setTimeout(() => this.setName('ollegy'), 1000);
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
}
