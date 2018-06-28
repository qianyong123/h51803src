require(["config"],function(){
	require(["jquery","template","cookie","load"],function($,template){
			// 判断某 id 商品在数组中是否存在，
			// 存在则返回其在数组中的下标，-1表示不存在
			function exist(id, array) {
				for (let i = 0, len = array.length; i < len; i++) {
					if (array[i].id == id)
						return i;
				}
				return -1;
			}
		
		//鼠标放上去显示购物车图标
		$(".prat-item").hover(function(){
			$(this).find(".gouwuche").css({
				display:"block"
			});
		},function(){
			$(this).find(".gouwuche").css({
				display:"none"
			});
		});
		//读取cookie里面的数据渲染到购物车
		$.cookie.json=true;
		var products=$.cookie("products")||[];
		//判断是否有商品
		if(products.length===0){
			$(".list-contenr").show();	//没有隐藏显示为空		
		}else{
			$(".list-contenr").hide();
		}
		//渲染购物车模板
		const html=template("contenr",{products});
		$(".list-wrapper .content").html(html);
//		console.log(products);
		//加减数量
		$(".content").on("click",".jia,.jian",function(){
			const id=$(this).parents(".ul1").data("id");
			const index=exist(id,products);
			const prod=products[index];
			if($(this).is(".jia")){			
				prod.amout++;
				zongjia();
//				console.log(22,index);
			};
			if($(this).is(".jian")){
				if(prod.amout<=1){
					return;
				}
				prod.amout--;				
			};
			//存cookie
			$.cookie("products",products,{expires:7,path:"/"});
			//修改数量
			$(this).siblings("#shuliang").val(prod.amout);
			//修改小计
			$(this).parents(".ul1").find(".xiaoji").text((prod.amout*prod.jiange).toFixed(2));
			zongjia();
		});
		//修改数量
		$(".content").on("blur","#shuliang",function(){
			//获取商品的id
			const id=$(this).parents(".ul1").data("id");
			//查看之前有没有买过
			const index=exist(id,products);
			const prod=products[index];
			//获取当前数量
			const val=$(this).val();
			if(!/^[1-9]\d*$/.test(val)){
				$(this).val(prod.amout);
				return;
			}
			prod.amout=val;
			$.cookie("products",products,{expires:7,path:"/"});
			$(this).parents(".ul1").find(".xiaoji").text((prod.amout*prod.jiange).toFixed(2));
			zongjia();
		});
		//删除商品
			$(".content").on("click",".shuanchu",function(){
				const id=$(this).parents(".ul1").data("id");
				const index=exist(id,products);
				products.splice(index,1);
				$.cookie("products",products,{expires:7,path:"/"});
				$(this).parents(".ul1").remove();
				if(products.length===0){
					$(this).parents(".list-wrapper").find(".list-contenr").show();
				}else
					$(this).parents(".list-wrapper").find(".list-contenr").hide();
					zongjia();
			});
				//点击上面全选
			$(".btn-head").click(function(){
				$(this).toggleClass("h-checked");
				const head=$(".h-checked").length;
				if(head===1){
					$(".btn-li").addClass("ul1-chcked");
					$(".btn-foot").addClass("f-cheched");
				}else{
					$(".btn-li").toggleClass("ul1-chcked");
					$(".btn-foot").toggleClass("f-cheched");
				}
				zongjia();
//				console.log(head);
			});
			//点击下面全选
			$(".btn-foot").click(function(){
				$(this).toggleClass("f-cheched");
				 const head=$(".f-cheched").length;
				if(head===1){
					$(".btn-li").addClass("ul1-chcked");
					$(".btn-head").addClass("h-checked");
				}else{
					$(".btn-head").removeClass("h-checked");
					$(".btn-li").toggleClass("ul1-chcked");
				}
//				console.log(head);
				zongjia();
				
			});
			//判断是否全选
			$(".list-wrapper").on("click",".btn-li",function(){
				$(this).toggleClass("ul1-chcked");
				const len=$(".ul1-chcked").length;
				const uls=products.length;
				if(len===uls){
					$(".btn-head").addClass("h-checked");
					$(".btn-foot").addClass("f-cheched");
				}else{
					$(".btn-head").removeClass("h-checked");
					$(".btn-foot").removeClass("f-cheched");
				}
				zongjia();
//				console.log(uls,len);
			});
			//计算总价
			function zongjia(){
				var sum=0;
				var qq=$(".ul1-chcked");
				$(".ul1-chcked").each(function(index,element){
					// index 是当前遍历到的DOM元素在数组中的下标
					// element 是当前遍历到的DOM元素
					// this === element
					sum+=Number($(element).parents(".ul1").find(".xiaoji").text());					
				});
//				//显示总价
				$(".zongjia").text(sum.toFixed(2));
//				console.log(qq,sum);
		}
	});
});
