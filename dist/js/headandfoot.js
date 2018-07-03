define(["jquery","template","cookie"],function($,template){
	$(function(){
		$("#head").load("/html/include/head.html",function(){
				//	var timer=0;
				//导航的图标
				$(".nav_li").mouseenter(function(){
					$(this).children(".head-caidan").show();
				});
				$(".nav_li").mouseleave(function(){
						$(this).children(".head-caidan").hide();
				});
				//显示下拉菜单
				$(".head-caidan").hover(function(){
			//		clearTimeout(timer);
					$(this).show();
				});
				//送货地址
				 $(".songdizhi").click(function(){
	            	$(".gou_dizhi").show();
	            	console.log(22)
	            });
	            $(".dizhiming").on("click","li",function(){
	            	var html=$(this).html();
	            	$("#gouwu .songdizhi").html(html);
	            	$(".gou_dizhi").hide();
	            });
	            
	            //点击账户显示列表
	            $(".head-zhanghu").click(function(){	            	
	            	$(".head-geren").toggle();
	            });
	            
	            //显示账号		
				var zhanghu=$.cookie("zhanghu");
				if(zhanghu){
					$(".head-zhanghu").html(zhanghu);
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
				
	            //退出账户
	            $(".tuichuzhanghu").click(function(){
	            	const val=$(".head-zhanhu").text();
	            	$(".head-geren").hide();
	            	$.cookie.json=true;
	            	$.cookie("zhanghu",val,{expires:0,path:"/"});
	            	location.reload(true);
	            });
	            
	            // 账户的背景色
	            $(".head-geren").mouseover(function(){
	            	$(".head-zhanghu").css({
	            		"background":"white",
	            		"color":"#e9546b"
	            		});
	            	
	            });
	            
	            //点击下拉菜单跳转到商品列表
	            
	            $(".head-caidan a").click(function(){
	            	location="/html/detail.html";
	            });
	            //导航下拉菜单图标
				$(".nav_li").hover(function(){
						$(".nav_li .xia").hide();
						$(".nav_li .shang").show();
					},function(){
						$(".nav_li .xia").show();
						$(".nav_li .shang").hide();
				});
				//购物车里商品的件数
				function haedshu(){
					$.cookie.json=true;
					var products=$.cookie("products");						
					//头部购物数量
					if(products){	
						var shu=products.length;
						$(".a_span").text(shu);
//						console.log(products,shu)
					}
				}			
				haedshu();
				// 判断某 id 商品在数组中是否存在，
				// 存在则返回其在数组中的下标，-1表示不存在
				function exist(id, array) {
					for (let i = 0, len = array.length; i < len; i++) {
						if (array[i].id == id)
							return i;
					}
					return -1;
				}
				//显示购物商品
				function shangping() { 
					$.cookie.json=true;
					var products=$.cookie("products");	
					if(products){
						const html=template("head-contenr",{products});
						$("#shangping").html(html);
						
						//删除商品
						
						$("#shangping").on("click","#li5-shanchu",function(){
							const id=$(this).parents(".head-ul").data("id");
							$(this).parents(".head-ul").remove();
							const index=exist(id,products);
							products.splice(index,1);
							$.cookie("products",products,{expires:7,path:"/"});	
							if(products.length===0){
								$("#shangping #search").hide();
								$(".a_span").text(0);
							}
							haedshu();
							
						});
					
					//隐藏多余购物车的div
					const se=$("#shangping #search").last().show();
//					console.log(se);
					
						}
				 };
				shangping();
				//点击显示购物商品
				$(".gouwu-sp").click(function(){
					shangping();
					$("#shangping").toggle();
				});
								
				
		})
		$("#footer").load("/html/include/foot.html");
	});
});

