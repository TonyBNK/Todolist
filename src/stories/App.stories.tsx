import React from 'react';
import {Meta, Story} from '@storybook/react';
import App from "../App";
import {ReduxStoreProviderDecorator} from "./decorators/ReduxStoreProviderDecorator";

export default {
    title: 'App',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
} as Meta;

const Template: Story = (args) => <App {...args} />;

export const AppExample = Template.bind({});
AppExample.args = {};
