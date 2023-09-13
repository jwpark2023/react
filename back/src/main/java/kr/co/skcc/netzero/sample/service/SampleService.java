package kr.co.skcc.netzero.sample.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.co.skcc.netzero.sample.mapper.SampleDao;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SampleService {

  @Resource(name = "sampleDao")
  private SampleDao sampleDao;

  public List<Map<String, Object>> getUserList() {
    return sampleDao.getUserList();
  }

  public List<Map<String, Object>> getCodeTreeList() {
    return sampleDao.getCodeTreeList();
  }

  public List<Map<String, Object>> getCodeList(Map<String, Object> param) {
    return sampleDao.getCodeList(param);
  }

  public void saveCodeList(List<HashMap<String, Object>> param) {
    sampleDao.saveCodeList(param);
  }

}
