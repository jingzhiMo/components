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
			// this.createLightbox();
			this.bindEvent();
		}
	};

	LightBox.prototype = {
		constructor: LightBox,
		group: {},
		currentGroup: '',
		// 代理事件
		proxyEvent: function(that, fn) {
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

			var target = ev.target || ev.srcElement,
				dataset = target.dataset,
				group = this.group,
				groupName = target.dataset.group,
				index, 	// 点击的图片在该组的下标
				src,	// 点击图片大图的src
				caption,// 点击图片的caption
				len;	// 点击的图片所在组的长度


			// 连续点击的图片属于同一个组别
			// if(this.currentGroup === groupName) {
			// 	index = group[groupName].index(target) + 1;
			// 	len = group[groupName].length;
			// 	src = dataset.src;
			// 	caption = dataset.caption;
			// }

			// 如果不存在这样的组别，就添加到group上去，调用可以不用多次查找dom
			if(!group[groupName]) {
				group[groupName] = $('.lightbox_img[data-role=lightbox][data-group=' + groupName +']');
			}
			window.console.log(this.group);
		},
		bindEvent: function() {
			var options = this.options,
				boxes = $(options.boxes);

			for(var i = 0, len = boxes.length; i < len; i++) {

				boxes[i].on('click', '.lightbox_img[data-role=lightbox]', this.proxyEvent(this, this.showLightbox));
			}

			// 阻止冒泡
			return false;
		}
	};

	window.LightBox = LightBox;
})(jQuery);