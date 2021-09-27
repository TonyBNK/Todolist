import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../components/Todolist/Task";


export default {
    title: 'Task',
    component: Task,
    argTypes: {
        removeTask: {
            description: 'Removes task from todolist'
        },
        setTaskCompleted: {
            description: 'Makes task complete or active'
        },
        changeTaskTitle: {
            description: "Changes task's title"
        }
    },
    args: {
        removeTask: action('Task was removed'),
        setTaskCompleted: action('Task status was changed'),
        changeTaskTitle: action("Tasks's title was changed")
    }
} as Meta;

const Template: Story<TaskPropsType> = (args) =>
    <Task {...args}/>;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    taskData: {id: '1', isDone: true, title: 'JS'},
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    taskData: {id: '2', isDone: false, title: 'Saga'},
}