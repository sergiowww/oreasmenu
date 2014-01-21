package br.com.wicstech.menuoreas;

import org.apache.wicket.ResourceReference;

/**
 * Biblioteca Javascript para ser utilizada com o menu.
 * 
 * @author Sergio
 * 
 */
public enum JSLibrary {
	PROTOTYPE_JS(new ResourceReference(JSLibrary.class, "libraries/prototype.js"), "prototype"),

	JQUERY(new ResourceReference(JSLibrary.class, "libraries/jquery-1.10.2.js"), "jquery");

	private ResourceReference lib;
	private String id;

	private JSLibrary(ResourceReference lib, String id) {
		this.lib = lib;
		this.id = id;
	}

	/**
	 * @return the lib
	 */
	public ResourceReference getLib() {
		return lib;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

}
