import App from '../App.vue';

export default {
  title: 'Example/App',
  component: App,
  tags: ['autodocs'],  
  parameters: {
    
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { App },
  template: '<App/>',
});

export const ByDefault = Template.bind({});
ByDefault.args = {
  name: "OpenLayers",
  source: "https://github.com/IGNF/geoportal-extensions-openlayers-samples",
  url : "https://openlayers.org",
  logo: "./assets/logo-openlayers.png"
};