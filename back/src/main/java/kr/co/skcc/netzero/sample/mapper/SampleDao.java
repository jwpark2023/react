package kr.co.skcc.netzero.sample.mapper;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SampleDao {
    public List<Map<String, Object>> getUserList();

    public List<Map<String, Object>> getCodeTreeList();

    public List<Map<String, Object>> getCodeList(Map<String, Object> param);

    public void saveCodeList(List<HashMap<String, Object>> param);
}
