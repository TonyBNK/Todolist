import {
    AddItemForm,
    AddItemFormPropsType
} from "../components/common/AddItemForm/AddItemForm";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";


export default {
    title: 'AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Adds new item to form'
        }
    }
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) =>
    <AddItemForm {...args}/>;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('Item was added')
}