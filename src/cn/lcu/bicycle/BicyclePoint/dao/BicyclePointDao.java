package cn.lcu.bicycle.BicyclePoint.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.codehaus.jackson.map.ObjectMapper;

import cn.itcast.jdbc.TxQueryRunner;
import cn.lcu.bicycle.BicyclePoint.domain.BicyclePoint;


/**
 * �����ݹ���ģ��־ò�
 * 
 * @author Administrator
 *
 */

public class BicyclePointDao {
	
	static ObjectMapper objectMapper;
	private QueryRunner qr = new TxQueryRunner();
    //private JsonGenerator jsonGenerator = null;


	/**
	 * ֧��ajax��������ȡ����ȡ�������г������������
	 * 
	 * @throws SQLException
	 */
	
	public String ajaxShowAllDate() throws SQLException {
		String sql = "select * from bicyclepoint";
		
		List<BicyclePoint> mapList = qr.query(sql, new BeanListHandler<BicyclePoint>(BicyclePoint.class));
		
		return toJSon(mapList);
	}

	
	   /**
     *      ��JavaBeanת��Ϊjson�ַ���
     *      (1)��ͨ����ת����toJson(Student)
     *      (2)Listת����toJson(List)
     *      (3)Mapת��:toJson(Map)
     * ���Ƿ��ֲ���ʲô���ͣ�������ֱ�Ӵ����������
     *
     * @param object JavaBean����
     * @return json�ַ���
     */
    public static String toJSon(Object object) {
    	
        if (objectMapper == null) {
            objectMapper = new ObjectMapper();
        }
        try {
            return objectMapper.writeValueAsString(object);
        } catch (Exception e) {
            e.printStackTrace();
        }
 
        return null;
    }
    
}
