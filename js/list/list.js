define(['backbone', 'underscore', 'zepto', 'zepto.touch', 'css!./list.css'], function(Backbone, _, $) {
	return Backbone.View.extend({
		// 绑定事件
		events: {
			// 点击搜索按钮
			'tap .search span': 'showSearchResult',
			// 点击分类按钮
			'tap .nav li': 'showTypeResult',
			// 点击返回顶部按钮
			'tap .go-top': 'goTop'
		},
		// 定义模板
		tpl: _.template('<a href="<%=href%>"><img style="<%=style%>" src="<%=src%>" alt=""></a>'),
		// 定义左右两边容器的高度
		leftHeight: 0,
		rightHeight: 0,
		// 构造函数
		initialize: function() {
			// 初始化DOM
			this.initDOM()
			// 监听集合事件
			this.listenTo(this.collection, 'add', function(model, collection, options) {
				// 作用域是视图实例化对象
				// 渲染数据
				this.render(model)
			})
			// 拉取集合数据
			this.getData()
			// 绑定事件
			this.bindEvents()
		},
		// 绑定窗口事件
		bindEvents: function() {
			var me = this;
			// 定义节流器
			var fn = _.throttle(function() {
				me.getData();
			}, 1000)
			// 绑定滚动事件
			$(window).on('scroll', function() {
				// 距离顶部500像素，显示返回顶部按钮，否则隐藏
				if ($(window).scrollTop() > 500) {
					this.$('.go-top').show()
				} else {
					this.$('.go-top').hide()
				}
				// bh < wh + sh + bth
				if ($('body').height() < $(window).height() + $(window).scrollTop() + 200) {
					// 加载数据，就是执行getData方法
					// me.getData();
					// 执行节流器函数
					fn()
				}
			})
		},
		goTop: function() {
			// $(window).scrollTop(0)
			window.scrollTo(0, 0);
		},
		// 定义拉取数据的方法
		getData: function() {
			this.collection.fetchData();
		},
		initDOM: function() {
			// 左视图容器
			this.leftDOM = this.$('.list-container .left-container')
			// 右视图容器
			this.rightDOM = this.$('.list-container .right-container')
		},
		// 渲染视图
		render: function(model) {
			// 1 获取容器
			// 2 获取数据
			var height = model.get('viewHeight');
			var data = {
				src: model.get('url'),
				href: '#layer/' + model.get('id'),
				style: 'width: ' + model.get('viewWidth') + 'px; height: ' + height + 'px;'
			}
			// 3 获取模板
			// 4 格式化模板
			var html = this.tpl(data)
			// 5 渲染视图
			// 如果左边高度小于等于右边的高度，应该渲染左边
			if (this.leftHeight <= this.rightHeight) {
				this.renderLeft(html, height)
			// 否则渲染右边
			} else {
				this.renderRight(html, height)
			}
		},
		/**
		 * 渲染左容器
		 * @html 	渲染的内容
		 * @height 	图片的高度
		 **/ 
		renderLeft: function(html, height) {
			// 渲染内容
			this.leftDOM.append(html)
			// 存储高度
			this.leftHeight += height + 6;
		},
		/**
		 * 渲染右容器
		 * @html 	渲染的内容
		 * @height 	渲染的高度
		 ***/ 
		renderRight: function(html, height) {
			// 渲染内容
			this.rightDOM.append(html)
			// 存储高度
			this.rightHeight += height + 6;
		},
		// 获取搜索框的内容
		searchValue: function(val) {
			// 如果有val，我们设置value
			if (val) {
				this.$('.search input').val(val)
			} else {
				// 如果没有val， 我们返回value
				return this.$('.search input').val()
			}
			
		},
		// 检测value是否合法
		checkValueInvalid: function(value) {
			// 全是空白符，或者什么也没有输入，不合法
			return /^\s*$/.test(value)
		},
		// 去除首尾空白符
		trim: function(val) {
			return val.replace(/^\s+|\s+$/g, '')
		},
		// 过滤集合
		collectionFilter: function(value) {
			return this.collection.filter(function(model, index, models) {
				// 过滤标题
				return model.get('title').indexOf(value) >= 0;
			}) 
		},
		// 清空视图
		clearView: function() {
			// 清空内容
			this.leftDOM.html('')
			this.rightDOM.html('')
			// 清空高度
			this.leftHeight = 0;
			this.rightHeight = 0;
		},
		// 渲染结果
		renderAll: function(result) {
			var me = this;
			// 遍历并渲染
			result.forEach(function(model, index) {
				// 渲染每一个成员
				me.render(model)
			})
		},
		// 搜索图片
		showSearchResult: function() {
			// 1 为搜一搜按钮绑定tap事件
			// 2 获取搜索框的内容
			var val = this.searchValue()
			// 3 检测搜索框内容的合法性
			if (this.checkValueInvalid(val)) {
				// 不合法：提示用户，阻止搜索
				alert('输入的内容不合法')
				return ;
			}
			// 合法：进行搜索
			// 4 去除首尾空白符
			val = this.trim(val)
			// 5 过滤集合
			var result = this.collectionFilter(val)
			// 6 清空视图
			this.clearView()
			// 7 渲染结果
			this.renderAll(result)
			// 8 清空输入框
			this.searchValue('')
		},
		// 对集合分组，返回参数类型的分组结果
		collectionGroupBy: function(type) {
			// 分组
			// return this.collection.groupBy(function(model, index, models) {
			// 	// 根据type字段分组
			// 	return model.get('type')
			// // groupBy返回分组对象，每一个key代表一个类型，我们要获取type类型的
			// })[type]
			// 更简便的方法
			return this.collection.groupBy('type')[type]
		},
		// 点击分类按钮，显示分类的结果
		showTypeResult: function(e) {
			// 获取类型
			// var type = this.$(e.target).attr('data-type');
			// 第二种
			var type = this.$(e.target).data('type');
			// 集合分组
			var result = this.collectionGroupBy(type);
			// 清空视图
			this.clearView()
			// 渲染结果
			this.renderAll(result)
		}
	})
})