import {AppRequestType} from "../../types/types";
import {
    AppReducer,
    setAppError,
    setAppInitialized,
    setAppStatus
} from "./AppReducer";


let initialState: AppRequestType;

beforeEach(() => {
    initialState = {
        status: "idle",
        error: null,
        isInitialized: false
    }
});

test('request status should be changed', () => {
    const newState = AppReducer(initialState, setAppStatus({status: 'loading'}));
    expect(newState.status).toBe('loading');
});

test('request error should be changed', () => {
    const newState = AppReducer(initialState, setAppError({error: 'Some error occurred'}));
    expect(newState.error).toBe('Some error occurred');
});

test('app initialization should be changed', () => {
    const newState = AppReducer(initialState, setAppInitialized({isInitialized: true}));
    expect(newState.isInitialized).toBeTruthy();
});

