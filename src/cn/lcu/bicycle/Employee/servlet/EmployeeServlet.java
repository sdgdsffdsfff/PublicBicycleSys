package cn.lcu.bicycle.Employee.servlet;


import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.itcast.servlet.BaseServlet;
import cn.lcu.bicycle.Employee.service.EmployeeService;


/*
 * 员工数据管理模块控制层
 */
public class EmployeeServlet extends BaseServlet {
private EmployeeService EmployeeService = new EmployeeService();
	

/**
 * 使用Ajax的员工数据管理模块的列表显示
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
