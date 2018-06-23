define(["jquery"],function(){
	$(function(){
		$("#head").load("/html/include/head.html",function(){
				//	var timer=0;
			$(".nav_li").mouseenter(function(){
				$(this).children(".ul1").show();
			});
			$(".nav_li").mouseleave(function(){
		//		timer = setTimeout(()=>{
		//				$(this).children(".ul1").hide();
		//			}, 300);
						$(this).children(".ul1").hide();
			});
			$(".ul1").hover(function(){
		//		clearTimeout(timer);
				$(this).show();
			});
		})
		$("#footer").load("/html/include/foot.html");
	});
});

