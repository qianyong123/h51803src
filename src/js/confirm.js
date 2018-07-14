require(["config"],function(){
	require(["jquery","template","laydate","cookie","load"],function($,template,laydate){
		$(function(){
				$.cookie.json=true;
				var products=$.cookie("cart");
				//判断是否有商品
				// if(products.length===0){
				// 	$(".list-kong").show();	//没有隐藏显示为空		
				// }else{
				// 	$(".list-kong").hide();
				// }
				// console.log(products);
				//渲染购物车模板
				const html=template("list-cotent",{products});
				$(".list-contenr").html(html);
//				console.log(products);
				//总价
				var arr=0;
				 const prod=$(".list-ul");	
					prod.each(function(index,element){
						arr+=Number($(element).find(".li5").text());
					});
				$(".zongjia").text(arr.toFixed(2));		
			//地址模态框
				$("#zenjia").click(function(){
					$(".popups").show();
					$(".confirm-zheban").show();
					//清空模态框的信息
					$(".input-name").val(null);
					$(".select-Province").val("-1");
					$(".input-dizhi").val(null);
					$(".input-haoma").val(null);
					$(".input-dianhua").val(null);
				});
				//取消地址模态框
				$("#btn-cancel").click(function(){
					$(".popups").hide();
					$(".confirm-zheban").hide();
					
				});
				
				//显示地址信息
				function loaddizhi(){
					var prod=$.cookie("prod");
					if(prod){
						$(".pei-span1").text(prod.name);
						$(".pei-span2").text(prod.province);
						$(".pei-span3").text(prod.city);
						$(".pei-span4").text(prod.ext);
						$(".pei-span5").text(prod.dizhi);
						$(".pei-span6").text(prod.haoma);
						$(".pei-span7").text(prod.dianhua);
						//cookie里面有数据是显示默认和编辑
						
						$(".pei-span8").show();
						$(".pei-span9").show();
					}
					
				};
				loaddizhi();
				
				//点击编辑地址后保存
				$(".pei-span9").click(function(){
						//显示遮板和模态框
						$(".popups").show();
						$(".confirm-zheban").show();
						//获取页面地址的信息
						var name=$(".pei-span1").text(),
							province=$(".pei-span2").text(),
							city=$(".pei-span3").text(),
							ext=$(".pei-span4").text(),
							dizhi=$(".pei-span5").text(),
							haoma=$(".pei-span6").text(),
							dianhua=$(".pei-span7").text();
						//把获取的信息添加到模态框里
						$(".input-name").val(name),	
						$(".select-Province option:selected").text(province),
						$(".select-city option:selected").text(city),
						$(".select-ext option:selected").text(ext),
						$(".input-dizhi").val(dizhi),
						$(".input-haoma").val(haoma),
						$(".input-dianhua").val(dianhua);
										
				});
				
				//点击确认后把信息添加到地址栏
				$("#btn-confirm").click(function(){
					//显示填写的地址
					var name=$(".input-name").val(),	
						province=$(".select-Province option:selected").text(),
						city=$(".select-city option:selected").text(),
						ext=$(".select-ext option:selected").text(),
						dizhi=$(".input-dizhi").val(),
						haoma=$(".input-haoma").val(),
						dianhua=$(".input-dianhua").val();
						$(".popups").hide();
						$(".confirm-zheban").hide();
//						console.log(name,province,city,ext,dizhi,haoma,dianhua);											
					let prod={
						name:name,
						province:province,
						city:city,
						ext:ext,
						dizhi:dizhi,
						haoma:haoma,
						dianhua:dianhua
					};
					//存cookie
					$.cookie("prod",prod,{expires:7,path:"/"});
					loaddizhi();
				});
				
				//显示时间
				$(".times").click(function(e){
				 e.stopImmediatePropagation();
					$(".time-shijian").toggle();
				});
				//把选好的时间添加到进去
				$(".time-shijian").on("click","li",function(e){
					 e.stopImmediatePropagation();
					var val=$(this).text();
					$(".time-span1").text(val);
					$(".time-shijian").toggle();
				});
				//点击任意地方关闭掉时间盒子
				$(document).click(function () { 
					$(".time-shijian").hide();
					// console.log(11)
				 });
				//时间的插件
				laydate.render({
					  elem: '#shijian' //指定元素
					});
		});	
		//加载地址
		$(function(){
					
					//加载省份
				function loadProvince(){
					const url1 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&level=1&page=1",
					      url2 = "http://route.showapi.com/1149-1?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&level=1&page=2";
					  $.when($.ajax(url1,{dataType:"json"}),$.ajax(url2,{dataType:"json"}))
					  		.then(function(data1,data2){
					  			//html字符串
					  			let html=`<option value='-1'>请选择省份</option>`;
					  			//将省份数据遍历，加载到option中
					  			// console.log(data1,data2);
					  			data1[0].showapi_res_body.data.concat(data2[0].showapi_res_body.data)
					  					.forEach(function(curr){
					  						html+= `<option value="${curr.id}">${curr.areaName}</option>`;
					  					});
					  					//显示省份信息
					  					$(".select-Province").html(html);
					  		});
				};
				
				//加载城市
				function loadcity(){
					const prov_id=$(".select-Province").val();
					// 根据省份id查询城市信息
					const _url = `http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&parentId=${prov_id}`;
					$.getJSON(_url,function(data){
						let html=`<option value='-1'>请选择城市</option>`;
						//将城市数据遍历，加载到option中
						data.showapi_res_body.data.forEach(function(curr){
								html += `<option value="${curr.id}">${curr.areaName}</option>`;
							});
							//显示城市信息
							$(".select-city").html(html);
					});
				};
				
				//加载区县
				function loadDistrict(){
					const city_id=$(".select-city").val();
					//根据城市id查找区县
					const _url = `http://route.showapi.com/1149-2?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&parentId=${city_id}`;
					$.getJSON(_url,function(data){
						let html=`<option value='-1'>请选择区县</option>`;			
						//将区县数据遍历，加载到option中
						data.showapi_res_body.data.forEach(function(curr){
								html += `<option value="${curr.id}">${curr.areaName}</option>`;
							});
							$(".select-ext").html(html);
					});
				}
				
				loadProvince();
				//当省份发生改变是，加载城市
				$(".select-Province").on("change",loadcity);
				//当城市发生改变时，加载区县
				$(".select-city").on("change",loadDistrict);
				
				
		});
	});
});
