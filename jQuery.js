//1.立即调用表达式 来解决命名空间与变量污染的问题

(function(window,undefined){
	var jQuery = function(){
		//code
	}
	window.jQuery = window.$ = jQuery;
})(window);

//Q:为什么要传递undefined?
//A:undefined也是同样的道理，其实这个undefined并不是JavaScript数据类型的undefined，而是一个普普通通的变量名。只是因为没给它传递值，它的值就是undefined，undefined并不是JavaScript的保留字。

//总结:全局变量是魔鬼, 匿名函数可以有效的保证在页面上写入JavaScript，而不会造成全局变量的污染，通过小括号，让其加载的时候立即初始化，这样就形成了一个单例模式的效果从而只会执行一次


//模拟jq类数组结构
var aQuery = function(selector) {
    //强制为对象
	if (!(this instanceof aQuery)) {
		return new aQuery(selector);
	}
	var elem = document.getElementById(/[^#].*/.exec(selector)[0]);
	this.length = 1;
	this[0] = elem;
	this.context = document;
	this.selector = selector; 
	this.get = function(num) {
		return this[num];
	}
	return this;
}

//2.jQuery中的ready与load事件
//如果document.readyState = complete的时候,可视为DOM树已经载入.不过,这个事件不太靠谱哦.

document.readyState = 'complete';

//3.jQuery多库存处理-无冲突处理. jQuery.noConflict();

//4.分离构造器
var $$ = aQuery = function(selector){
	this.selector = selector;
	return this;
}

var $$ = aQuery = function(selector){
	this.selector = selector;
	return this;
}
aQuery.fn = aQuery.prototype = {
	init:function(selector){
		this.selector = selector;
		return this;
	},
	selectorName: function(){
		return this.selector;
	},
	constructor:aQuery
}
aQuery.fn.init.prototype = aQuery.fn;