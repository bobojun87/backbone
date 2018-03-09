// 定义图片模型模块
define(['backbone', 'zepto'], function(Backbone, $) {
	// 获取图片缩放宽度 w - m * 3
	var width = ($(window).width() - 6 * 3) / 2;
	// 定义模型类
	var ImageModel = Backbone.Model.extend({
		// 适配数据
		initialize: function(obj) {
			// 适配数据
			// 根据原始宽高适配缩放的宽高
			// sh = sw * oh / ow = (w - m * 3) / 2 * oh / ow
			// 获取宽高有两种方式：
				// 一种是obj.width|height
				// 一种是this.attributes.width|height
			this.attributes.viewWidth = width;
			this.attributes.viewHeight = width * obj.height / obj.width; 
		}
	})
	// console.log(new ImageModel({
	// 	"title": "20张优秀的广角作品",
	// 	"url": "img/03.jpg",
	// 	"type": 3,
	// 	"width": 640,
	// 	"height": 400
	// }))

	// 为了将数据提供给集合，我们要暴露模型类
	return ImageModel
})