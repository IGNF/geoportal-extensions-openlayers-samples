import TheCptOptions from './../../components/options/TheCptOptions.vue';

export default {
  title: 'Example/TheCptOptions',
  component: TheCptOptions,
  argTypes: {
    
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TheCptOptions },
  template: '<TheCptOptions v-bind:options="options.widget" @check-option=onActive />',
});

export const OptionWithAuto = Template.bind({});
OptionWithAuto.args = {
  options: {
    widget : {
      "name": "widget",
      "auto": true,
      "params": [{
          "type": {
              "names": ["Object"]
          },
          "description": "options",
          "name": "options",
          "value": null,
          "section": true
      }, {
          "type": {
              "names": ["Boolean"]
          },
          "optional": true,
          "defaultvalue": true,
          "description": "description",
          "name": "options.foo",
          "value": null,
          "section": false
      }]
    }
  }
};

export const OptionWithoutAuto = Template.bind({});
OptionWithoutAuto.args = {
  options: {
    widget : {
      "name": "widget",
      "auto": false,
      "params": [{
          "type": {
              "names": ["Object"]
          },
          "description": "options",
          "name": "options",
          "value": null,
          "section": true
      }, {
          "type": {
              "names": ["Boolean"]
          },
          "optional": true,
          "defaultvalue": true,
          "description": "description",
          "name": "options.foo",
          "value": null,
          "section": false
      }]
    }
  }
};
