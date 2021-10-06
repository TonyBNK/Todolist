import axios from "axios";

const axiosInst = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'c71ad832-d3a7-49e4-81f5-4b21198b07fd'
    }
});

export type Nullable<T> = T | null;

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<D> = {
    data: D,
    resultCode: number
    messages: Array<string>
}

export type TaskType = {
    todoListId: string
    id: string
    description: Nullable<string>
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Nullable<string>
    deadline: Nullable<string>
    order: number
    addedDate: Date
}

type ResponseGetTasksType = {
    items: Array<TaskType>,
    totalCount: number,
    error: string | null
}

type ResponseCreateUpdateTasksType = {
    data: {
        item: TaskType
    },
    resultCode: number,
    messages: Array<string>
}

export const todolistsAPI = {
    getTodolists: () => {
        return axiosInst
            .get<Array<TodolistType>>(`todo-lists`);
    },
    createTodolist: (title: string) => {
        return axiosInst
            .post<ResponseType<{ item: TodolistType }>>('/todo-lists', {
                title: title
            });
    },
    updateTodolist: (id: string, newTitle: string) => {
        return axiosInst
            .put<ResponseType<{}>>(`todo-lists/${id}`, {
                title: newTitle
            });
    },
    deleteTodolist: (id: string) => {
        return axiosInst
            .delete<ResponseType<{}>>(`todo-lists/${id}`);
    },
    getTasks: (todolistId: string) => {
        return axiosInst
            .get<ResponseGetTasksType>(`todo-lists/${todolistId}/tasks`);
    },
    createTask: (todolistId: string, taskTitle: string) => {
        return axiosInst
            .post<ResponseCreateUpdateTasksType>(`todo-lists/${todolistId}/tasks`, {
               title: taskTitle
            });
    },
    updateTask: ({todoListId, id, ...restProps}: TaskType) => {
        return axiosInst
            .put<ResponseCreateUpdateTasksType>(`todo-lists/${todoListId}/tasks/${id}`, {
                ...restProps
            });
    },
    deleteTask: (todolistId: string, taskId: string) => {
        return axiosInst
            .delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`);
    }
}