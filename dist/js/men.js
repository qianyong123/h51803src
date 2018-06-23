require(["config"],function(){
	require(["jquery","template","load","booststrap"],function($,template){
		$(function(){
			//模板特惠
			$.getJSON("/mock/list.json",function(data){
				const html=template("list_template", {list: data.res_body.list});
//				console.log(data);
				$(".list").html(html);
				$(".span_img:eq(0)").addClass("span_img1");
				$(".span_img:eq(1)").addClass("span_img3");
				$(".span_img:eq(3)").addClass("span_img2");
				$("body").on("click","a",function(e){
					 e.preventDefault();
				});
			});
			//关闭主页里的二维码
			$("#section_shaoma").on("click",".guanbi",function(){
				$("#section_shaoma").hide();
			});
//			alert("hhjjjj");
		});
		$(function(){
				//模板当季热卖
			$.getJSON("/mock/index.json",function(data){
					const html=template("content",{list:data.res_body.list});
					$("#section_content").html(html);
					$(".section_group:eq(3)").addClass("section_3");
					$(".section_group:eq(7)").addClass("section_3");
					$(".section_group:eq(11)").addClass("section_3");
					
					var gouwu=$(".gouwuche"),
						xx=$(".section_group #xx"),
						jia=$(".section_group .jia"),
						jian=$(".section_group .jian");
//					console.log(gouwu,xx);
					$(".section_group").on("click",".gouwuche",function(){
						const inde=Array.from(gouwu).indexOf(this);
						const deta=$(".img #detail").eq(inde).animate({top:0},400);							
//						console.log(inde,deta);
					});
	    			$(".section_group").on("click","#xx",function(){
						const indexx=Array.from(xx).indexOf(this);
						const deta=$(".img #detail").eq(indexx).animate({top:291},400);							
//						console.log(indexx,deta);
					});
					 
					$(".gouwushu").on("click",".jia",function(){
//						var jiashu=1;
						const jias=Array.from(jia).indexOf(this);
						 var jiasuo=$(".gouwushu #jiage").eq(jias).val();
							if(jiasuo===1)
//							jiasuo++;
						console.log(jiashu);
						$(".gouwushu #jiage").eq(jias).val(jiashu);
					});
//					$(".gouwushu").on("click",".jian",function(){
//						if(jia!=1){
//							jia--;
//							$("#jiage").val(jia);
//						}else{
//							$("#jiage").val(1);
//						}
//						
//					});
			});
				//导航下拉菜单
			$(".nav_li").hover(function(){
					$(".nav_li .xia").hide();
					$(".nav_li .shang").show();
				},function(){
					$(".nav_li .xia").show();
					$(".nav_li .shang").hide();
			});
			//banner滑动轮播
			var lis=$("#banner li"),
				len=lis.length,
				wid=lis[0].offsetWidth;
				currentIndex=0,
            	nextIndex=1,
            	times=null,
            	deration=2000,
            	divs=null;
//          	console.log(wid)
            	//动态添加小圆点
            var html="";
            	for(var i=0;i<len;i++){
            		html+="<div></div>"
            	}
            	$("#suoying").html(html);//添加进去
            	divs=$("#suoying div");
//          	console.log(divs);
            	$("#suoying div:eq(0)").addClass("div2");//设置第一个小圆点的为红色
            $(".ul_li").clone().appendTo("#banner ul");
            	
            //移动效果
            function move(){
            	var _left=-1*nextIndex*wid;
            	$("#banner ul").animate({left:_left},300,function(){
            		if(currentIndex===len){
            			currentIndex=0;
            			nextIndex=1;
            			$("#banner ul").css({
            				left:0
            			});
            		}
            		
            	});
            	var divindex=nextIndex;
            	if(divindex>=len)
            		divindex=0;
            		for(var i=0;i<len;i++){//清除所有索引的颜色
            			divs[i].className="";
            		}
            	divs[divindex].className="div2";//设置索引的类名
            	   currentIndex=nextIndex;
            		nextIndex++;
            }
            times=setInterval(move,deration);//自动轮播
	          // 为每个 div 绑定事件
			for (let i = 0, len = divs.length; i < len; i++) {
				divs[i].onclick = function(){
					nextIndex=i;
					move();
				}
			}	
			//轮播图移入移出效果
            $(".banner_img").hover(function(){
            	clearInterval(times);
//        	console.log(11);
            },function(){
              times=setInterval(move,deration);
//          console.log(22);
            });
     
		});
	});
});
