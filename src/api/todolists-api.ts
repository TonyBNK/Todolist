import axios, {AxiosResponse} from "axios";
import {
    TodolistType,
    ResponseType,
    GetTasksResponseType,
    TaskType, GetTodolistsType, LoginDataType
} from "../types/types";


const axiosInst = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'c71ad832-d3a7-49e4-81f5-4b21198b07fd'
    }
});

export const authAPI = {
    me: () => {
        return axiosInst
            .get<ResponseType<{ id: number, email: string, login: string }>>('auth/me');
    },
    logIn: (loginData: LoginDataType) => {
        return axiosInst
            .post<LoginDataType, AxiosResponse<ResponseType<{ userId: number }>>>('auth/login', {
                ...loginData
            });
    },
    logOut: () => {
        return axiosInst
            .delete<ResponseType>('auth/login');
    }
}

export const todolistsAPI = {
    getTodolists: () => {
        return axiosInst
            .get<GetTodolistsType>(`todo-lists`);
    },
    createTodolist: (title: string) => {
        return axiosInst
            .post<string, AxiosResponse<ResponseType<{ item: TodolistType }>>>('/todo-lists', {
                title: title
            });
    },
    updateTodolist: ({id, ...updatableProps}: TodolistType) => {
        return axiosInst
            .put<TodolistType, AxiosResponse<ResponseType>>(`todo-lists/${id}`, {
                ...updatableProps
            });
    },
    deleteTodolist: (id: string) => {
        return axiosInst
            .delete<string, AxiosResponse<ResponseType>>(`todo-lists/${id}`);
    },
    tasksAPI: {
        getTasks: (todolistId: string) => {
            return axiosInst
                .get<string, AxiosResponse<GetTasksResponseType>>(`todo-lists/${todolistId}/tasks`);
        },
        createTask: (title: string, todolistId: string) => {
            return axiosInst
                .post<{title: string, todolistId: string}, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {
                    title: title
                });
        },
        updateTask: ({todoListId, id, ...updatableProps}: TaskType) => {
            return axiosInst
                .put<TaskType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todoListId}/tasks/${id}`, {
                    ...updatableProps
                });
        },
        deleteTask: (id: string, todoListId: string) => {
            return axiosInst
                .delete<{id: string, todoListId: string}, AxiosResponse<ResponseType>>(`todo-lists/${todoListId}/tasks/${id}`);
        }
    }
}