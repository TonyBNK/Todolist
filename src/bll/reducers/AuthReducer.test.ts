import {AuthStateType} from "../../types/types";
import {AuthReducer, setLogged} from "./AuthReducer";


let initialState: AuthStateType;

beforeEach(() => {
    initialState = {
        isLogged: false
    }
})

test('auth login state should be changed', () => {
    const newState = AuthReducer(initialState, setLogged({isLogged: true}));
    expect(newState.isLogged).toBeTruthy();
});