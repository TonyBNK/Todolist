import axios from "axios";
import {
    TodolistType,
    ResponseType,
    GetTasksType,
    TaskType, GetTodolistsType
} from "../types/types";

const axiosInst = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'c71ad832-d3a7-49e4-81f5-4b21198b07fd'
    }
});

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
    updateTodolist: (id: string, newTitle: string) => {
        return axiosInst
            .put<ResponseType>(`todo-lists/${id}`, {
                title: newTitle
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
        createTask: (todolistId: string, title: string) => {
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
        deleteTask: (todolistId: string, id: string) => {
            return axiosInst
                .delete<ResponseType>(`todo-lists/${todolistId}/tasks/${id}`);
        }
    }
}