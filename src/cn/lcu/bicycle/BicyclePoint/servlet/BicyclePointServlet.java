package cn.lcu.bicycle.BicyclePoint.servlet;


import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.itcast.servlet.BaseServlet;
import cn.lcu.bicycle.BicyclePoint.service.BicyclePointService;


/*
 * 自行车管理模块控制层
 */
public class BicyclePointServlet extends BaseServlet {
private BicyclePointService bicyclePointService = new BicyclePointService();
	

/**
 * 使用Ajax的站点管理模块的站点列表显示
 * @param req
 * @param resp
 * @return
 * @throws ServletException
 * @throws IOException
 */
	public String ajaxShowAllDate(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		System.out.println("ok");
		String listdate = bicyclePointService.ajaxShowAllDate();
		resp.getWriter().print(listdate);
        return null;
	} 
}
