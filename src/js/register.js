require(["config"],function(){
	require(["jquery","cookie","load"],function($){
		//阻止body里a标签的默认行为
		$("#footer").on("click","a",function(e){
					 e.preventDefault();
			});
	
		
		//手机号码的输入验证,账号在失去焦点是查询数据库
		$("#page_register").on("blur","#haoma",function(){
			const username=$("#haoma").val(),
				  password=$("#password").val();		
				if(!/^\w{6,16}$/.test(username)){
					$(".cuowu").show();
				}else{
					$(".cuowu").hide();
				}	
				const url="http://localhost/wamp/www/dangao/dist/php/chaxun.php";
				$.post(url,$(".reg_form").serialize(),function(data){
					console.log(data);
					if(data.code===1){
						$(".cunzai").show();
						$(".keyi").hide();
					}
					else{				
						if(/^\w{6,16}$/.test(username)){
							$(".keyi").show();
							$(".cunzai").hide();
						}						
					}
					 
				},"json");
		});
		//密码的验证
		$("#page_register").on("blur","#password,#password_chong",function(){
			if($(this).is("#password")){
				const val=$(this).val();				
					if(!/^[a-zA-Z]\w{5,17}$/.test(val))
					$(".mimacuowu").show();
					else
					$(".mimacuowu").hide();	
					
					
			}
			if($(this).is("#password_chong")){
				const pas=$("#password").val(),
				      pas2=$(this).val();
				if(pas!=pas2)
					$(".ercimima").show();
				else
					$(".ercimima").hide();
			}
		});
		//把账号密码存到数据库里面
		$("#btn-zhuche").click(function(){
			const username=$("#haoma").val(),
				  password=$("#password").val();
				  
			if(/^\w{6,17}$/.test(username)&&/^[a-zA-Z]\w{5,17}$/.test(password)){					
					//ajax请求服务端的数据
					console.log(username,password)
					const url="http://localhost/wamp/www/dangao/dist/php/register.php";
					$.post(url,$(".reg_form").serialize(),function(data){
						console.log(data)
						if(data.res_code===1){
							$(".pp-chengong").show();
						window.location.href="/html/login.html";
						}else{	
							const html=data.res_message;
							$(".shibai").html(html).show();
//							console.log(222)
						}
					},"json");
					
			}						
		});
		
		//显示遮板验证码	
		$(".huoqu-dongtai").click(function(){
			const val=$("#haoma").val();
			if(/^\w{6,16}$/.test(val)){
				$(".login-zheban").show();
				$(".yanzhengma").show();
				$(".cuowu").hide();
			}else{
				$(".cuowu").show();
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
	})
});