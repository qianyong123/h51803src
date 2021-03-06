require(["config"],function(){
	require(["jquery","template","swiper","load","booststrap","cookie"],function($,template,Swiper){
		$(function(){
			$(window).scroll(function () {
				var aa=$(document).scrollTop();
				// console.log(11,aa);
				if(aa>1000){
					$(".index-fanghui").show();
				}else{
					$(".index-fanghui").hide();
				}
			  });
			//模板特惠
			$.getJSON("/mock/list.json",function(data){
				const html=template("list_template", {list: data.res_body.list});
//				console.log(data);
				$(".list").html(html);
				$(".span_img:eq(0)").addClass("span_img1");
				$(".span_img:eq(1)").addClass("span_img3");
				$(".span_img:eq(3)").addClass("span_img2");
				//阻止默认行为
				$("#cont").on("click","a",function(e){
					 e.preventDefault();
				});
			});
			//关闭主页里的二维码
			$("#section_shaoma").on("click",".guanbi",function(){
				$("#section_shaoma").hide();
			});
		});
		$(function(){
				// 判断某 id 商品在数组中是否存在，
				// 存在则返回其在数组中的下标，-1表示不存在
				function exist(id, array) {
					for (let i = 0, len = array.length; i < len; i++) {
						if (array[i].id == id)
							return i;
					}
					return -1;
				}
//			阻止默认行为
				$("#content_foot").on("click","a",function(e){
						 e.preventDefault();
						});
				$("#footer").on("click","a",function(e){
					 e.preventDefault();
					});
				$(".btn1").on("click","a",function(e){
					 e.preventDefault();
					});
			//模板当季热卖
			$.getJSON("/mock/index.json",function(data){
					const html=template("content",{list:data.res_body.list});
					$("#section_content").html(html);
					//设置class类名
					$(".section_group:eq(3)").addClass("section_3");
					$(".section_group:eq(7)").addClass("section_3");
					$(".section_group:eq(11)").addClass("section_3");
//					阻止默认行为
					$(".gouwushu").on("click","a",function(e){
						 e.preventDefault();
						});
					//数量每次点击购物车都为1
					var gouwu=$(".gouwuche"),
						xx=$(".section_group #xx");//获取关闭按钮
//					console.log(gouwu,xx);
						
					//点击购物车是购物信息出来
					$(".section_group").on("click",".gouwuche",function(){
						const inde=Array.from(gouwu).indexOf(this);
						const deta=$(".img #detail").eq(inde).animate({top:0},400);	
					
					});
					//关闭购物信息
	    			$(".section_group").on("click","#xx",function(){
						const indexx=Array.from(xx).indexOf(this);
						const deta=$(".img #detail").eq(indexx).animate({top:291},400);							
//						console.log(indexx,deta);
					});
					 //购物信息里的加和减
					$(".gouwushu").on("click",".jia,.jian",function(){
						var jia=$(this).parents(".section_group").find("#attr_jia").text();
						var shu=$(this).siblings("#jiage").val();
						if($(this).is(".jia")){
							shu++;			
						}else{
							if(shu<=1)
							return;
							shu--;	
						}
							$(this).siblings("#jiage").val(shu);
							var qq=shu*jia;
							$(this).parents(".gouwushu").find(".bb").text(qq);
//						console.log(jia,shu)
					});
					//购物信息里的重量
					$(".detail_bottom").on("click",".zhong",function(){	
						var id=$(this).data("id");
						$(this).addClass("span_bcg").siblings().removeClass("span_bcg");
						$(this).parents(".detail_bottom").children(".uls")
								.children("ul").eq(id).show().siblings().hide();
//						console.log(id)
					});
					//点击加入购物车
					$(".section_group").on("click",".cart",function(){
						//获取当前重量的id
						var dex=$(this).parents(".section_group").find(".span_bcg").data("id");
						//获取当前购物的信息
						const currprod={
								id:$(this).parents(".section_group").data("id"),
								img:$(this).parents(".section_group").find("#list_img").attr("src"),
								name:$(this).parents(".section_group").find(".name_en").text(),
								names:$(this).parents(".section_group").find(".name_cn").text(),
								zensong:$(this).parents(".section_group").find(".zensong").eq(dex).text(),
								zhong:$(this).parents(".section_group").find(".span_bcg").text(),
								jiange:Number($(this).parents(".section_group").find("#attr_jia").text()),
								attr:$(this).parents(".section_group").find(".attr").text().slice(0,8),
								amout:Number($(this).parents(".section_group").find("#jiage").val())
						};
						// cookie插件配置
						$.cookie.json=true;
						//读取cookie里的数据,如果没有就创建一个空数组
						var products=$.cookie("products")||[];
						//判断当前商品是否购买过
						var index=exist(currprod.id,products);
						if(index===-1){
							products.push(currprod);
						}else{
							products[index].amout=(products[index].amout)+(currprod.amout);
						}
						//把当前商品存到cookie
						$.cookie("products",products,{expires:7,path:"/"});
						//点击键入购物车遮板显示出来
						$(".zheban").show();
						$(".popup-result").show();
						function haedshu(){
							$.cookie.json=true;
							var products=$.cookie("products");						
							//头部购物数量
							if(products){	
									var shu=products.length;
									$(".a_span").text(shu);
//									console.log(products,shu)
								}
						}
				
						haedshu();
					});
					//点击在逛逛
					$(".popups").on("click",".btn1",function(){				
						$(".popups").hide();
						$(".zheban").hide();
					});	
					//点击提拉米苏跳转到list页面
					var list=$(".section_group").eq(0).find(".list-img");	
					// console.log(list);	
					list.click(function(){
						location="/html/list.html";
					});
			});
			//轮播图
			var myswiper=new Swiper(".swiper-container",{
				loop:true,
				autoplay:true,
				effect : 'slide',
				// setWrapperSize :true,//自动轮播
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
					el : ".swiper-pagination",
					clickable :true,
					// type:"custom"
				}
			});
			
			// s
		});
	});
});
