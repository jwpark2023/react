package kr.co.skcc.netzero.sample.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Description;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.co.skcc.netzero.common.web.response.ResultDto;
import kr.co.skcc.netzero.sample.service.SampleService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/sample")
public class SampleController {

  @Autowired
  SampleService service;

  @Description("사용자 목록")
  @GetMapping(value = "userList")
  public ResponseEntity<ResultDto> userList() {
    log.info("test userList");
    HttpHeaders httpHeaders = new HttpHeaders();

    ResultDto resultDto = ResultDto.builder().build();
    resultDto.setDataSet(service.getUserList());

    return new ResponseEntity<>(resultDto, httpHeaders, HttpStatus.OK);
  }

  @Description("코드 트리 목록")
  @GetMapping(value = "treeList")
  public ResponseEntity<ResultDto> codeTreeList() {
    HttpHeaders httpHeaders = new HttpHeaders();

    ResultDto resultDto = ResultDto.builder().build();
    resultDto.setDataSet(service.getCodeTreeList());

    return new ResponseEntity<>(resultDto, httpHeaders, HttpStatus.OK);
  }

  @Description("코드 목록")
  @PostMapping(value = "codeList")
  public ResponseEntity<ResultDto> codeList(@RequestBody HashMap<String, Object> param) {
    HttpHeaders httpHeaders = new HttpHeaders();

    ResultDto resultDto = ResultDto.builder().build();
    resultDto.setDataSet(service.getCodeList(param));

    return new ResponseEntity<>(resultDto, httpHeaders, HttpStatus.OK);
  }

  @Description("코드 목록 저장")
  @PostMapping(value = "saveCodeList")
  public ResponseEntity<ResultDto> saveCodeList(@RequestBody List<HashMap<String, Object>> param) {
    HttpHeaders httpHeaders = new HttpHeaders();
    log.info("saveCodeList param", param);

    ResultDto resultDto = ResultDto.builder().build();
    service.saveCodeList(param);
    resultDto.setMessage("저장에 실패하였습니다.");

    return new ResponseEntity<>(resultDto, httpHeaders, HttpStatus.OK);
  }
}
