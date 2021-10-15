import {AuthStateType} from "../../types/types";
import {setLogged} from "../actions/actions";
import {AuthReducer} from "./AuthReducer";


let initialState: AuthStateType;

beforeEach(() => {
    initialState = {
        isLogged: false
    }
})

test('auth login state should be changed', () => {
    const newState = AuthReducer(initialState, setLogged(true));
    expect(newState.isLogged).toBeTruthy();
});