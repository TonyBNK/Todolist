import {
    AddItemForm,
    AddItemFormPropsType
} from "../components/Todolist/AddItemForm";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";


export default {
    title: 'AddItemForm',
    component: AddItemForm,
    argTypes: {
        onClick: {
            description: 'Button inside form clicked'
        }
    }
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) =>
    <AddItemForm {...args}/>;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('Button inside form clicked')
}