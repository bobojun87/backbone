// 定义图片集合
define(['backbone', 'zepto', 'model/img'], function(Backbone, $, ImageModel) {
	// 创建集合
	var ImageCollection = Backbone.Collection.extend({
		// 指定集合的模型类
		model: ImageModel,
		// 第一步 定义url
		url: 'data/imageList.json',
		// 内部维护id
		dataID: 0,
		// 定义拉取数据的方法
		fetchData: function() {
			var me = this;
			$.get(this.url, function(res) {
				// 对res.data随机排序
				res.data.sort(function(a, b) {
					// 随机一个正负数
					return Math.random() < .5 ? 1 : -1;
				})				
				// 为每一个模型，设置一个有序，可控的id，就是为其设置idAttribute值属性
				// 遍历res的data属性，设置id
				res.data.forEach(function(item) {
					item.id = ++me.dataID;
				})
				// 将数据添加给集合
				me.add(res.data)
				// console.log(me.toJSON())
			})
		}
	})
	// 测试 实例化，拉取数据
	// var ic = new ImageCollection();
	// ic.fetchData()
	// 暴露集合实例化对象接口
	return ImageCollection
})