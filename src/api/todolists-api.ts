import axios from "axios";
import {
    TodolistType,
    ResponseType,
    GetTasksType,
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
    login: (loginData: LoginDataType) => {
        return axiosInst
            .post<ResponseType<{userId: number}>>('auth/login', {
                ...loginData
            });
    },
}

export const todolistsAPI = {
    getTodolists: () => {
        return axiosInst
            .get<GetTodolistsType>(`todo-lists`);
    },
    createTodolist: (title: string) => {
        return axiosInst
            .post<ResponseType<{ item: TodolistType }>>('/todo-lists', {
                title: title
            });
    },
    updateTodolist: ({id, ...updatableProps}: TodolistType) => {
        return axiosInst
            .put<ResponseType>(`todo-lists/${id}`, {
                ...updatableProps
            });
    },
    deleteTodolist: (id: string) => {
        return axiosInst
            .delete<ResponseType>(`todo-lists/${id}`);
    },
    tasksAPI: {
        getTasks: (todolistId: string) => {
            return axiosInst
                .get<GetTasksType>(`todo-lists/${todolistId}/tasks`);
        },
        createTask: (title: string, todolistId: string) => {
            return axiosInst
                .post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {
                    title: title
                });
        },
        updateTask: ({todoListId, id, ...updatableProps}: TaskType) => {
            return axiosInst
                .put<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks/${id}`, {
                    ...updatableProps
                });
        },
        deleteTask: (id: string, todoListId: string) => {
            return axiosInst
                .delete<ResponseType>(`todo-lists/${todoListId}/tasks/${id}`);
        }
    }
}