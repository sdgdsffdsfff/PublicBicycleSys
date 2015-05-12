package cn.lcu.bicycle.user.dao;

import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;

import cn.itcast.jdbc.TxQueryRunner;
import cn.lcu.bicycle.user.domain.User;

/**
 * 用户模块持久层
 * 
 * @author Administrator
 *
 */
public class UserDao {
	private QueryRunner qr = new TxQueryRunner();

	/**
	 * 支持ajax的校验方法，校验用户名是否存在
	 * 
	 * @param Loginname
	 * @return
	 * @throws SQLException
	 */
	public boolean ajaxValidateLoginname(String loginname) throws SQLException {
		
		String sql = "select count(1) from user where UserName=?";
		Number number = (Number) qr.query(sql, new ScalarHandler(), loginname);
		
		return number.intValue() == 0;
	}
	/**
	 * 用用户名和密码查询用户信息
	 * @param loginname
	 * @param password
	 * @return
	 * @throws SQLException
	 */
	public User findByUsernameAndPassword(String username,String password) throws SQLException {
		
		String sql = "select * from user where UserName=? and UserPassword=?";
		return qr.query(sql, new BeanHandler<User>(User.class), username, password);
		 
	}
	

}
