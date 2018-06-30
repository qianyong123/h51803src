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
