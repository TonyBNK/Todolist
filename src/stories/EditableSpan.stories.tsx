import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {
    EditableSpan,
    EditableSpanPropsType
} from "../components/Todolist/EditableSpan";


export default {
    title: 'EditableSpan',
    component: EditableSpan,
    argTypes: {
        onChangeTitle: {
            description: 'Changes title of span'
        },
        title: {
            defaultValue: 'HTML',
            description: 'Start value of EditableSpan'
        }
    }
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) =>
    <EditableSpan {...args}/>;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChangeTitle: action('Title was changed')
}