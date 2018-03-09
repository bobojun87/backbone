
# 移动端的图片网站
===============================

### 技术架构
Backbone，Underscore，zepto， zepto.touch, 模块化（amd：requirejs, cmd: seajs）,加载css的插件（预加载插件:seajs-css.js, seajs-preloader.js）

### seajs配置

```js
	// 预加载文件的时候无法解析依赖，所以需要在script标签引入
	<script type="text/javascript" src="js/lib/sea.js"></script>
	<script type="text/javascript" src="js/lib/seajs-css.js"></script>
	<script type="text/javascript" src="js/lib/seajs-preload.js"></script>
	<script type="text/javascript" src="js/lib/underscore.js"></script>
	<script type="text/javascript" src="js/lib/zepto.js"></script>
	<script type="text/javascript" src="js/lib/zepto.touch.js"></script>
	<!-- <script type="text/javascript" src="js/lib/backbone.js"></script> -->
	seajs.config({
		base: '/js/',
		//  预加载
		// preload: ['lib/underscore', 'lib/zepto', 'lib/zepto.touch', 'lib/backbone'],
		preload: ['lib/backbone'],
		debug: true
	})
	seajs.use('bootstrap')
```
### requirejs配置

```js
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
		baseUrl: '/js/'
	})
	
	// 希望可以将backbone，underscore， zepto，zepto.touch作为模块来使用
	require(['backbone', 'underscore', 'zepto', 'zepto.touch', 'css!reset.css'], 	function(B, U, Z, ZT) {
			console.log(B, U, Z, ZT)
	})
````	

### 目录架构
* data：所有异步接口
* img：所有图片文件
* js：所有脚本文件
* collection：所有集合模块
* model: 所有模型模块
* lib：所有库文件
* list：列表页
* layer：大图页
* route：路由模块
* boostrap,js 入口文件
* reset.css 重置样式
* index.html 项目入口文件
* app.js 服务器文件

### 图片模型

1. 图片等比例缩放
 图片原始宽度 ow， 图片原始高度 oh
 图片缩放宽度 sw， 图片缩放高度 sh
 图片等比例缩放，所以满足的关系
 ow / oh = sw / sh
 已知的图片原始宽度 ow，图片原始高度 oh，还知道视口宽度，所以图片缩放的宽度就已知了
 视图宽度 w， 图片边距 m
 sw = (w - m * 3) / 2
 所以未知量：图片缩放的高度sh
 sh = sw * oh / ow = (w - m * 3) / 2 * oh / ow
