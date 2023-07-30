package com.react.frw.common.web.response;

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class ResultDto {

	@Builder.Default
	String code = "S0000001"; // 작업 결과 코드
	@Builder.Default
	String message = "success"; // 작업 결과 메시지
	@Builder.Default
	int recordsTotal = 0;

	@JacksonXmlElementWrapper(useWrapping=false)
	Object dataSet; // 결과셋
}
