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
 * �û�ģ����Ʋ�
 */
public class UserServlet extends BaseServlet {
private UserService userService = new UserService();

/**
 * Ajax �û����Ƿ����У��
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
 * Ajax ��֤���Ƿ���ȷУ��
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
 * ��¼����
 * @param req
 * @param resp
 * @return
 * @throws ServletException
 * @throws IOException
 */
	public String Login (HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
			/*
			 * ��װ�����ݵ�User		
			 */
		User formUser = CommonUtils.toBean(req.getParameterMap(), User.class);
		/*
		 * ����service�ķ���
		 */
		User user = userService.Login(formUser);
		/*
		 * ��У��
		 */
		Map<String,String> errors = validateLogin(formUser, req.getSession());
		if(errors.size() > 0) {
			req.setAttribute("form", formUser);
			req.setAttribute("errors", errors);
			return "f:/jsps/UserLogin.jsp";
		}
		/*
		 * ��ʼ�ж�
		 */
		//�������ڱ�û�з�װ��ȥ����
		if (user == null) {//ʧ����
			req.setAttribute("msg", "�û������������");
			req.setAttribute("form", formUser);
			return "f:/jsps/UserLogin.jsp";
		
		}else {//�ɹ���
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
	 * ��¼У�鷽�������ݵ����Լ������
	 */
	private Map<String,String> validateLogin(User formUser, HttpSession session) {
		Map<String,String> errors = new HashMap<String,String>();

		/*
		 * 1.У����֤��
		 */
		String verifyCode = formUser.getVerifyCode();
		String vcode = (String) session.getAttribute("vCode");
		if(verifyCode == null || verifyCode.trim().isEmpty()) {
			errors.put("verifyCode", "��֤�벻��Ϊ�գ�");
		} else if(!verifyCode.equalsIgnoreCase(vcode)) {
			errors.put("verifyCode", "��֤�����");
		}
		
		/*
		 * 2. У���¼��
		 */
		String loginname = formUser.getUsername();
		System.out.println(userService.ajaxValidateLoginname(loginname)+loginname);
		if(loginname == null || loginname.trim().isEmpty()) {
			errors.put("loginname", "�û�������Ϊ�գ�");
		} else if(loginname.length() < 3 || loginname.length() > 20) {
			errors.put("loginname", "�û������ȱ�����3~20֮�䣡");
		} else if(userService.ajaxValidateLoginname(loginname)) {
			errors.put("loginname", "�û���δ��ע�ᣡ");
		}
		
		/*
		 * 3. У���¼����
		 */
		String loginpass = formUser.getPassword();
		if(loginpass == null || loginpass.trim().isEmpty()) {
			errors.put("loginpass", "���벻��Ϊ�գ�");
		} else if(loginpass.length() < 3 || loginpass.length() > 20) {
			errors.put("loginpass", "���볤�ȱ�����3~20֮�䣡");
		}
		
		return errors;
	}

	
	
}
