package cn.lcu.bicycle.user.dao;

import java.sql.SQLException;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.eclipse.jdt.internal.compiler.parser.Scanner;

import com.sun.org.apache.bcel.internal.generic.NEW;

import cn.itcast.jdbc.TxQueryRunner;
import cn.lcu.bicycle.user.domain.User;

/**
 * �û�ģ��־ò�
 * 
 * @author Administrator
 *
 */
public class UserDao {
	private QueryRunner qr = new TxQueryRunner();

	/**
	 * ֧��ajax��У�鷽����У���û����Ƿ����
	 * 
	 * @param Loginname
	 * @return
	 * @throws SQLException
	 */
	public boolean ajaxValidateLoginname(String loginname) throws SQLException {
		
		String sql = "select count(1) from user_tb where username=?";
		Number number = (Number) qr.query(sql, new ScalarHandler(), loginname);
		
		return number.intValue() == 0;
	}
	/**
	 * ���û����������ѯ�û���Ϣ
	 * @param loginname
	 * @param password
	 * @return
	 * @throws SQLException
	 */
	public User findByUsernameAndPassword(String username,String password) throws SQLException {
		
		String sql = "select * from user_tb where username=? and password=?";
		return qr.query(sql, new BeanHandler<User>(User.class), username, password);
		 
	}
	

}
