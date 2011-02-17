package br.com.wicstech.menuoreas;

import java.util.List;

import org.apache.wicket.behavior.HeaderContributor;
import org.apache.wicket.markup.html.IHeaderContributor;

/**
 * Barra de menu.
 * @author Sergio
 *
 */
public class MenuBar extends HeaderContributor {

	private static final long serialVersionUID = -8683400812756686255L;
	private MenuBarBuilder menuBarBuilder;
	
	/**
	 * 
	 * @param id identificador do elemento onde o menu será inserido.
	 * @param menuItens
	 */
	public MenuBar(String id, List<MenuItem> menuItens) {
		this(new MenuBarBuilder(id, menuItens));
	}
	private MenuBar(IHeaderContributor headerContributor) {
		super(headerContributor);
		this.menuBarBuilder = (MenuBarBuilder) headerContributor;
	}
	
	/**
	 * Adicionar um nível no menu.
	 * @param nivel
	 */
	public void addNivel(Nivel nivel) {
		menuBarBuilder.addNivel(nivel);
	}

}
