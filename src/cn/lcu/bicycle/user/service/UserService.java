package cn.lcu.bicycle.user.service;

import java.sql.SQLException;
import cn.lcu.bicycle.user.dao.UserDao;
import cn.lcu.bicycle.user.domain.User;

/**
 * 用户模块业务层
 * @author Administrator
 *
 */
public class UserService {
private UserDao userDao = new UserDao();

/**
 * 用户名注册校验
 * @param loginname
 * @return
 */
public boolean ajaxValidateLoginname(String loginname) {
try {
	 return userDao.ajaxValidateLoginname(loginname);
} catch (SQLException e) {
	throw new RuntimeException(e);
} 
}


/**
 * 用户登录
 * @param username
 * @param password
 * @return
 * @throws SQLException
 */
public User Login(User user){
		try {
			return userDao.findByUsernameAndPassword(user.getUsername(), user.getPassword());
		} catch (SQLException e) {
			throw new RuntimeException(e);
		}
}

 





}
