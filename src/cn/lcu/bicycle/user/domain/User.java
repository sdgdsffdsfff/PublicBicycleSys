package cn.lcu.bicycle.user.domain;

/**
 * �û�ģ��ʵ����
 * 
 * @author Administrator
 *
 */
/*
 * ������Դ�� 1.���ݿ�� 2.��ģ�����б�
 */
public class User {
	//���ݿ�user��
	private int userid;// ����
	private String username;//��¼��
	private String password;//��¼����
	private int userlevel;//�û��ȼ�
	
	//��½��
	private String verifyCode;//��֤��
	
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
