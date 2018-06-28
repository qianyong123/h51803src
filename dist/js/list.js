require(["config"],function(){
	require(["jquery","zoom","load","cookie"],function($){
		$(function(){
			// 放大镜
			$(".zoom").elevateZoom({
				gallery:'gallery_01', 
				cursor: 'pointer', 
				zoomWindowWidth:450,
				zoomWindowHeight:450,
				galleryActiveClass: "active"});
			});
			//二维码
			var timer=0;
			$(".saoma").hover(function(){
				$(".erweima").show();
			},function(){
					$(".erweima").hide();		
			});
			
//			$(".erweima").hover(function(){
//				$(this).show();
//				console.log(11);
//			},function(){
//				$(this).hide();
//			});
			//点击切换重量信息
			$(".specific").on("click",".bang",function(){
				const id=$(this).data("id");
				$(this).addClass("bang-clolr").siblings().removeClass("bang-clolr");
				//重量
				const qq=$(this).parents(".list-right").find(".uls").children("ul").eq(id)
						.show().siblings().hide();
						//价格
				$(this).parents(".list-right").find(".qian").children(".jiage").eq(id)
						.show().siblings(".jiage").hide();						
			});
			//点击加减商品数量
			$(".shuliang").on("click",".shu-cn,.shu-en",function(){
				var val=$(".amouct").val();
				if($(this).is(".shu-cn")){
					if(val<=1)
					return;
					val--;
				}
				if($(this).is(".shu-en")){
					val++;
				}
				$(".amouct").val(val);
			});
			//加入购物车		
			$(".arrt").click(function(){
				 
				const id=$(this).parents(".list-right").find(".bang-clolr").data("id");
				const dex={
					img:$(this).parents(".list-contenr").find("#img").attr("src"),
					amout:Number($(this).parents(".list-right").find(".amouct").val()),
					zhong:$(this).parents(".list-right").find(".bang-clolr").text(),
					id:11,
					name:$(this).parents(".list-right").find(".cn").text(),
					names:$(this).parents(".list-right").find(".en").text(),
					zensong:$(this).parents(".list-right").find(".uls").children("ul")
							.eq(id).find(".zensong").text(),
					jiange:Number($(this).parents(".list-right").find(".qian")
								.children(".jiage").eq(id).text()),
					attr:Number($(this).parents(".list-right").find(".qian")
								.children(".jiage").eq(id).text())
				};
				
					$.cookie.json=true;
					const products=$.cookie("products")||[];
					const index=exist(dex.id,products);
					if(index===-1){
						products.push(dex);
					}else{
						products[index].amout++;
					}
					$.cookie("products",products,{exipires:7,path:"/"});
//					console.log(products)
					//显示遮板
					$(".zheban").show();
					//点击在逛逛隐藏板
					$(".zheban").on("click",".btn1",function(){				
						$(".zheban").css({
							display:"none"
						});
					});				
			});
			// 判断某 id 商品在数组中是否存在，
				// 存在则返回其在数组中的下标，-1表示不存在
				function exist(id, array) {
					for (let i = 0, len = array.length; i < len; i++) {
						if (array[i].id == id)
							return i;
					}
					return -1;
				}
//			console.log(products)
	});
});
