require(["config"],function(){
	require(["jquery","template","cookie","load"],function($,template){
		$.cookie.json=true;
		var products=$.cookie("products")||[];
		//判断是否有商品
		if(products.length===0){
			$(".list-kong").show();	//没有隐藏显示为空		
		}else{
			$(".list-kong").hide();
		}
		//渲染购物车模板
		const html=template("list-cotent",{products});
		$(".list-contenr").html(html);
		console.log(products);
		//总价
		var arr=0;
		 const prod=$(".list-ul");	
			prod.each(function(index,element){
				arr+=Number($(element).find(".li5").text());
			});
		$(".zongjia").text(arr.toFixed(2));
	});
});
