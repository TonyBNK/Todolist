import {todolistsAPI} from "../../api/todolists-api";
import {
    addTask,
    addTodolist, changeTaskTitle,
    changeTodolistTitle, getAllTasks,
    getAllTodolists, removeTask, removeTodolist
} from "../action-creators/actionCreators";
import {
    CreateTaskType,
    CreateTodolistType, DeleteTaskType, DeleteTodolistType, GetAllTasksType,
    GetAllTodolistsType, UpdateTaskTitleType,
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

export const updateTodolist: UpdateTodolistType = (todolist, newTitle) => {
    return (dispatch) => {
        todolistsAPI
            .updateTodolist(todolist.id, newTitle)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTodolistTitle(todolist, newTitle));
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

export const createTask: CreateTaskType = (task) => {
    return (dispatch) => {
        todolistsAPI
            .tasksAPI
            .createTask(task.todoListId, task.title)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(addTask(task));
                }
            })
            .catch(error => console.log(error));
    }
}

export const updateTaskTitle: UpdateTaskTitleType = (task, newTitle) => {
    return (dispatch) => {
        todolistsAPI
            .tasksAPI
            .updateTask(task)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(changeTaskTitle(task, newTitle));
                }
            })
            .catch(error => console.log(error));
    }
}

export const deleteTask: DeleteTaskType = (task) => {
    return (dispatch) => {
        todolistsAPI
            .tasksAPI
            .deleteTask(task.todoListId, task.id)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(removeTask(task));
                }
            })
            .catch(error => console.log(error));
    }
}