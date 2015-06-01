package cn.lcu.bicycle.BicyclePoint.domain;

import com.sun.corba.se.spi.orbutil.fsm.State;

public class BicyclePoint {
	
	private  int Number;
	private String Name;
	private String TIME;
	private String State;
	private String Address;
	private String TEL;
	private String Remarks;
	
	public int getNumber() {
		return Number;
	}
	public void setNumber(int number) {
		Number = number;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getTIME() {
		return TIME;
	}
	public void setTIME(String tIME) {
		TIME = tIME;
	}
	public String getState() {
		return State;
	}
	public void setState(String state) {
		State = state;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	public String getTEL() {
		return TEL;
	}
	public void setTEL(String tEL) {
		TEL = tEL;
	}
	public String getRemarks() {
		return Remarks;
	}
	public void setRemarks(String remarks) {
		Remarks = remarks;
	}
	@Override
	public String toString() {
		return "BicyclePoint [Number=" + Number + ", Name=" + Name + ", TIME="
				+ TIME + ", State=" + State + ", Address=" + Address + ", TEL="
				+ TEL + ", Remarks=" + Remarks + "]";
	}

	
	
    

}
