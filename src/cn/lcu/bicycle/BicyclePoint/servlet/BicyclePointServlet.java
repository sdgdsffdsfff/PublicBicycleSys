package cn.lcu.bicycle.BicyclePoint.servlet;


import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.itcast.servlet.BaseServlet;
import cn.lcu.bicycle.BicyclePoint.service.BicyclePointService;


/*
 * ���г�����ģ����Ʋ�
 */
public class BicyclePointServlet extends BaseServlet {
private BicyclePointService bicyclePointService = new BicyclePointService();
	

/**
 * ʹ��Ajax��վ�����ģ���վ���б���ʾ
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
