$(document).ready(function (){
	$(function(){
	 $.get("http://qnxg.net/Login/CheckCookie",function(data){
	        console.log(data['code']);
	         if(data['code']==0){
	         	 $("#tipxx").addClass("tt");
	         }
	    });

		$("#tj").on("click",function(){
			//获取姓名和学号
		$.get("http://qnxg.net/Login/CheckCookie",function(data){
	        if(data['code']==0){
	        	alert("请回首页登录噢");
	        	// $(window).attr("http://1000.hnu.edu.cn/#!/");
	        	window.location.href = "http://1000.hnu.edu.cn/#!/";
	        }
	        else{
	        	var title = $("#title1").val();
		var phone = $("#tele").val();
		var email = $("#emm").val();
		var advice = $("#editor").val();
		if(title==""){
			alert("标题不能为空哦");
			return false;
		}
		if(advice==""){
			alert("内容不能为空哦");
			return false;
		}	
		// 手机输入有效性检测
		if(phone==""&&email==""){
			alert("手机或邮箱要选一个哦");
			return false;
		}
		else if(phone!=""&&email==""){
			if(phone.length!=11) {
		        alert("*手机格式错误");
		        return false;
		    }
		}
		else if(phone=""&&email!=""){
			// 邮箱输入有效性检测
		    var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
		   if(!reg.test(email)) { //正则验证不通过，格式不对
		        alert("*邮箱格式错误");
		        return false;
		    } else {
		        return true;
		    }
		}

		console.log(title);
		console.log(advice);
		$.ajax({
			url:"http://qnxg.net/email/send_email",
			type:'POST',
			data:JSON.stringify(GetJsonData()),
			dataType:"json",
			success:function(data){
				console.log(data);
				if(data['status']==1){
					alert(data['message']);
					$(window).attr("http://1000.hnu.edu.cn/#!/");
				}
				else{
					alert(data['message']);
				}
			}
		})	
	        }
	   	})


	})

	})
});

function GetJsonData(){
	var title = $("#title1").val();
	var phone = $("#tele").val();
	var email = $("#emm").val();
	var advice = $("#editor").val();
	var json={
		"title":title,
		"content":advice,
		"email":email,
		"phone":phone
	};
	return json;
}