package com.react.frw.common;

import org.apache.commons.collections4.map.ListOrderedMap;

public class DataMap extends ListOrderedMap<String, Object> {

	@Override
	public Object put(String key, Object value) {
		if (value == null) {
			return value;
		}

		return super.put(convert2CamelCase(key), value);
	}

	private String convert2CamelCase(String underScore) {
		if (underScore.indexOf('_') < 0 && Character.isLowerCase(underScore.charAt(0))) {
			return underScore;
		}
		StringBuilder result = new StringBuilder();
		boolean nextUpper = false;
		int len = underScore.length();

		for (int i = 0; i < len; i++) {
			char currentChar = underScore.charAt(i);
			if (currentChar == '_') {
				nextUpper = true;
			} else {
				if (nextUpper) {
					result.append(Character.toUpperCase(currentChar));
					nextUpper = false;
				} else {
					result.append(Character.toLowerCase(currentChar));
				}
			}
		}
		return result.toString();
	}
}
