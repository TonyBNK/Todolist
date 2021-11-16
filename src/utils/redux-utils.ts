import {useDispatch} from "react-redux";
import {AppDispatchType} from "../types/types";
import {ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";


export const useActions = <T extends ActionCreatorsMapObject>(actions: T) => {
    const dispatch = useDispatch();

    return useMemo(() => {
        return bindActionCreators(actions, dispatch);
    }, []);
}

export const useAppDispatch = () => useDispatch<AppDispatchType>();