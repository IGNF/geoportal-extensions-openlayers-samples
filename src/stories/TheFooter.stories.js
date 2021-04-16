import TheFooter from './../components/TheFooter.vue';

export default {
  title: 'Example/TheFooter',
  component: TheFooter,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TheFooter },
  template: '<TheFooter/>',
});

export const ByDefault = Template.bind({});
ByDefault.args = {};
