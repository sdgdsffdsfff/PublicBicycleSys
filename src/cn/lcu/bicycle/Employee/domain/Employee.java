package cn.lcu.bicycle.Employee.domain;

public class Employee {
	
	private  int EmpID;
	private String EmpName;
	private String EmpSex;
	private String EmpSection;
	private String EmpTEL;
	private String EmpSAL;
	private String EmpLocationX;
	private String EmpLocationY;
	public int getEmpID() {
		return EmpID;
	}
	public void setEmpID(int empID) {
		EmpID = empID;
	}
	public String getEmpName() {
		return EmpName;
	}
	public void setEmpName(String empName) {
		EmpName = empName;
	}
	public String getEmpSex() {
		return EmpSex;
	}
	public void setEmpSex(String empSex) {
		EmpSex = empSex;
	}
	public String getEmpSection() {
		return EmpSection;
	}
	public void setEmpSection(String empSection) {
		EmpSection = empSection;
	}
	public String getEmpTEL() {
		return EmpTEL;
	}
	public void setEmpTEL(String empTEL) {
		EmpTEL = empTEL;
	}
	public String getEmpSAL() {
		return EmpSAL;
	}
	public void setEmpSAL(String empSAL) {
		EmpSAL = empSAL;
	}
	public String getEmpLocationX() {
		return EmpLocationX;
	}
	public void setEmpLocationX(String empLocationX) {
		EmpLocationX = empLocationX;
	}
	public String getEmpLocationY() {
		return EmpLocationY;
	}
	public void setEmpLocationY(String empLocationY) {
		EmpLocationY = empLocationY;
	}
	@Override
	public String toString() {
		return "Employee [EmpID=" + EmpID + ", EmpName=" + EmpName
				+ ", EmpSex=" + EmpSex + ", EmpSection=" + EmpSection
				+ ", EmpTEL=" + EmpTEL + ", EmpSAL=" + EmpSAL
				+ ", EmpLocationX=" + EmpLocationX + ", EmpLocationY="
				+ EmpLocationY + "]";
	}

}
