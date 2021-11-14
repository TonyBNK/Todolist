import {asyncActions as authAsyncActions, authSlice} from "./AuthReducer";
import {asyncActions as appAsyncActions, appSlice} from "./AppReducer";


const authActions = {
    ...authAsyncActions,
    ...authSlice.actions
}

const appActions = {
    ...appAsyncActions,
    ...appSlice.actions
}

export {
    authActions,
    appActions
}
