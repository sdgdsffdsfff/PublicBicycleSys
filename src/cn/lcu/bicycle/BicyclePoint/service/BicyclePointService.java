package cn.lcu.bicycle.BicyclePoint.service;

import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import cn.lcu.bicycle.BicyclePoint.dao.BicyclePointDao;

public class BicyclePointService {
	
	private BicyclePointDao bicyclePointDao = new BicyclePointDao();

	
	
/**
 * 自行车站点管理模块显示左右自行车站点数据到列表
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
