package net.wicstech.menuwicket;

import org.apache.wicket.request.resource.ResourceReference;
import org.apache.wicket.resource.JQueryResourceReference;
import org.wicketstuff.jslibraries.JSReference;
import org.wicketstuff.jslibraries.Library;
import org.wicketstuff.jslibraries.VersionDescriptor;

/**
 * Biblioteca Javascript para ser utilizada com o menu.
 * 
 * @author Sergio
 * 
 */
public enum JSLibrary {
	PROTOTYPE_JS(JSReference.getReference(VersionDescriptor.exactVersion(Library.PROTOTYPE, 1, 7))),

	JQUERY(JQueryResourceReference.get());

	private ResourceReference descriptor;

	private JSLibrary(ResourceReference descriptor) {
		this.descriptor = descriptor;
	}

	/**
	 * @return the descriptor
	 */
	public ResourceReference getDescriptor() {
		return descriptor;
	}
}
