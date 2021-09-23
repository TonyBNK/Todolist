import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../components/Todolist/Task";


export default {
    title: 'Task',
    component: Task,
} as Meta;

const removeTaskCallback = action('Task was removed');
const setTaskCompletedCallback = action('Task status was changed');
const changeTaskTitleCallback = action("Tasks's title was changed");

const baseArgs = {
    removeTask: removeTaskCallback,
    setTaskCompleted: setTaskCompletedCallback,
    changeTaskTitle: changeTaskTitleCallback
}

const Template: Story<TaskPropsType> = (args) =>
    <Task {...args}/>;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    taskData: {id: '1', isDone: true, title: 'JS'},
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    taskData: {id: '2', isDone: false, title: 'Saga'},
}