import React from 'react';
import Button from './Button';
import { actions } from '@storybook/addon-actions';


export default{
	title: 'Components/Button',
	component: Button,
	argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'warning', 'danger', 'attention'],
      },
      
    },
    size: {
      	control:{
      		type: 'select',
      		options: ['small','medium', 'large']
      	}
      	
    },
    font: {
    	control: {
    		type: 'select',
    		options: ['game', 'official']
    	}
    },
    action: {
    	action: 'on'
    },
    onHover: {
    	action: 'onHover'
    }

  },
  
}



const Template = (args) => <Button {...args}/>

export const Small = Template.bind({});

Small.args = {
	status: 'primary',
	text: 'small button',
	size: 'small',
}

export const Medium = Template.bind({});

Medium.args = {
	status: 'primary',
	text: 'medium button',
	size: 'medium'
}

export const Large = Template.bind({});

Large.args = {
	status: 'primary',
	text: 'large button',
	size: 'large'
}

