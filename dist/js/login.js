require(["config"],function(){
	require(["jquery","cookie","load"],function($){
		//阻止默认行为
		$("#footer").on("click","a",function(e){
					 e.preventDefault();
				});
		//切换登录方式
		$(".shouji").click(function(){
			$(".page_ul").hide();
			$(".ul2").show();
			$(".shouji_denglu").hide();
			$(".yaosi_denglu").show();
		});
		$(".yaoshi").click(function(){
			$(".page_ul").show();
			$(".ul2").hide();
			$(".shouji_denglu").show();
			$(".yaosi_denglu").hide();
		});
		
		//忘记密码
		
		$("#aa").click(function(){
				$(".page_ul").show();
			$(".ul2").hide();
			$(".shouji_denglu").show();
			$(".yaosi_denglu").hide();
		});
			//读取数据库里面的数据		
			//登录验证手机登陆
		$("#btn-login").click(function(){
			const val=Number($("#haoma").val());
			const url="http://localhost/wamp/www/dangao/dist/php/chaxun.php";
			 $.post(url,$(".form1").serialize(),function(data){
			 		if(data.res_code===1){		 			
			 			$(".ul1-cuowu").hide();
						$(".ul1-chenggong").show();	
						$.cookie.json=true;
						$.cookie("zhanghu",val,{expires:7,path:"/"});
						window.location.href="/index.html";
			 		}else{
			 			$(".ul1-cuowu").show();
						$(".ul1-chenggong").hide();	
			 		}
			 		
			 },"json");
			 		
		});
		//登录验证用户名和密码
		$("#btn2").click(function(){
			const val=$("#haoma2").val();
			const url="http://localhost/wamp/www/dangao/dist/php/login.php";
			 $.post(url,$(".form2").serialize(),function(data){
			 		if(data.res_code===1){		 			
			 			$(".ul2-cuowu").hide();
//						$(".ul2-chenggong").show();	
						$.cookie.json=true;
						$.cookie("zhanghu",val,{expires,path:"/"});
						window.location.href="/index.html";
			 		}else{
			 			$(".ul2-cuowu").show();
						$(".ul2-chenggong").hide();	
			 		}
			 		console.log(data);
			 },"json");
		});
		
		//显示遮板验证码	
		$(".huoqu-dongtai").click(function(){
			const val=$("#haoma").val();
			if(/^1\d{10}$/.test(val)){
				$(".login-zheban").show();
				$(".yanzhengma").show();
				$(".geshi").hide();
			}else{
				$(".geshi").show();
			}
			
		});				
			//获取验证码的图片
			function loadCode(){
				var _url= "http://route.showapi.com/932-2?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef";
				$.ajax({
					type:"get",
					url:_url,
					dataType:"json",
					success:function(data){
						var code = data.showapi_res_body;
						//图片
						$("#gen_cod").attr("src",code.image);
						// 保存已生成的验证码标识，以便于后继校验时使用
						$(".sid").text(code.sid);
//						console.log(data,code.sid)
					}
				});
			}
			
			// 校验有效性
			$(".a-queren").click(function(){
				var _input=$("#yanma").val(),
					_sid=$(".sid").text(),
					_url= `http://route.showapi.com/932-1?showapi_appid=29550&showapi_sign=1b9802a551774e3480cb844e18f0ceef&sid=${_sid}&checkcode=${_input}`;
					 $.ajax({			  	
					  	type:"get",
					  	url:_url,
					  	dataType:"json",
					  	success:function(data){
					  		if(data.showapi_res_body.valid){
					  			$(".login-zheban").hide();
								$(".yanzhengma").hide();
					  		}else{
					  			alert("验证码输入错误")
					  		}
					  	}
				  });
//				  console.log(_input,_sid);
			});
			 
			
			
			//调用函数
			loadCode();
			//点击换一张
			$(".gen-huan").click(function(){
				loadCode();
				console.log(22)
			});
		//关闭遮板验证码
		$(".yan-xx").click(function(){
			$(".login-zheban").hide();
			$(".yanzhengma").hide();
		});
		
		//取消验证
		$(".a-quxiao").click(function(){
			$(".login-zheban").hide();
			$(".yanzhengma").hide();
		});
	});
});
