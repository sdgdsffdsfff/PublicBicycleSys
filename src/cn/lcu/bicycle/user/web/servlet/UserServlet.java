package cn.lcu.bicycle.user.web.servlet;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.filefilter.RegexFileFilter;

import cn.itcast.commons.CommonUtils;
import cn.itcast.servlet.BaseServlet;
import cn.itcast.vcode.utils.VerifyCode;
import cn.lcu.bicycle.user.domain.User;
import cn.lcu.bicycle.user.service.UserService;

/**
 * 用户模块控制层
 */
public class UserServlet extends BaseServlet {
private UserService userService = new UserService();

/**
 * Ajax 用户名是否存在校验
 * @param req
 * @param resp
 * @return
 * @throws ServletException
 * @throws IOException
 */
public String ajaxValidateLoginname(HttpServletRequest req, HttpServletResponse resp)
		throws ServletException, IOException {
	
	String loginname = req.getParameter("loginname");
	boolean b = userService.ajaxValidateLoginname(loginname);
	resp.getWriter().print(b);
	return null;
} 

/**
 * Ajax 验证码是否正确校验
 * @param req
 * @param resp
 * @return
 * @throws ServletException
 * @throws IOException
 */
public String ajaxValidateVerifyCode (HttpServletRequest req, HttpServletResponse resp)
		throws ServletException, IOException {
	
	String verifyCode = req.getParameter("verifyCode");
	String vcode = (String) req.getSession().getAttribute("vCode");
	boolean b = verifyCode.equalsIgnoreCase(vcode);
	resp.getWriter().print(b);
	
	return null;
} 


/**
 * 登录功能
 * @param req
 * @param resp
 * @return
 * @throws ServletException
 * @throws IOException
 */
	public String Login (HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
			/*
			 * 封装表单数据到User		
			 */
		User formUser = CommonUtils.toBean(req.getParameterMap(), User.class);
		/*
		 * 调用service的方法
		 */
		User user = userService.Login(formUser);
		/*
		 * 表单校验
		 */
		Map<String,String> errors = validateLogin(formUser, req.getSession());
		if(errors.size() > 0) {
			req.setAttribute("form", formUser);
			req.setAttribute("errors", errors);
			return "f:/jsps/UserLogin.jsp";
		}
		/*
		 * 开始判断
		 */
		//问题在于表单没有封装进去数据
		if (user == null) {//失败了
			req.setAttribute("msg", "用户名或密码错误！");
			req.setAttribute("form", formUser);
			return "f:/jsps/UserLogin.jsp";
		
		}else {//成功了
			req.getSession().setAttribute("sessionUser", user);
			String loginname = user.getUsername();
			loginname = URLEncoder.encode(loginname, "utf-8");
			Cookie cookie = new Cookie("loginname", loginname);
			cookie.setMaxAge(60*60*24*10);
			resp.addCookie(cookie);
			return "r:/index.jsp";
		}
	} 
	
	
	/*
	 * 登录校验方法，内容等你自己来完成
	 */
	private Map<String,String> validateLogin(User formUser, HttpSession session) {
		Map<String,String> errors = new HashMap<String,String>();

		/*
		 * 1.校验验证码
		 */
		String verifyCode = formUser.getVerifyCode();
		String vcode = (String) session.getAttribute("vCode");
		if(verifyCode == null || verifyCode.trim().isEmpty()) {
			errors.put("verifyCode", "验证码不能为空！");
		} else if(!verifyCode.equalsIgnoreCase(vcode)) {
			errors.put("verifyCode", "验证码错误！");
		}
		
		/*
		 * 2. 校验登录名
		 */
		String loginname = formUser.getUsername();
		System.out.println(userService.ajaxValidateLoginname(loginname)+loginname);
		if(loginname == null || loginname.trim().isEmpty()) {
			errors.put("loginname", "用户名不能为空！");
		} else if(loginname.length() < 3 || loginname.length() > 20) {
			errors.put("loginname", "用户名长度必须在3~20之间！");
		} else if(userService.ajaxValidateLoginname(loginname)) {
			errors.put("loginname", "用户名未被注册！");
		}
		
		/*
		 * 3. 校验登录密码
		 */
		String loginpass = formUser.getPassword();
		if(loginpass == null || loginpass.trim().isEmpty()) {
			errors.put("loginpass", "密码不能为空！");
		} else if(loginpass.length() < 3 || loginpass.length() > 20) {
			errors.put("loginpass", "密码长度必须在3~20之间！");
		}
		
		return errors;
	}

	
	
}
