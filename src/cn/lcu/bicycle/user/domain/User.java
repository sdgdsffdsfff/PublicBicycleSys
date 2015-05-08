package cn.lcu.bicycle.user.domain;

/**
 * 用户模块实体类
 * 
 * @author Administrator
 *
 */
/*
 * 属性来源： 1.数据库表 2.本模块所有表单
 */
public class User {
	//数据库user表
	private int userid;// 主键
	private String username;//登录名
	private String password;//登录密码
	private int userlevel;//用户等级
	
	//登陆表单
	private String verifyCode;//验证码
	
	public int getUserlevel() {
		return userlevel;
	}
	public void setUserlevel(int userlevel) {
		this.userlevel = userlevel;
	}
	public String getVerifyCode() {
		return verifyCode;
	}
	public void setVerifyCode(String verifyCode) {
		this.verifyCode = verifyCode;
	}
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	@Override
	public String toString() {
		return "User [userid=" + userid + ", username=" + username
				+ ", password=" + password + ", userlevel=" + userlevel
				+ ", verifyCode=" + verifyCode + "]";
	}
	
	
	
	

}
