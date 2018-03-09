// 定义配置
requirejs.config({
	// 为了简化backbone，underscore的引入
	// 将lib/backbone => backbone   将lib/underscore => underscore
	paths: {
		'backbone': 'lib/backbone',
		'underscore': 'lib/underscore',
		'zepto': 'lib/zepto',
		'zepto.touch': 'lib/zepto.touch'
	},
	// 将文件模块化
	shim: {
		'zepto': {
			// 没有依赖，需要暴露接口
			exports: 'Zepto'
		},
		'zepto.touch': {
			// 依赖zepto
			deps: ['zepto'],
			// 暴露接口
			exports: 'Zepto'
		}
	},
	// 配置css插件
	map: {
		'*': {
			'css': 'lib/css'
		}
	},
	// 根目录
	// baseUrl: './js/'
})





// 我们希望可以将backbone，underscore， zepto，zepto.touch作为模块来使用
require(['router/router', 'css!reset.css'], function(rotuer) {
	// 随时启动
	rotuer()
})