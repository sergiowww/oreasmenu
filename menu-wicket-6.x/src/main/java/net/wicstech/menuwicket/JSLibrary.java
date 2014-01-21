package net.wicstech.menuwicket;

import org.wicketstuff.jslibraries.Library;
import org.wicketstuff.jslibraries.VersionDescriptor;

/**
 * Biblioteca Javascript para ser utilizada com o menu.
 * 
 * @author Sergio
 * 
 */
public enum JSLibrary {
	PROTOTYPE_JS(VersionDescriptor.exactVersion(Library.PROTOTYPE, 1, 7)),

	JQUERY(VersionDescriptor.alwaysLatest(Library.JQUERY));

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
