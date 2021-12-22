const path = require('path');
const port = process.env.port || process.env.npm_config_port || 4567; // dev port

const resolve = (dir) => {
	return path.join(__dirname, dir);
};

module.exports = {
	devServer: {
		port,
		open: true,
		proxy: {
			'/api': {
				target: 'http://localhost:7001',
				changeOrigin: true,
				pathRewrite: {
					'/api': '/',
				},
			},
		},
	},

	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: [resolve('./src/styles/_mixins.scss'), resolve('./src/styles/_variables.scss')],
		},
	},
	chainWebpack(config) {
		config.module.rule('svg').exclude.add(resolve('src/icons')).end();
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]',
			})
			.end();
	},
};
