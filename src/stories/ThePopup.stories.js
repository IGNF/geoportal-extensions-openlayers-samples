import ThePopup from './../components/ThePopup.vue';

export default {
  title: 'Example/ThePopup',
  component: ThePopup,
  tags: ['autodocs'],
  argTypes: {
    show : true,
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ThePopup },
  template: '\
<ThePopup v-if="show" @close="show = false">\
  <template v-slot:header>\
      <h3>Code JS</h3>\
  </template>\
  <template v-slot:body>\
      <pre>{{ code }}</pre>\
  </template>\
  <template v-slot:footer>\
      version {{ info.version }}\
  </template>\
</ThePopup>',
});

export const ByDefault = Template.bind({});
ByDefault.args = {
  show : true,
  code: "test",
  info: {
    version: "1.0.0"
  }
};
