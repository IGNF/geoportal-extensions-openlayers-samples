import TheCptOptionType from './../../components/options/TheCptOptionType.vue';

export default {
  title: 'Example/TheCptOptionType',
  component: TheCptOptionType,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    
  }
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { TheCptOptionType },
  template: '<TheCptOptionType v-bind:option="option" v-bind:name="name" v-bind:auto="auto" @change-value=onChangeValue />',
});

export const TestBoolean = Template.bind({});
TestBoolean.args = {
  name: "widget",
  auto: true,
  option: {
    type: {
      names: ["Boolean"]
    },
    optional: true,
    defaultvalue: true,
    description: "description",
    name: "options.foo",
    value: null,
    section: false
  }
};

export const TestString = Template.bind({});
TestString.args = {
  name: "widget",
  auto: true,
  option: {
    type: {
      names: ["String"]
    },
    optional: true,
    defaultvalue: "string",
    description: "description",
    name: "options.foo",
    value: null,
    section: false
  }
};

export const TestArray = Template.bind({});
TestArray.args = {
  name: "widget",
  auto: true,
  option: {
    type: {
      names: ["Array"]
    },
    optional: true,
    defaultvalue: "[0,1,2,3]",
    description: "description",
    name: "options.foo",
    value: null,
    section: false
  }
};

export const TestObject = Template.bind({});
TestObject.args = {
  name: "widget",
  auto: true,
  option: {
    type: {
      names: ["Object"]
    },
    optional: true,
    defaultvalue: "{}",
    description: "description",
    name: "options.foo",
    value: null,
    section: false
  }
};

export const TestNumber = Template.bind({});
TestNumber.args = {
  name: "widget",
  auto: true,
  option: {
    type: {
      names: ["Number"]
    },
    optional: true,
    defaultvalue: 123,
    description: "description",
    name: "options.foo",
    value: null,
    section: false
  }
};
