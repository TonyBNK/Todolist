import {RootStateType} from "../../types/types";

export const selectIsLogged = (state: RootStateType): boolean => state.auth.isLogged;
