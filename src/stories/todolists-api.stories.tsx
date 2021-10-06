import React, {useEffect, useState} from 'react';
import {Nullable, TaskType, todolistsAPI} from "../api/todolists-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistsAPI
            .getTodolists()
            .then(response => {
                setState(response.data);
            });
    }, []);

    return (
        <div>{JSON.stringify(state)}</div>
    )
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('');

    const createTodolist = () => {
        todolistsAPI
            .createTodolist(title)
            .then(response => {
                setState(response.data.data.item);
            });
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={createTodolist}>create todolist</button>
        </div>
    )
}

export const UpdateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [id, setId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const updateTodolist = () => {
        todolistsAPI
            .updateTodolist(id, title)
            .then(response => {
                setState(response.data);
            });
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                placeholder={'todolistId'}
                value={id}
                onChange={(e) => setId(e.currentTarget.value)}
            />
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={updateTodolist}>update todolist</button>
        </div>
    )
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [id, setId] = useState<string>('');

    const deleteTodolist = () => {
        todolistsAPI
            .deleteTodolist(id)
            .then(response => {
                setState(response.data);
            })
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                placeholder={'todolistId'}
                value={id}
                onChange={(e) => setId(e.currentTarget.value)}
            />
            <button onClick={deleteTodolist}>delete todolist</button>
        </div>
    )
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const getTasks = () => {
        todolistsAPI
            .getTasks(todolistId)
            .then(response => {
                setState(response.data.items);
            });
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <button onClick={getTasks}>get tasks</button>
        </div>
    )
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [title, setTitle] = useState<string>('');

    const createTask = () => {
        todolistsAPI
            .createTask(todolistId, title)
            .then(response => {
                setState(response.data.data.item);
            });
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <input
                placeholder={'title'}
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={createTask}>create task</button>
        </div>
    )
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todoListId, setTodoListId] = useState<string>('');
    const [id, setId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [completed, setCompleted] = useState<boolean>(false);
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [startDate, setStartDate] = useState<Nullable<string>>(null);
    const [deadline, setDeadline] = useState<Nullable<string>>(null);
    const [order, setOrder] = useState<number>(0);

    const taskModel: TaskType = {
        todoListId,
        id,
        title,
        description,
        completed,
        status,
        priority,
        startDate,
        deadline,
        order,
        addedDate: new Date()
    }

    const updateTask = () => {
        todolistsAPI
            .updateTask({...taskModel})
            .then(response => {
                debugger;
                setState(response.data.data.item);
            });
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <div>
                <input
                    placeholder={'todolistId'}
                    value={todoListId}
                    onChange={(e) => setTodoListId(e.currentTarget.value)}
                />
            </div>
            <div>
                <input
                    placeholder={'taskId'}
                    value={id}
                    onChange={(e) => setId(e.currentTarget.value)}
                />
            </div>
            <div>
                <input
                    placeholder={'title'}
                    value={title}
                    onChange={(e) => setTitle(e.currentTarget.value)}
                />
            </div>
            <div>
                <input
                    placeholder={'description'}
                    value={description}
                    onChange={(e) => setDescription(e.currentTarget.value)}
                />
            </div>
            <div>
                <input
                    type={'checkbox'}
                    onChange={(e) => setCompleted(e.currentTarget.checked)}
                />
                task completed
            </div>
            <div>
                <input
                    type={'number'}
                    value={status}
                    onChange={(e) => setStatus(+e.currentTarget.value)}
                />
                status
            </div>
            <div>
                <input
                    type={'number'}
                    value={priority}
                    onChange={(e) => setPriority(+e.currentTarget.value)}
                />
                priority
            </div>
            <div>
                <input
                    type={'date'}
                    onChange={(e) => setStartDate(e.currentTarget.value)}
                />
                start date
            </div>
            <div>
                <input
                    type={'date'}
                    onChange={(e) => setDeadline(e.currentTarget.value)}
                />
                deadline
            </div>
            <div>
                <input
                    type={'number'}
                    value={order}
                    onChange={(e) => setOrder(+e.currentTarget.value)}
                />
                order
            </div>
            <button onClick={updateTask}>update task</button>
        </div>
    )
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    const deleteTask = () => {
        todolistsAPI
            .deleteTask(todolistId, taskId)
            .then(response => {
                setState(response.data.data);
            });
    }

    return (
        <div>
            <div>{JSON.stringify(state)}</div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <input
                placeholder={'taskId'}
                value={taskId}
                onChange={(e) => setTaskId(e.currentTarget.value)}
            />
            <button onClick={deleteTask}>delete task</button>
        </div>
    )
}
