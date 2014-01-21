package br.com.wicstech.menuoreas;

import org.apache.commons.lang.BooleanUtils;

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
