package cn.lcu.bicycle.Employee.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import cn.lcu.bicycle.Employee.dao.EmployeeDao;

public class EmployeeService {
	
	private EmployeeDao EmployeeDao = new EmployeeDao();

	
	
/**
 * Ա�����ݹ���ģ����ʾ�������г�վ�����ݵ��б�
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
