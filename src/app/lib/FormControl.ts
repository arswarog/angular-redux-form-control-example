import { AnyAction } from 'redux';

export type IValidator = any;
export type IAsyncValidator = any;

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

export class FormControl<T> {
    constructor(public readonly defaultValue: T,
                public readonly validators: IValidator | IValidator[],
                public readonly asyncValidators: IAsyncValidator | IAsyncValidator[],
                // public readonly dispatch: (action: AnyAction) => void,
                public readonly events: IEvents) {
    }

    public emitEvent(dispatch: any, event: EventType, value?: T | boolean): void {
        console.log(`emit event "${event}"`);
    }

    // public markAsTouched() {
    //     this.emitEvent(EventType.MarkAsTouched);
    // }
}


