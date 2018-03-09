define(['backbone', 'underscore', 'zepto', 'css!./layer.css'], function(Backbone, _, $) {
	// 返回一个视图类
	return Backbone.View.extend({
		events: {
			// 点击图片。切换header
			'tap .layer-container img': 'headerToggle',
			// 左滑
			'swipeLeft .layer-container img': 'showNextImage',
			// 右滑
			'swipeRight .layer-container img': 'showPrevImage',
			// 点击返回按钮
			'tap .layer .go-back': 'showprevPage'
		},
		tpl: _.template($('#tpl_layer').html()),
		// 当前图片模型的id
		modelId: 0,
		render: function(id) {
			// 1 获取容器 this.$('.layer')
			// 2 获取数据
			// 通过id，在集合中，获取模型
			var model = this.collection.get(id)
			// 如果模型不存在，进入列表页
			if (!model) {
				// window.location.hash = '#'
				// 还可以通过backbone管理路由
				Backbone.history.location.replace('#')
				return ;
			}
			// 存储图片的模型
			this.modelId = model.get('id');
			var data = {
				title: model.get('title'),
				src: model.get('url'),
				style: 'line-height: ' + $(window).height() + 'px;'
			}
			// 3 获取模板
			// 4 格式化
			var html = this.tpl(data);
			// console.log(html)
			// 5 渲染
			this.$('.layer').html(html)
		},
		// 切换header
		headerToggle: function() {
			// 切换显隐
			this.$('.layer .header').toggle()
		},
		// 向左滑，显示下一张图片
		showNextImage: function() {
			// 向下滑，图片id加一
			this.modelId++;
			// 获取模型
			var model = this.collection.get(this.modelId);
			// 如果模型存在，显示图片
			if (model) {
				// 显示图片。切换路由就可以
				window.location.hash = '#layer/' + this.modelId
				// Backbone.history.location.replace('#layer/' + this.modelId)
				// 还可以用模型直接修改数据
			} else {
				// 如果模型不存在，说明图片是最后一张了，提示用户，纠正id
				console.log('这已经是最后一张了')
				// 多加的，要减回来
				this.modelId--
			}
		},
		// 向右滑，显示前一张图片
		showPrevImage: function() {
			// 显示前一张图片，id减一
			this.modelId--;
			// 获取模型
			var model = this.collection.get(this.modelId)
			// 如果模型存在
			if (model) {
				// 显示图片。切换路由就可以
				window.location.hash = '#layer/' + this.modelId
				// Backbone.history.location.replace('#layer/' + this.modelId);
			} else {
				// 不存在，说明是第一张，提示用户，纠正id
				console.log('这已经是第一张了')
				this.modelId++
			}
		},
		// 显示上一个页面
		showprevPage: function() {
			window.history.go(-1)
		}
	})
})