package cn.lcu.bicycle.Employee.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import cn.lcu.bicycle.Employee.dao.EmployeeDao;

public class EmployeeService {
	
	private EmployeeDao EmployeeDao = new EmployeeDao();

	
	
/**
 * 员工数据管理模块显示左右自行车站点数据到列表
 * @return
 */
	public String ajaxShowAllDate() {
		try {
			
			 return EmployeeDao.ajaxShowAllDate();
			 
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} 
		}
	
}
