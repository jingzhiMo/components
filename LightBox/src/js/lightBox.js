(function($) {

	var doc = document,
		body = doc.body;

	/*
	 * options接收一些配置项，下面是一些配置项的解释
	 * boxes: [], 用于委托图片的上层结点，数组形式
	 */

	var LightBox = function(options) {

		if(!(this instanceof LightBox)) {

			return new LightBox(options);
		} else {

			this.options = options;
			this.createLightbox();
		}
	};

	LightBox.prototype = {
		constructor: LightBox,
		// 代理事件
		proxyEvent: function(fn, that) {
			return function() {
				return fn.apply(that, arguments);
			};
		},
		// 创建lightbox
		createLightbox: function() {
			var $mask = $('<div id="lightbox_mask"></div>'),
				view = '<div id="lightbox_view">' +
							'<div class="lightbox_pic_area">' +
								'<img class="lightbox_pic" src="./image/1.png" alt="">' +
								'<span class="lightbox_arrow lightbox_prev_arrow" title="上一张"></span>' +
								'<span class="lightbox_arrow lightbox_next_arrow" title="下一张"></span>' +
							'</div>' +
							'<div class="lightbox_caption_area">' +
								'<div class="lightbox_caption">' +
									'<p class="lightbpx_pic_desc">图片的标题什么的</p>' +
									'<span class="lightbox_pic_idx">1 of 4</span>' +
								'</div>' +
							'</div>' +
							'<i class="lightbox_close" title="关闭"></i>' +
						'</div>',
				$view = $(view),
				fragment = doc.createDocumentFragment();
			fragment.appendChild($mask[0]);
			fragment.appendChild($view[0]);
			body.appendChild(fragment);

		},
		// 点击小图后，显示大图的事件处理
		showLightbox: function(ev) { 

		},
		bindEvent: function() {
			var options = this.options,
				boxes = options.boxes;

			for(var i = 0, len = boxes.length; i < len; i++) {

				boxes[i].on('click', '.lightbox_img', this.proxyEvent(this, this.showLightbox));
			}
		}
	};

	// if(module) { 
	// 	module.exports.LightBox = LightBox;
	// } else {
	// 	window.LightBox = LightBox;
	// }
	// module.exports ? module.exports.LightBox = LightBox : window.LightBox = LightBox;
	window.LightBox = LightBox;
})(jQuery);