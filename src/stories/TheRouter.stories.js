import TheRouter from './../components/TheRouter.vue';

export default {
  title: 'Example/TheRouter',
  component: TheRouter,
  tags: ['autodocs'],
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TheRouter },
  template: '<TheRouter :name="name" />',
});

export const ByDefault = Template.bind({});
ByDefault.args = {
  name: "OpenLayers"
};
