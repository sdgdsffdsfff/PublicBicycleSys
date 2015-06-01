package cn.lcu.bicycle.BicyclePoint.dao;

import java.sql.SQLException;
import java.util.List;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.codehaus.jackson.map.ObjectMapper;

import cn.itcast.jdbc.TxQueryRunner;
import cn.lcu.bicycle.BicyclePoint.domain.BicyclePoint;


/**
 * 点数据管理模块持久层
 * 
 * @author Administrator
 *
 */

public class BicyclePointDao {
	
	static ObjectMapper objectMapper;
	private QueryRunner qr = new TxQueryRunner();
    //private JsonGenerator jsonGenerator = null;


	/**
	 * 支持ajax的数据提取，提取所有自行车公共点的数据
	 * 
	 * @throws SQLException
	 */
	
	public String ajaxShowAllDate() throws SQLException {
		String sql = "select * from bicyclepoint";
		
		List<BicyclePoint> mapList = qr.query(sql, new BeanListHandler<BicyclePoint>(BicyclePoint.class));
		
		return toJSon(mapList);
	}

	
	   /**
     *      把JavaBean转换为json字符串
     *      (1)普通对象转换：toJson(Student)
     *      (2)List转换：toJson(List)
     *      (3)Map转换:toJson(Map)
     * 我们发现不管什么类型，都可以直接传入这个方法
     *
     * @param object JavaBean对象
     * @return json字符串
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
