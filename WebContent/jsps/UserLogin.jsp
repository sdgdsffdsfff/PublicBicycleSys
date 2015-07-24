<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>


<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>公共自行车管理系统</title>

<script type="text/javascript" language="javascript" src="/PublicBicycleSys/js/PlugIn/pace1.0.2.js"></script>
<link rel="stylesheet" type="text/css" href="/PublicBicycleSys/css/PlugInCSS/pace-themes/white/pace-theme-flat-top.css">

<link href="/PublicBicycleSys/css/User/UserLogin.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="/PublicBicycleSys/jquery/jquery-1.5.1.js"></script>
<script type="text/javascript" src="/PublicBicycleSys/js/User/UserLogin.js"></script>



<script type="text/javascript">
	$(function() {/*Map<String(Cookie名称),Cookie(Cookie本身)>*/
		// 获取cookie中的用户名
		var loginname = window.decodeURI("${cookie.loginname.value}");
		if("${requestScope.form.username}") {
			loginname = "${requestScope.form.username}";
		}
		$("#loginname").val(loginname);
	});
</script>

</head>


<body>
	<div id="login_box" >
		<div id="login_form">

			<form action="/PublicBicycleSys/UserServlet" method="post" id="loginForm">
				<input type="hidden" name="method" value="Login" />
				<table id="tableForm">

					<tr>
						<td width="50"></td>
						<td><label class="error" id="msg">${msg}</label></td>
					</tr>

					<tr>
						<td width="50">用户名</td>
						<td><input class="input" type="text" name="username"
							id="loginname" /></td>
					</tr>

					<tr>
						<td height="20">&nbsp;</td>
						<td><label id="loginnameError" class="error"></label></td>
					</tr>

					<tr>
						<td>密 码</td>
						<td><input class="input" type="password" name="password"
							id="loginpass" value="${form.password }" /></td>
					</tr>

					<tr>
						<td height="20">&nbsp;</td>
						<td><label id="loginpassError" class="error"></label></td>
					</tr>

					<tr>
						<td>验证码</td>
						<td><input class="input yzm" type="text" name="verifyCode"
							id="verifyCode" value="${form.verifyCode }" /> <img id="vCode"
							src="/PublicBicycleSys/VerifyCodeServlet" /> <a
							href="javascript:_hyz()" class="VerifyCodeChange">换张图</a></td>
					</tr>

					<tr>
						<td height="20px">&nbsp;</td>
						<td><label id="verifyCodeError" class="error"></label></td>
					</tr>

					<tr>
						<td>&nbsp;</td>
						<td align="left"><input type="image" id="submit"
							src="/PublicBicycleSys/images/User/login1.png" class="loginBtn" /></td>
					</tr>

				</table>
			</form>
		</div>
	</div>
</body>
</html>