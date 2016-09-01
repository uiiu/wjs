$(function(){

	function resize(){
	/*获取屏幕的宽度*/
		var windowWidth = $(window).width();
	/*判断屏幕属于大还是小*/
	var isSmallScreen = windowWidth < 768;
	/*根据大小为界面上的每一张轮播图设置背景*/
	$("#main-ad > .carousel-inner > .item").each(function(i,item){
		var $item = $(item);
		var imgSrc = $item.data(isSmallScreen? 'image-xs' : 'image-lg')
		//大小的时候都用背景图
		$item.css("backgroundImage",'url("'+imgSrc+'")');
		//屏幕很小的时候要图片随着屏幕的缩放自动适应
		if (isSmallScreen) {
			$item.html('<img src="'+imgSrc+'" />')
			}else{
			$item.empty();
			}
		})
	}
	$(window).on('resize',resize).trigger('resize');//手动的触发一次resize方法；

	$('[data-toggle="tooltip"]').tooltip();//tooltips需要手动触发一下;

	//动态计算标签容器的宽度
	var $ulContainer = $(".nav-tabs");
	//获取所有子元素的和  遍历子元素
	var width = 30;//设置30的意思是原本ul上面有padding值；
	$ulContainer.children().each(function(index,element){
		/*console.logo(element.clientWidth);//原生的获取方法
		console.logo($(element).width());//juqery的获取方法*/

		width += element.clientWidth;
	})
	//此时的宽度是动态计算出来的
	//
	if (width > $(window).width()) {

	$ulContainer
	.css('width',width)
	.parent().css('overflow-x','scroll');
	};

	//全局变量本地化
	var $newsTitle = $('.news-title');
	$("#news .nav-pills a").on('click',function(){
		//获取当前元素
		var $this = $(this);
		//获取对应的title值
		var title = $this.data('title');
		//将title设置到相应的位置
		$newsTitle.text(title);
	})


	/*轮播图完善*/
	//获取手指在轮播图上的一个滑动方向（一般是左右）


	//手指触摸开始时候记录一下手指所在的位置
	
	//手指触摸结束时候记录一下手指所在的位置
	//
	// 做减法，大于0 左滑动
	// 做减法，小于0 右滑动
	//
	//获取界面上的轮播图容器
	var $carousels = $(".carousel");

	var startX , endX;
	var offset = 50;

	//注册滑动事件
	$carousels.on('touchstart',function(e){
		startX = e.originalEvent.touches[0].clientX;
	})

	$carousels.on('touchmove',function(e){
		endX = e.originalEvent.touches[0].clientX;
	})

	$carousels.on('touchend',function(e){
		//获取每次运动的距离
		var distance = Math.abs(endX - startX);
		if (distance>offset) {
			//控制精度 大于50再滑动
			//根据获得的方向 选择上一张 或者下一张
		$(this).carousel(startX >endX?'next':'prev');
		};
	})
})