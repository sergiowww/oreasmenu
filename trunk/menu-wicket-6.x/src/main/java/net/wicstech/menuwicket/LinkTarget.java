package net.wicstech.menuwicket;

public enum LinkTarget {
	/**
	 * Abrir link em uma nova p�gina.
	 */
	BLANK_PAGE("_blank"),

	/**
	 * Abrir link na mesma p�gina.
	 */
	SELF("_self");

	private String targetHTMLString;

	private LinkTarget(String target) {
		this.targetHTMLString = target;
	}

	/**
	 * @return the targetHTMLString
	 */
	public String getTargetHTMLString() {
		return targetHTMLString;
	}
}
