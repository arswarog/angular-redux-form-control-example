export enum ActionType {
    InitForm      = 'Init form',
    SetName       = 'Set name',
    MarkAsTouched = 'Mark as touched',
    SetError      = 'Set error',
    SetValid      = 'Set valid',
}

export const SetName = (value: string) => ({
    type: ActionType.SetName,
    value,
});

export const MarkAsTouched = () => ({
    type: ActionType.MarkAsTouched,
});

export const SetError = () => ({
    type: ActionType.SetError,
});

export const SetValid = () => ({
    type: ActionType.SetValid,
});
