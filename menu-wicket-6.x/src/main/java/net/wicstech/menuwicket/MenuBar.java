package net.wicstech.menuwicket;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.wicket.Page;
import org.apache.wicket.core.util.string.JavaScriptUtils;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.head.JavaScriptHeaderItem;
import org.apache.wicket.markup.html.IHeaderContributor;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.util.ListModel;
import org.apache.wicket.request.cycle.RequestCycle;
import org.apache.wicket.request.resource.JavaScriptResourceReference;
import org.apache.wicket.request.resource.ResourceReference;
import org.wicketstuff.jslibraries.JSReference;
import org.wicketstuff.jslibraries.util.Assert;

/**
 * Barra de menu.
 * 
 * @author Sergio
 * 
 */
public class MenuBar extends WebMarkupContainer implements IHeaderContributor {

	private static final JavaScriptResourceReference JS_MENU_PROTOTYPE = new JavaScriptResourceReference(MenuBar.class, "js/oreasmenu-prototype.js");
	private static final JavaScriptResourceReference JS_MENU_JQUERY = new JavaScriptResourceReference(MenuBar.class, "js/oreasmenu-jquery.js");
	private static final JavaScriptResourceReference JS_COMMONS = new JavaScriptResourceReference(MenuBar.class, "js/commons.js");

	private static final long serialVersionUID = -8683400812756686255L;

	private JSLibrary jsLibrary = JSLibrary.PROTOTYPE_JS;

	private String idContainer, //
			menuGroup, //
			insertPosition = "top";

	private List<Nivel> niveis = new ArrayList<Nivel>();
	private Integer idMenuItem = 0;

	/**
	 * 
	 * @param id
	 *            identificador do elemento onde o menu será inserido.
	 * @param menuItens
	 */
	public MenuBar(String id, List<MenuItem> menuItens) {
		super(id, new ListModel<MenuItem>(menuItens));
		this.menuGroup = id;
		setOutputMarkupId(true);
		this.idContainer = getMarkupId();
	}

	/**
	 * Construtor com lista de menus vazia.
	 * 
	 * @param id
	 */
	public MenuBar(String id) {
		this(id, new ArrayList<MenuItem>());
	}

	/**
	 * Retorna o listmodel associado.
	 * 
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public Model<MenuItem> getModel() {
		return (Model<MenuItem>) getDefaultModel();
	}

	/**
	 * @return Lista de menus
	 */
	@SuppressWarnings("unchecked")
	public List<MenuItem> getMenuList() {
		return (List<MenuItem>) getDefaultModelObject();
	}

	/**
	 * Adicionar um nível no menu.
	 * 
	 * @param nivel
	 */
	public void addNivel(Nivel nivel) {
		niveis.add(nivel);
	}

	public void renderHead(IHeaderResponse response) {
		response.render(JavaScriptHeaderItem.forReference(JSReference.getReference(jsLibrary.getDescriptor())));
		response.render(JavaScriptHeaderItem.forReference(JS_COMMONS));
		if (JSLibrary.JQUERY.equals(jsLibrary)) {
			response.render(JavaScriptHeaderItem.forReference(JS_MENU_JQUERY));
		}
		if (JSLibrary.PROTOTYPE_JS.equals(jsLibrary)) {
			response.render(JavaScriptHeaderItem.forReference(JS_MENU_PROTOTYPE));
		}
		renderMenu(response);
	}

	@Override
	protected void onAfterRender() {
		super.onAfterRender();
		JavaScriptUtils.writeOpenTag(getResponse());
		getResponse().write("MenuBar.");
		getResponse().write(this.idContainer);
		getResponse().write("();");

		JavaScriptUtils.writeCloseTag(getResponse());
	}

	/**
	 * Renderizar o menu em javascript.
	 * 
	 * @param response
	 */
	private void renderMenu(IHeaderResponse response) {
		idMenuItem = 0;
		StringBuilder javascript = new StringBuilder("if(typeof MenuBar == \"undefined\"){MenuBar = new Object();}");
		javascript.append("MenuBar.");
		javascript.append(this.idContainer);
		javascript.append("= function(){");

		javascript.append("var menus = new Array();\r\n");
		List<MenuItem> menuItens = getMenuList();
		for (MenuItem menuItem : menuItens) {
			buildJsMenu(menuItem, javascript, null);
		}
		buildNivelConfig(javascript);
		javascript.append(";}");
		response.render(JavaScriptHeaderItem.forScript(javascript.toString(), "javascript" + getMarkupId()));
	}

	/**
	 * Gerar chamada as configurações de níveis do menu.
	 * 
	 * @param javascript
	 */
	private void buildNivelConfig(StringBuilder javascript) {
		Assert.isFalse(this.niveis.isEmpty(), "É necessário fornecer ao menos um nível para determinar as configurações do menu!");
		String varFactoryMenu = "factory" + menuGroup;
		javascript.append("var " + varFactoryMenu + " = new FactoryMenu(menus, \"" + menuGroup + "\", \"" + idContainer + "\", \"" + insertPosition + "\");\r\n");
		for (Nivel nivel : this.niveis) {
			javascript.append(varFactoryMenu + ".addNivel(new Nivel(");
			javascript.append(nivel.getOrientacao());

			javascript.append(",");
			javascript.append(getStringParam(nivel.getStyleClass()));
			javascript.append("");

			javascript.append(",");
			javascript.append(getStringParam(nivel.getStyleClassHover()));
			javascript.append("");

			if (nivel.getImagemSeta() == null) {
				javascript.append(", null");
			} else {
				javascript.append(",");
				javascript.append(getStringParam(getImageUrl(nivel.getImagemSeta())));
				javascript.append("");
			}
			javascript.append(',');
			javascript.append(nivel.getWidthDefault());
			javascript.append(',');
			javascript.append(nivel.getHeightDefault());
			javascript.append(',');
			javascript.append(nivel.isTamanhoRelativo());
			javascript.append(',');
			javascript.append(nivel.isAlinharCoordenadaXMenuPai());
			javascript.append(',');
			javascript.append(nivel.isExpandirSubNiveis());
			javascript.append(")");
			if (nivel.getAjusteDistanciaMenu() != null) {
				javascript.append(".setAjusteDistanciaMenu(");
				javascript.append(nivel.getAjusteDistanciaMenu());
				javascript.append(")");
			}
			javascript.append(");\r\n");
		}
		javascript.append(varFactoryMenu + ".construirMenu()");
	}

	private String getStringParam(CharSequence valor) {
		if (valor == null) {
			return StringUtils.EMPTY + valor;
		}
		return "\"" + valor + "\"";
	}

	private void buildJsMenu(MenuItem menuItem, StringBuilder javascript, String parentMenu) {

		String menuName = "menu" + (idMenuItem++);
		javascript.append("var ");
		javascript.append(menuName);
		javascript.append(" = new MenuItem(");
		javascript.append(getStringParam(StringEscapeUtils.escapeEcmaScript(menuItem.getTitulo())));
		javascript.append(',');
		javascript.append(getStringParam(getImageUrl(menuItem.getImagem())));
		javascript.append(',');
		javascript.append("" + menuItem.getWidth());
		javascript.append(',');
		javascript.append("" + menuItem.getHeight());
		javascript.append(',');
		javascript.append(getStringParam(getUrlDestino(menuItem)));
		javascript.append(',');
		javascript.append(getStringParam(menuItem.getTarget() == null ? null : menuItem.getTarget().getTargetHTMLString()));
		javascript.append(',');
		javascript.append("" + menuItem.getOnclick());
		javascript.append(',');
		javascript.append("" + menuItem.getOnmouseover());
		javascript.append(',');
		javascript.append("" + menuItem.getOnmouseout());
		javascript.append(',');
		javascript.append(getStringParam(menuItem.getAlign()));
		javascript.append(");\r\n");
		if (menuItem.getToolTip() != null) {
			javascript.append(menuName);
			javascript.append(".hint = ");
			javascript.append(getStringParam(StringEscapeUtils.escapeEcmaScript(menuItem.getToolTip())));
			javascript.append(";\r\n");
		}
		if (parentMenu != null) {
			javascript.append(menuName);
			javascript.append(".setParentMenuItem(");
			javascript.append(parentMenu);
			javascript.append(");\r\n");
		} else {
			javascript.append("menus.push(");
			javascript.append(menuName);
			javascript.append(");\r\n");
		}
		for (MenuItem subMenuItem : menuItem.getSubMenus()) {
			buildJsMenu(subMenuItem, javascript, menuName);
		}
	}

	private CharSequence getUrlDestino(MenuItem menuItem) {
		Class<? extends Page> pageClass = menuItem.getPageClass();
		if (pageClass == null) {
			return menuItem.getUrlDestino();
		}
		return urlFor(pageClass, menuItem.getPageParameters());
	}

	private CharSequence getImageUrl(ResourceReference imagem) {
		if (imagem != null) {
			return RequestCycle.get().urlFor(imagem, null);
		}
		return null;
	}

	/**
	 * @return the insertPosition
	 */
	public String getInsertPosition() {
		return insertPosition;
	}

	/**
	 * @param insertPosition
	 *            the insertPosition to set
	 * @return
	 */
	public MenuBar setInsertPosition(String position) {
		this.insertPosition = position;
		return this;
	}

	/**
	 * Javascript library.
	 * 
	 * @param jsLibrary
	 * @return
	 */
	public MenuBar setJsLibrary(JSLibrary jsLibrary) {
		this.jsLibrary = jsLibrary;
		return this;
	}
}
