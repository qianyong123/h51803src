require(["config"],function(){
	require(["jquery","cookie","load"],function($){
		//阻止body里a标签的默认行为
		$("#footer").on("click","a",function(e){
					 e.preventDefault();
			});
		//手机号码的输入验证
		$("#page_register").on("blur","#haoma",function(){
			const val=$("#haoma").val();		
				if(!/^1\d{10}$/.test(val)){
					$(".cuowu").show();
				}else{
					$(".cuowu").hide();
				}			
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
		//把账号密码存到cookie里面
		$("#btn-zhuche").click(function(){
			const username=$("#haoma").val(),
				  password=$("#password").val();
			if(/^1\d{10}$/.test(username)&&/^[a-zA-Z]\w{5,17}$/.test(password)){
					$.cookie.json=true;
					$.cookie("username",username,{expires:7,paht:"/"});
					$.cookie("password",password,{expires:7,paht:"/"});
//					$(".pp-chengong").show();
					window.location.href="/html/login.html";
			}						
//			console.log(username,password)
//			console.log(22)
		});
		
	})
});