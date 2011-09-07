package br.com.wicstech.menuoreas;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.wicket.RequestCycle;
import org.apache.wicket.ResourceReference;
import org.apache.wicket.markup.html.IHeaderContributor;
import org.apache.wicket.markup.html.IHeaderResponse;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.model.util.ListModel;

/**
 * Barra de menu.
 * @author Sergio
 *
 */
public class MenuBar extends WebMarkupContainer implements IHeaderContributor{

	private static final long serialVersionUID = -8683400812756686255L;
	private static final String CONFIG_PART_INSERT_ELEMENT = "#{parentElement}",
	CONFIG_PART_INSERT_POS = "#{insertion}";

	
	private static final ResourceReference JS_PROTOTYPE = new ResourceReference(MenuBar.class, "libraries/prototype.js"),
	JS_OREASMENU_CONFIG = new ResourceReference(MenuBar.class, "js/oreasmenuConfig.js"),
	JS_OREASMENU = new ResourceReference(MenuBar.class, "js/oreasmenu.js");
	
	private String insertPosition = "top";
	private String idContainer;
	private List<Nivel> niveis = new ArrayList<Nivel>();
	private Integer idMenuItem = 0;
	
	/**
	 * 
	 * @param id identificador do elemento onde o menu será inserido.
	 * @param menuItens
	 */
	public MenuBar(String id, List<MenuItem> menuItens) {
		super(id, new ListModel<MenuItem>(menuItens));
		setOutputMarkupId(true);
		this.idContainer = getMarkupId();
	}
	

	/**
	 * Adicionar um nível no menu.
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
		
		javascript.append("FactoryMenu.construirMenu(menus);");
		javascript.append("});");
		response.renderJavascript(javascript, "buildMenu");
	}
	
	private String getStringParam(CharSequence valor){
		if(valor == null){
			return ""+valor;
		}
		return "\""+valor+"\"";
	}

	
	private void buildJsMenu(MenuItem menuItem, StringBuilder javascript,
			String parentMenu) {
		

        String menuName = "menu"+(idMenuItem++);
        javascript.append("var ");
        javascript.append(menuName);
        javascript.append(" = new MenuItem(");
		javascript.append(getStringParam(menuItem.getTitulo()));
		javascript.append(',');
		javascript.append(getStringParam(getImageUrl(menuItem.getImagem())));
        javascript.append(',');
        javascript.append(""+menuItem.getWidth());
        javascript.append(',');
        javascript.append(""+menuItem.getHeight());
        javascript.append(',');
        javascript.append(getStringParam(menuItem.getPage()));
        javascript.append(',');
        javascript.append(getStringParam(menuName));
        javascript.append(',');
        javascript.append(getStringParam(menuItem.getTarget()));
        javascript.append(',');
        javascript.append(""+menuItem.getOnclick());
        javascript.append(',');
        javascript.append(""+menuItem.getOnmouseover());
        javascript.append(',');
        javascript.append(""+menuItem.getOnmouseout());
        javascript.append(',');
        javascript.append(getStringParam(menuItem.getAlign()));
        javascript.append(");\r\n");
        if(parentMenu != null){
        	javascript.append(menuName);
        	javascript.append(".setParentMenuItem(");
        	javascript.append(parentMenu);
        	javascript.append(");\r\n");
        }else{
        	javascript.append("menus.push(");
        	javascript.append(menuName);
        	javascript.append(");\r\n");
        }
		for (MenuItem subMenuItem : menuItem.getSubMenus()) {
			buildJsMenu(subMenuItem, javascript, menuName);
		}
	}


	private CharSequence getImageUrl(ResourceReference imagem) {
		if(imagem != null){
			return RequestCycle.get().urlFor(imagem);
		}
		return null;
	}


	private void renderConfig(IHeaderResponse response) {
		String config = MenuUtil.getResourceContentAsString(JS_OREASMENU_CONFIG);
		config = StringUtils.replace(config, CONFIG_PART_INSERT_ELEMENT, idContainer);
		config = StringUtils.replace(config, CONFIG_PART_INSERT_POS, insertPosition);
		StringBuilder builderConfig = new StringBuilder(config);
		for (Nivel nivel : this.niveis) {
			builderConfig.append("FactoryMenu.addNivel(new Nivel(");
			builderConfig.append(nivel.isOrientacao());
			
			builderConfig.append(",");
			builderConfig.append(getStringParam(nivel.getStyleClass()));
			builderConfig.append("");
			
			builderConfig.append(",");
			builderConfig.append(getStringParam(nivel.getStyleClassHover()));
			builderConfig.append("");
			
			if(nivel.getImagemSeta() == null){
				builderConfig.append(", null");
			}else{
				builderConfig.append(",");
				builderConfig.append(getStringParam(getImageUrl(nivel.getImagemSeta())));
				builderConfig.append("");
			}
			builderConfig.append(',');
			builderConfig.append(nivel.getWidthDefault());
			builderConfig.append(',');
			builderConfig.append(nivel.getHeightDefault());
			builderConfig.append("));\r\n");
		}
		response.renderJavascript(builderConfig, "menuBuildConfig");
	}


	/**
	 * @return the insertPosition
	 */
	public String getInsertPosition() {
		return insertPosition;
	}


	/**
	 * @param insertPosition the insertPosition to set
	 */
	public void setInsertPosition(String position) {
		this.insertPosition = position;
	}
}
