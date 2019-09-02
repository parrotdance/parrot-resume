const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	configureWebpack: {
		devtool: 'source-map'
	},
	productionSourceMap: false,
	chainWebpack: config => {
		config
			.when(process.env.NODE_ENV !== 'development', config => {
				config
					.plugin('uglifyJsPlugin')
					.use(UglifyJsPlugin, [{
						parallel: true,
						extractComments: true
					}])
				config.optimization.splitChunks({
					chunks: 'all',
					cacheGroups: {
						jspdf: {
							name: 'jspdf',
							test: /[\\/]node_modules[\\/]_?jspdf(.*)/
						},
						html2canvas: {
							name: 'html2canvas',
							test: /[\\/]node_modules[\\/]_?html2canvas(.*)/
						}
					}
				})
				// config
				// 	.plugin('bundleAnalyzer')
				// 	.use(BundleAnalyzerPlugin)
			})
	}
};