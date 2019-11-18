import { AnyAction } from 'redux';
import { AbstractControl } from './abstract-control';

export enum EventType {
    Change        = 'change',
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

export interface IEvents {
    [EventType.Change]?: IEventFactory;
    [EventType.MarkAsTouched]?: IEventFactory;
}
