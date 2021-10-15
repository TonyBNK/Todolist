import {AppRequestType} from "../../types/types";
import {setAppError, setAppInitialized, setAppStatus} from "../actions/actions";
import {AppReducer} from "./AppReducer";


let initialState: AppRequestType;

beforeEach(() => {
    initialState = {
        status: "idle",
        error: null,
        isInitialized: false
    }
});

test('request status should be changed', () => {
    const newState = AppReducer(initialState, setAppStatus('loading'));
    expect(newState.status).toBe('loading');
});

test('request error should be changed', () => {
    const newState = AppReducer(initialState, setAppError('Some error occurred'));
    expect(newState.error).toBe('Some error occurred');
});

test('app initialization should be changed', () => {
    const newState = AppReducer(initialState, setAppInitialized(true));
    expect(newState.isInitialized).toBeTruthy();
});

