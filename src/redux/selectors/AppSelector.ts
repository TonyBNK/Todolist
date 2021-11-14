import {AppRequestType, RootStateType} from "../../types/types";

export const selectAppVariables = (state: RootStateType): AppRequestType => state.app;
