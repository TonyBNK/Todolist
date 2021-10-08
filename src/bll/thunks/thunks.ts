import {todolistsAPI} from "../../api/todolists-api";
import {
    addTask,
    addTodolist, changeTask,
    changeTodolistTitle, getAllTasks,
    getAllTodolists, removeTask, removeTodolist
} from "../action-creators/actionCreators";
import {
    CreateTaskType,
    CreateTodolistType, DeleteTaskType, DeleteTodolistType, GetAllTasksType,
    GetAllTodolistsType, UpdateTaskType,
    UpdateTodolistType
} from "../../types/types";


export const getTodolists: GetAllTodolistsType = () => {
    return (dispatch) => {
        todolistsAPI
            .getTodolists()
            .then(response => {
                dispatch(getAllTodolists(response.data));
            })
            .catch(error => console.log(error));
    }
}

export const createTodolist: CreateTodolistType = (title) => {
    return (dispatch) => {
        todolistsAPI
            .createTodolist(title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(addTodolist(response.data.data.item));
                }
            })
            .catch(error => console.log(error));
    }
}

export const updateTodolist: UpdateTodolistType = (id, newTitle) => {
    return (dispatch) => {
        todolistsAPI
            .updateTodolist(id, newTitle)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTodolistTitle(id, newTitle));
                }
            })
            .catch(error => console.log(error));
    }
}

export const deleteTodolist: DeleteTodolistType = (id) => {
    return (dispatch) => {
        todolistsAPI
            .deleteTodolist(id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTodolist(id));
                }
            })
            .catch(error => console.log(error));
    }
}

export const getTasks: GetAllTasksType = (todoListId) => {
    return (dispatch) => {
        todolistsAPI
            .tasksAPI
            .getTasks(todoListId)
            .then(response => {
                dispatch(getAllTasks(todoListId, response.data.items));
            })
            .catch(error => console.log(error));
    }
}

export const createTask: CreateTaskType = (title, todoListId) => {
    return (dispatch) => {
        todolistsAPI
            .tasksAPI
            .createTask(title, todoListId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(addTask(response.data.data.item));
                }
            })
            .catch(error => console.log(error));
    }
}

export const updateTask: UpdateTaskType = (task, payload) => {
    return (dispatch) => {
        todolistsAPI
            .tasksAPI
            .updateTask({...payload})
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTask(response.data.data.item));
                }
            })
            .catch(error => console.log(error));
    }
}

export const deleteTask: DeleteTaskType = (id, todoListId) => {
    return (dispatch) => {
        todolistsAPI
            .tasksAPI
            .deleteTask(id, todoListId)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTask(id));
                }
            })
            .catch(error => console.log(error));
    }
}