package br.com.wicstech.menuoreas;

import org.wicketstuff.jslibraries.Library;
import org.wicketstuff.jslibraries.VersionDescriptor;

/**
 * Biblioteca Javascript para ser utilizada com o menu.
 * 
 * @author Sergio
 * 
 */
public enum JSLibrary {
	PROTOTYPE_JS(VersionDescriptor.exactVersion(Library.PROTOTYPE, 1, 6)),

	JQUERY(VersionDescriptor.alwaysLatestOfVersion(Library.JQUERY, 1, 4));

	private VersionDescriptor descriptor;

	private JSLibrary(VersionDescriptor descriptor) {
		this.descriptor = descriptor;
	}

	/**
	 * @return the descriptor
	 */
	public VersionDescriptor getDescriptor() {
		return descriptor;
	}
}
