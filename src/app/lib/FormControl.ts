import { AnyAction } from 'redux';
import { AbstractControlModel } from './abstract-control.model';
import { ControlActionTypes } from './actions';
import { FormAction } from './interfaces';

export enum EventType {
    Change = 'change',
    MarkAsTouched = 'MARK_AS_TOUCHED',
}

interface IEventFactoryConfig {
    prevent: boolean;
}

export type IEventFactory = any;

export function eventFactory(actionFactory: (event: any) => AnyAction,
                             config?: IEventFactoryConfig): IEventFactory {
    return dispatch => (event: any) => {
        dispatch({
            type: 'event',
            event,
        });
    };
}

export type EventRewrite = (acton: FormAction) => AnyAction | AnyAction[];

export interface IEvents {
    [ControlActionTypes.SetValue]?: EventRewrite;
    [ControlActionTypes.MarkAsTouched]?: EventRewrite;
}
