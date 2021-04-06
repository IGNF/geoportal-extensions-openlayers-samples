import TheCptJsdoc from './../../components/router/TheCptJsdoc.vue';

export default {
  title: 'Example/TheCptJsdoc',
  component: TheCptJsdoc,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TheCptJsdoc },
  template: '<TheCptJsdoc />',
});

export const ByDefault = Template.bind({});
ByDefault.args = {
};
