import React from 'react';
import Button from '../Button/Button';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Button',
};

export const filled = () => <Button className="button" callback={action('clicked')}></Button>;

export const outline = () => (
  <Button className="button button--outline" callback={action('clicked')}>
  </Button>
);
