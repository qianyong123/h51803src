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
				var jian=$.cookie("products");
				if(jian){
					var shu=jian.length;
					$(".a_span").text(shu);
				}
				//头部购物数量
				$.cookie.json=true;
				var shu=$.cookie("zhanhu");
				if(shu){
					$(".head-zhanghu").html(shu);
					$(".head-zhanghu").hover(function(){
						$(".head-zhanghu").css({
							background:"#fff",
							color:"#e9546b"
						});
					},function(){					
						$(".head-zhanghu").css({
							background:"#e9546b",
							color:"#fff"
						});
					})
				};
//				console.log(shu)
		})
		$("#footer").load("/html/include/foot.html");
	});
});

