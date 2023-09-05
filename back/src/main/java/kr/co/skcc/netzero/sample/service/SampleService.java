package kr.co.skcc.netzero.sample.service;

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

  public List<Map<String, Object>>  getUserList() {
    return sampleDao.getUserList();
  }

}