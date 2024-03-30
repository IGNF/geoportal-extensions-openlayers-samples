
import { fn } from '@storybook/test';
export const parameters = {
  actions: { onclick : fn() },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}