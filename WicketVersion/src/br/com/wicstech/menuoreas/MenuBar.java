package br.com.wicstech.menuoreas;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.wicket.Page;
import org.apache.wicket.RequestCycle;
import org.apache.wicket.ResourceReference;
import org.apache.wicket.markup.html.IHeaderContributor;
import org.apache.wicket.markup.html.IHeaderResponse;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.model.util.ListModel;

/**
 * Barra de menu.
 * 
 * @author Sergio
 * 
 */
public class MenuBar extends WebMarkupContainer implements IHeaderContributor {

	private static final long serialVersionUID = -8683400812756686255L;
	private static final String CONFIG_PART_INSERT_ELEMENT = "#{parentElement}", CONFIG_PART_INSERT_POS = "#{insertion}";

	private static final ResourceReference JS_PROTOTYPE = new ResourceReference(MenuBar.class, "libraries/prototype.js"), JS_OREASMENU_CONFIG = new ResourceReference(MenuBar.class, "js/oreasmenuConfig.js"), JS_OREASMENU = new ResourceReference(MenuBar.class, "js/oreasmenu.js");

	private String idContainer, menuGroup, insertPosition = "top";

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
	 * Adicionar um nível no menu.
	 * 
	 * @param nivel
	 */
	public void addNivel(Nivel nivel) {
		niveis.add(nivel);
	}

	public void renderHead(IHeaderResponse response) {
		response.renderJavascriptReference(JS_PROTOTYPE, "prototype");
		response.renderJavascriptReference(JS_OREASMENU, "oreasmenu");
		renderConfig(response);
		renderMenu(response);
	}

	@SuppressWarnings("unchecked")
	private void renderMenu(IHeaderResponse response) {
		StringBuilder javascript = new StringBuilder("Event.observe(window, \"load\", function(){");
		javascript.append("var menus = new Array();\r\n");
		List<MenuItem> menuItens = (List<MenuItem>) getDefaultModelObject();
		for (MenuItem menuItem : menuItens) {
			buildJsMenu(menuItem, javascript, null);
		}

		buildNivelConfig(javascript);

		javascript.append("});");
		response.renderJavascript(javascript, "buildMenu" + menuGroup);
	}

	private void buildNivelConfig(StringBuilder javascript) {
		String varFactoryMenu = "factory" + menuGroup;
		javascript.append("var " + varFactoryMenu + " = new FactoryMenu(menus, \"" + menuGroup + "\");\r\n");

		for (Nivel nivel : this.niveis) {
			javascript.append(varFactoryMenu + ".addNivel(new Nivel(");
			javascript.append(nivel.isOrientacao());

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
			javascript.append("));\r\n");
		}
		javascript.append(varFactoryMenu + ".construirMenu();\r\n");
	}

	private String getStringParam(CharSequence valor) {
		if (valor == null) {
			return "" + valor;
		}
		return "\"" + valor + "\"";
	}

	private void buildJsMenu(MenuItem menuItem, StringBuilder javascript, String parentMenu) {

		String menuName = "menu" + (idMenuItem++);
		javascript.append("var ");
		javascript.append(menuName);
		javascript.append(" = new MenuItem(");
		javascript.append(getStringParam(StringEscapeUtils.escapeJavaScript(menuItem.getTitulo())));
		javascript.append(',');
		javascript.append(getStringParam(getImageUrl(menuItem.getImagem())));
		javascript.append(',');
		javascript.append("" + menuItem.getWidth());
		javascript.append(',');
		javascript.append("" + menuItem.getHeight());
		javascript.append(',');
		javascript.append(getStringParam(getUrlDestino(menuItem)));
		javascript.append(',');
		javascript.append(getStringParam(StringEscapeUtils.escapeJavaScript(menuName)));
		javascript.append(',');
		javascript.append(getStringParam(menuItem.getTarget()));
		javascript.append(',');
		javascript.append("" + menuItem.getOnclick());
		javascript.append(',');
		javascript.append("" + menuItem.getOnmouseover());
		javascript.append(',');
		javascript.append("" + menuItem.getOnmouseout());
		javascript.append(',');
		javascript.append(getStringParam(menuItem.getAlign()));
		javascript.append(");\r\n");
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
			return RequestCycle.get().urlFor(imagem);
		}
		return null;
	}

	private void renderConfig(IHeaderResponse response) {
		String config = MenuUtil.getResourceContentAsString(JS_OREASMENU_CONFIG);
		config = StringUtils.replace(config, CONFIG_PART_INSERT_ELEMENT, idContainer);
		config = StringUtils.replace(config, CONFIG_PART_INSERT_POS, insertPosition);
		config = StringUtils.replace(config, "/*menuGroup*/", this.menuGroup);

		response.renderJavascript(config, "menuBuildConfig" + menuGroup);
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
	 */
	public void setInsertPosition(String position) {
		this.insertPosition = position;
	}
}
