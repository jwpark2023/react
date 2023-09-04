package kr.co.skcc.netzero.common.web.response;

import java.util.ArrayList;
import java.util.List;

public class Messages {
	private List<String> message;

	public Messages() {
		this.message = new ArrayList<>();
	}
	
	public void setMessage(String msg) {
		this.message.add(msg);
	}

	public List<String> getMessage() {
		return message;
	}
}
