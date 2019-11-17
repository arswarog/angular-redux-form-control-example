import { NgRedux, NgReduxModule, DevToolsExtension } from '@angular-redux/store';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IRootState, rootReducer } from './store/reducer';
import { createLogger } from 'redux-logger';

const __DEVMODE__ = true;

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports     : [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        NgReduxModule,
    ],
    providers   : [],
    bootstrap   : [AppComponent],
})
export class AppModule {
    constructor(private ngRedux: NgRedux<IRootState>,
                private devTools: DevToolsExtension) {
        let enhancers = [];
        // ... add whatever other enhancers you want.

        // You probably only want to expose this tool in devMode.
        if (__DEVMODE__ && devTools.isEnabled()) {
            enhancers = [...enhancers, devTools.enhancer()];
        }

        this.ngRedux.configureStore(
            rootReducer,
            undefined,
            [
                createLogger(),
            ],
            enhancers,
        );
    }
}
