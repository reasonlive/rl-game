const path = require('path')
module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    
  ],
  /*webpackFinal: async(config, {configType}) => {
  	config.module.rules.push({
  		use: ['style-loader', 'css-loader'],
  		include: path.resolve(__dirname, '../')
  	})
  	return config;
  }*/
}

