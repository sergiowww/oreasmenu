package br.com.wicstech.menuoreas;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;
import org.apache.wicket.Application;
import org.apache.wicket.Page;
import org.apache.wicket.RequestCycle;
import org.apache.wicket.ResourceReference;
import org.apache.wicket.markup.ComponentTag;
import org.apache.wicket.markup.MarkupStream;
import org.apache.wicket.markup.html.IHeaderContributor;
import org.apache.wicket.markup.html.IHeaderResponse;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.model.Model;
import org.apache.wicket.model.util.ListModel;
import org.apache.wicket.util.string.JavascriptUtils;

/**
 * Barra de menu.
 * 
 * @author Sergio
 * 
 */
public class MenuBar extends WebMarkupContainer implements IHeaderContributor {
	private static final long serialVersionUID = 407350644693710014L;

	private static final String FECHA_CHAMADA = ");";
	private static final String QUEBRA_LINHA = "\r\n";
	private static final char VIRGULA = ',';
	private static final String VARIABLE_PREFIX = "m";
	private static final String JS_NULL_STRING = "null";

	private static final ResourceReference JS_OREAS_PROTOTYPE = new ResourceReference(MenuBar.class, "js/oreasmenu-prototype.js");
	private static final ResourceReference JS_OREAS_JQUERY = new ResourceReference(MenuBar.class, "js/oreasmenu-jquery.js");
	private static final ResourceReference JS_COMMONS = new ResourceReference(MenuBar.class, "js/commons.js");

	private JSLibrary jsLibrary = JSLibrary.PROTOTYPE_JS;

	private String idContainer;
	private String menuGroup;
	private InsertPosition insertPosition = InsertPosition.TOP;

	private List<Nivel> niveis = new ArrayList<Nivel>();

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
	 * Construtor somente com o id.
	 * 
	 * @param id
	 */
	public MenuBar(String id) {
		this(id, new ArrayList<MenuItem>());
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
		response.renderJavascriptReference(jsLibrary.getLib(), jsLibrary.getId());
		response.renderJavascriptReference(JS_COMMONS);
		if (JSLibrary.JQUERY.equals(jsLibrary)) {
			response.renderJavascriptReference(JS_OREAS_JQUERY);
		}
		if (JSLibrary.PROTOTYPE_JS.equals(jsLibrary)) {
			response.renderJavascriptReference(JS_OREAS_PROTOTYPE);
		}
		renderMenu(response);
	}

	@Override
	protected void onComponentTagBody(MarkupStream markupStream, ComponentTag openTag) {
		super.onComponentTagBody(markupStream, openTag);
		JavascriptUtils.writeOpenTag(getResponse());
		getResponse().write("MenuBar.");
		getResponse().write(this.idContainer);
		getResponse().write("();");

		JavascriptUtils.writeCloseTag(getResponse());
	}

	private void renderMenu(IHeaderResponse response) {
		StringBuilder javascript = new StringBuilder("if(typeof MenuBar == \"undefined\"){MenuBar = new Object();}");
		javascript.append("MenuBar.");
		javascript.append(this.idContainer);
		javascript.append("= function(){");

		javascript.append("var menus = new Array();");
		adicionarQuebraLinha(javascript);
		List<MenuItem> menuItens = getMenuList();
		buildJsMenu(menuItens, javascript, null);
		buildNivelConfig(javascript);
		javascript.append(";}");
		response.renderJavascript(javascript.toString(), "javascript" + getMarkupId());
	}

	/**
	 * Gerar chamada as configurações de níveis do menu.
	 * 
	 * @param javascript
	 */
	private void buildNivelConfig(StringBuilder javascript) {
		if (this.niveis.isEmpty()) {
			throw new IllegalArgumentException("É necessário fornecer ao menos um nível para determinar as configurações do menu!");
		}
		String varFactoryMenu = "factory" + menuGroup;
		javascript.append("var ");
		javascript.append(varFactoryMenu);
		javascript.append("=new FactoryMenu(menus,");
		javascript.append(getStringParam(menuGroup));
		javascript.append(VIRGULA);
		javascript.append(getStringParam(idContainer));
		javascript.append(VIRGULA);
		javascript.append(getStringParam(insertPosition.name().toLowerCase()));
		javascript.append(FECHA_CHAMADA);

		adicionarQuebraLinha(javascript);
		for (Nivel nivel : this.niveis) {
			javascript.append(varFactoryMenu);
			javascript.append(".addNivel(new Nivel(");
			javascript.append(nivel.getOrientacao());

			javascript.append(VIRGULA);
			javascript.append(getStringParam(nivel.getStyleClass()));

			javascript.append(VIRGULA);
			javascript.append(getStringParam(nivel.getStyleClassHover()));

			if (nivel.getImagemSeta() == null) {
				javascript.append(VIRGULA).append(JS_NULL_STRING);
			} else {
				javascript.append(VIRGULA);
				javascript.append(getStringParam(getImageUrl(nivel.getImagemSeta())));
			}
			javascript.append(VIRGULA);
			javascript.append(nivel.getWidthDefault());
			javascript.append(VIRGULA);
			javascript.append(nivel.getHeightDefault());
			javascript.append(VIRGULA);
			javascript.append(nivel.isTamanhoRelativo());
			javascript.append(VIRGULA);
			javascript.append(nivel.isAlinharCoordenadaXMenuPai());
			javascript.append(VIRGULA);
			javascript.append(nivel.isExpandirSubNiveis());
			javascript.append(')');
			if (nivel.getAjusteDistanciaMenu() != null) {
				javascript.append(".setAjusteDistanciaMenu(");
				javascript.append(nivel.getAjusteDistanciaMenu());
				javascript.append(')');
			}
			javascript.append(FECHA_CHAMADA);
			adicionarQuebraLinha(javascript);
		}
		javascript.append(varFactoryMenu);
		javascript.append(".construirMenu()");
	}

	private String getStringParam(CharSequence valor) {
		if (valor == null) {
			return StringUtils.EMPTY + valor;
		}
		return "\"" + valor + "\"";
	}

	private void buildJsMenu(List<MenuItem> menus, StringBuilder javascript, StringBuilder parentMenu) {
		int indiceMenu = NumberUtils.INTEGER_ZERO;
		StringBuilder baseName = null;
		if (parentMenu == null) {
			baseName = new StringBuilder(VARIABLE_PREFIX);
		} else {
			baseName = new StringBuilder(parentMenu).append('_');
		}

		for (MenuItem menuItem : menus) {
			javascript.append("var ");
			StringBuilder menuName = new StringBuilder(baseName);
			menuName.append(indiceMenu++);
			javascript.append(menuName);
			javascript.append(" = new MenuItem(");
			javascript.append(getStringParam(StringEscapeUtils.escapeJavaScript(menuItem.getTitulo())));
			javascript.append(VIRGULA);
			javascript.append(getStringParam(getImageUrl(menuItem.getImagem())));
			javascript.append(VIRGULA);
			javascript.append(menuItem.getWidth());
			javascript.append(VIRGULA);
			javascript.append(menuItem.getHeight());
			javascript.append(VIRGULA);
			javascript.append(getStringParam(getUrlDestino(menuItem)));
			javascript.append(VIRGULA);
			javascript.append(getStringParam(menuItem.getTarget() == null ? null : menuItem.getTarget().getTargetHTMLString()));
			javascript.append(VIRGULA);
			javascript.append(menuItem.getOnclick());
			javascript.append(VIRGULA);
			javascript.append(menuItem.getOnmouseover());
			javascript.append(VIRGULA);
			javascript.append(menuItem.getOnmouseout());
			javascript.append(VIRGULA);
			javascript.append(getStringParam(menuItem.getAlign()));
			javascript.append(FECHA_CHAMADA);
			adicionarQuebraLinha(javascript);
			if (menuItem.getToolTip() != null) {
				javascript.append(menuName);
				javascript.append(".hint = ");
				javascript.append(getStringParam(StringEscapeUtils.escapeJavaScript(menuItem.getToolTip())));
				javascript.append(';');
				adicionarQuebraLinha(javascript);
			}
			if (parentMenu != null) {
				javascript.append(menuName);
				javascript.append(".setParentMenuItem(");
				javascript.append(parentMenu);
				javascript.append(FECHA_CHAMADA);
				adicionarQuebraLinha(javascript);
			} else {
				javascript.append("menus.push(");
				javascript.append(menuName);
				javascript.append(FECHA_CHAMADA);
				adicionarQuebraLinha(javascript);
			}
			buildJsMenu(menuItem.getSubMenus(), javascript, menuName);
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

	/**
	 * @return Lista de menus
	 */
	@SuppressWarnings("unchecked")
	public List<MenuItem> getMenuList() {
		return (List<MenuItem>) getDefaultModelObject();
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

	private void adicionarQuebraLinha(StringBuilder javascript) {
		if (Application.DEVELOPMENT.equals(getApplication().getConfigurationType())) {
			javascript.append(QUEBRA_LINHA);
		}
	}

	/**
	 * @param jsLibrary
	 *            Biblioteca javascript que o menu deve utilizar, se não
	 *            informado o padrão é o prototype.
	 */
	public void setJsLibrary(JSLibrary jsLibrary) {
		this.jsLibrary = jsLibrary;
	}

	/**
	 * @return the insertPosition
	 */
	public InsertPosition getInsertPosition() {
		return insertPosition;
	}

	/**
	 * @param insertPosition
	 *            the insertPosition to set
	 * @return
	 */
	public MenuBar setInsertPosition(InsertPosition insertPosition) {
		this.insertPosition = insertPosition;
		return this;
	}
}
