import TheHeader from './../components/TheHeader.vue';

export default {
  title: 'Example/TheHeader',
  component: TheHeader,
  tags: ['autodocs'],
  argTypes: {}
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TheHeader },
  template: '<TheHeader title="Exemples d\'utilisation de l\'API des extensions"/>',
});

export const ByDefault = Template.bind({});
ByDefault.args = {};
