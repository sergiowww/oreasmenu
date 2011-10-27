package br.com.wicstech.menuoreas;

import org.apache.wicket.Application;
import org.apache.wicket.ResourceReference;
import org.apache.wicket.util.io.IOUtils;

/**
 * Utilitários do menu.
 * @author Sergio
 *
 */
abstract class MenuUtil {
	
	/**
	 * Retorna o conteúdo de um recurso como string.
	 * @param resourceReference
	 * @return
	 */
	public static String getResourceContentAsString(ResourceReference resourceReference) {
		try {
			resourceReference.bind(Application.get());
			return new String(IOUtils.toString(resourceReference.getResource().getResourceStream().getInputStream()));
		} catch (Exception e) {
			throw new RuntimeException(e);
		} 
	}
}
