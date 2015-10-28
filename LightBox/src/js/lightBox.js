(function($) {

	var doc = document,
		body = doc.body,
		$mask, $view, instance,$lightboxPic,$loadingPic,$lightboxPicArea,$caption,
		maxWidth = window.innerWidth * 0.9 - 20,
		maxHeight = window.innerHeight * 0.9 - 20;

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
			this.bindEvent();
		}
	};

	LightBox.prototype = {
		constructor: LightBox,
		isNew: true,
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

			if(!this.isNew) {return;}

			var view = '<div id="lightbox_view">' +
						'<div class="lightbox_pic_area">' +
							'<img class="lightbox_loading" src="./image/icon/loading.gif" alt="">' +
							'<img class="lightbox_pic" src alt="">' +
							'<span class="lightbox_arrow lightbox_prev_arrow" title="上一张"></span>' +
							'<span class="lightbox_arrow lightbox_next_arrow" title="下一张"></span>' +
						'</div>' +
						'<div class="lightbox_caption_area">' +
							'<div class="lightbox_caption">' +
								'<p class="lightbpx_pic_desc"></p>' +
								'<span class="lightbox_pic_idx"></span>' +
							'</div>' +
						'</div>' +
						'<i class="lightbox_close" title="关闭"></i>' +
					'</div>',
				fragment = doc.createDocumentFragment();

			$view = $(view);
			$mask = $('<div id="lightbox_mask"></div>');
			$lightboxPic = $view.find('.lightbox_pic');
			$loadingPic = $view.find('.lightbox_loading');
			$lightboxPicArea = $view.children('.lightbox_pic_area');
			$caption = $view.find('.lightbox_caption');

			fragment.appendChild($mask[0]);
			fragment.appendChild($view[0]);
			body.appendChild(fragment);
			this.isNew = false;
		},
		// 加载图片
		loadImg: function(ev) {
			var target = ev.target || ev.srcElement,
				src = target.dataset.src,
				newImg = new Image(),
				that = this;
			newImg.src = src;
			newImg.onload = function() {
				that.showImg(target, newImg);
			};

			$mask.show();
			$view.show();
		},
		// 点击小图后，显示大图的事件处理
		showImg: function(target, img) {

			var	dataset = target.dataset,
				group = this.group,
				groupName = dataset.group,
				index, 						// 点击的图片在该组的下标
				caption = dataset.caption,	// 点击图片的caption
				len;						// 点击的图片所在组的长度

			var width = img.width > maxWidth ? maxWidth : img.width,
				height = img.height > maxHeight ? maxHeight : img.height;

			// 如果不存在这样的组别，就添加到group上去，调用可以不用多次查找dom
			if(!group[groupName]) {
				group[groupName] = $('.lightbox_img[data-role=lightbox][data-group=' + groupName +']');
			}

			index = group[groupName].index(target) + 1;
			len = group[groupName].length;

			$loadingPic.addClass('hide');

			// 渐变显示图片的大小
			$lightboxPicArea.animate({
				'width'	: width + 'px',
				'height' : height + 'px'
			}, 500, 'linear', function() {

				$lightboxPic
					.attr('src', img.src)
					.css({
						'width': width + 'px',
						'height' : height + 'px'
					})
					.show()
					.removeClass('hide');
			});

			// 显示caption
			$caption.children('p').html(caption);
			$caption.children('span').html(index + '  of  ' + len);

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
			// window.console.log(this.group);
		},
		// 显示loading图片
		showLoading: function() {
			$lightboxPic.addClass('hide');
			$loadingPic.removeClass('hide');
		},
		bindEvent: function() {
			var options = this.options,
				boxes = $(options.boxes);

			for(var i = 0, len = boxes.length; i < len; i++) {

				boxes[i].on('click', '.lightbox_img[data-role=lightbox]', this.proxyEvent(this, this.loadImg));
			}

			// 为关闭按钮和mask层绑定事件
			$mask.add($view.find('.lightbox_close')).on('click', function() {

				$mask.hide();
				$view.hide();
				$lightboxPic.addClass('hide');
				$loadingPic.removeClass('hide');
			});

			// 阻止冒泡
			return false;
		}
	};

	// 暴露给外面方法的初始化方法
	function init(options) {
		return instance ? instance : new LightBox(options);
	}

	window.init = init;

})(jQuery);