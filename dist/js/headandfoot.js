define(["jquery","cookie"],function($){
	$(function(){
		$("#head").load("/html/include/head.html",function(){
				//	var timer=0;
				$(".nav_li").mouseenter(function(){
					$(this).children(".ul1").show();
				});
				$(".nav_li").mouseleave(function(){
							$(this).children(".ul1").hide();
				});
				$(".ul1").hover(function(){
			//		clearTimeout(timer);
					$(this).show();
				});
				 $(".songdizhi").click(function(){
	            	$(".gou_dizhi").show();
	            	console.log(22)
	            });
	            $(".dizhiming").on("click","li",function(){
	            	var html=$(this).html();
	            	$("#gouwu .songdizhi").html(html);
	            	$(".gou_dizhi").hide();
	            });
	            
	            //导航下拉菜单
				$(".nav_li").hover(function(){
						$(".nav_li .xia").hide();
						$(".nav_li .shang").show();
					},function(){
						$(".nav_li .xia").show();
						$(".nav_li .shang").hide();
				});
				//读取cookie里的数量
				//头部购物数量
				$.cookie.json=true;
				var shu=$.cookie("products").lenght;
				if(shu===undefined){
					$(".a_span").text(0);
				}else				
				$(".a_span").text(shu);				
		})
		$("#footer").load("/html/include/foot.html");
	});
});

