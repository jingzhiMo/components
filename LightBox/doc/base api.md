## lightbox的jquery插件
lightbox 插件，是基于jquery的插件，由于其中用到一些css3的东西，例如`transform`，所以最好跑在IE9+的浏览器当中，或许后面的完善当中，会支持低版本浏览器；

通过引用`lightBox.js`即可，`./dist/js/lightBox.min.js` 是压缩版，`./src/js/lightBox.js`是有注释的开发版

该文件暴露一个对象给外部调用，对象一共有以下方法：

####  init(options)

首先需要初始化，传入一个配置对象，现在(0.0.1版本)只有一个属性：

    options: {
        boxs: []
    }

boxes是一个数组，里面的元素是需要处理小图片点击的事件，也就是这个小图片的处理点击事件委托给这个元素；该元素是jq对象

默认值是： boxes: [$(document)];也就是委托在document结点上面，建议选小图片的容器；

如果有多个地方需要显示大图的话，可以在该数组，添加多个被委托的容器jq对象


#### getGroupByName(groupName)

通过组名，获取该组下面，所有的小图;

PS: 这些元素是在该组的小图元素其中一个被点击之后，才会有的，算是一种懒查找吧（ = =！自创名词，本来想写懒加载的）。

#### setGroupByName(groupName, group)

通过组名，设置该组的所有小图片的信息