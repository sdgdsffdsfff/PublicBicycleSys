package cn.lcu.bicycle.BicyclePoint.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import cn.lcu.bicycle.BicyclePoint.dao.BicyclePointDao;

public class BicyclePointService {
	
	private BicyclePointDao bicyclePointDao = new BicyclePointDao();

	
	
/**
 * ���г�վ�����ģ����ʾ�������г�վ�����ݵ��б�
 * @return
 */
	public String ajaxShowAllDate() {
		try {
			
			 return bicyclePointDao.ajaxShowAllDate();
			 
		} catch (SQLException e) {
			throw new RuntimeException(e);
		} 
		}
	
}
