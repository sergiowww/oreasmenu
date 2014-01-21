package net.wicstech.menuwicket;

import org.apache.commons.lang3.BooleanUtils;

/**
 * Orientação do menu.
 * @author sergio.oliveira
 *
 */
public enum Orientacao {
	HORIZONTAL(true),
	VERTICAL(false);
	
	private boolean javascriptValue;

	private Orientacao(boolean javascriptValue) {
		this.javascriptValue = javascriptValue;
	}

	@Override
	public String toString() {
		return BooleanUtils.toStringTrueFalse(javascriptValue);
	}
}
