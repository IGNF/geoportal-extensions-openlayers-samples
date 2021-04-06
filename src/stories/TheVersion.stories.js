import TheVersion from './../components/TheVersion.vue';

export default {
  title: 'Example/TheVersion',
  component: TheVersion,
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TheVersion },
  template: '<TheVersion :version="info.version" :date="info.date"/>',
});

export const ByDefault = Template.bind({});
ByDefault.args = {
  info: {
    version: "1.0.0",
    date: "01/01/2021"
  }
};
