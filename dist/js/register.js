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
					if(data.res_code===1){
						$(".cunzai").show();
						$(".keyi").hide();
					}else{				
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
			};
			
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