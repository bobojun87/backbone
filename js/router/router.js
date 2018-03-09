// 定义模块
define(['backbone', 'layer/layer', 'list/list', 'collection/img'], function(Backbone, Layer, List, ImageCollection) {
	// 创建集合
	var ic = new ImageCollection();
	// 创建视图实例化对象
	var layer = new Layer({
		el: '#ickt',
		// 绑定集合
		collection: ic
	})
	var list = new List({
		el: '#ickt',
		collection: ic
	})
	// 第一步 拓展路由类
	var Router = Backbone.Router.extend({
		// 定义规则
		routes: {
			// 'demo/page': 'showList',
			// 'test/:id': 'showLayer',
			// // 默认路由
			// '*other': 'showList'
			// 大图页
			'layer/:id': 'showLayer',
			// 列表页
			'*other': 'showList'
		},
		showList: function() {
			// 渲染列表页
			// list.renderView();
			// 进入列表页，显示列表页，隐藏大图页
			list.$('.list').show()
			list.$('.layer').hide()
		},
		showLayer: function(id) {
			// 渲染大图页
			layer.render(id);
			// 进入大图页，显示大图页，隐藏列表页
			layer.$('.list').hide();
			layer.$('.layer').show();
		}
	})
	// 第二步 实例化路由
	var router = new Router();
	// 第三步 启动路由
	// Backbone.history.start()
	// 我们可以将启动路由，放在接口中，那么当需要的时候，再启动路由
	return function() {
		Backbone.history.start()
	}
})