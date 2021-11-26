import {AuthStateType} from "../../types/types";
import {AuthReducer} from "./AuthReducer";
import {authActions} from "../actions";


const {setLogged} = authActions;

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