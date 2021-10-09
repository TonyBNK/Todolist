import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../components/features/Todolist/Task/Task";
import {TaskPriorities, TaskStatuses} from "../types/types";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";


export default {
    title: 'Task',
    component: Task,
    argTypes: {
        removeTask: {
            description: 'Removes task from todolist'
        },
        changeTaskTitle: {
            description: "Changes task's title"
        },
        changeTaskStatus: {
            description: "Changes task's status"
        },
    },
    args: {
        removeTask: action('Task was removed'),
        changeTask: action("Tasks was changed")
    },
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story<TaskPropsType> = (args) =>
    <Task {...args}/>;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    taskModel: {
        id: 'asdfiopaksg',
        title: 'Thunk',
        status: TaskStatuses.Completed,
        startDate: null,
        deadline: null,
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: 'asdfasdtetast',
        addedDate: new Date(),
        order: 0
    }
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    taskModel: {
        id: 'asdfiopaksg',
        title: 'Saga',
        status: TaskStatuses.New,
        startDate: null,
        deadline: null,
        description: '',
        priority: TaskPriorities.Middle,
        todoListId: 'asdfasdtetast',
        addedDate: new Date(),
        order: 0
    }
}