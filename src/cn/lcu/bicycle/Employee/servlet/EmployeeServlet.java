package cn.lcu.bicycle.Employee.servlet;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.itcast.servlet.BaseServlet;
import cn.lcu.bicycle.Employee.service.EmployeeService;


/*
 * Ա�����ݹ���ģ����Ʋ�
 */
public class EmployeeServlet extends BaseServlet {
private EmployeeService EmployeeService = new EmployeeService();
	

/**
 * ʹ��Ajax��Ա�����ݹ���ģ����б���ʾ
 * @param req
 * @param resp
 * @return
 * @throws ServletException
 * @throws IOException
 */
	public String ajaxShowAllDate(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("ok");
		String listdate = EmployeeService.ajaxShowAllDate();
		resp.getWriter().print(listdate);
        return null;
	} 
}
