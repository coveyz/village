import { createApp, DefineComponent } from "vue";

const requireCompnents = require.context('../components/', true, /[a-z0-9]+\.(jsx?|vue)$/i);

const components: Record<string, DefineComponent> = {}

requireCompnents.keys().forEach(fileName => {
  const componentConfig = requireCompnents(fileName)
  console.log('file=>', fileName)
  console.log('componentConfig=>', componentConfig)
  const componentName = fileName.substr(fileName.lastIndexOf('/') + 1).replace(/\.\w+$/, '');
  console.log('componentName=>', componentName)

  components[fileName.split('/')[1]] = componentConfig.default
})

export default components