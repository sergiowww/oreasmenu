package br.com.wicstech.strutsmenuoreas;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

import net.sf.navigator.displayer.MenuDisplayerMapping;
import net.sf.navigator.displayer.MessageResourcesMenuDisplayer;
import net.sf.navigator.menu.MenuComponent;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.math.NumberUtils;

/**
 * Displayer do menu.
 * 
 * @author Sergio
 * 
 */
public class OreasMenuDisplayer extends MessageResourcesMenuDisplayer {
	private static final String FACTORY_PREFIX = "factory";
	private static final String KEY_INSERT_POSITION = "insert.position";
	private static final String KEY_ID_CONTAINER = "id.container";
	private static final String KEY_QUANTIDADE_NIVEIS = "quantidadeNiveis";
	private static final String KEY_NIVEL = "nivel.";
	private static final String KEY_ORIENTACAO = ".orientacao";
	private static final String KEY_STYLE_CLASS = ".styleClass";
	private static final String KEY_STYLE_CLASS_HOVER = ".styleClassHover";
	private static final String KEY_IMAGEM_SETA = ".imagemSeta";
	private static final String KEY_WIDTH_DEFAULT = ".widthDefault";
	private static final String KEY_HEIGHT_DEFAULT = ".heightDefault";
	private static final String KEY_TAMANHO_RELATIVO = ".tamanhoRelativo";

	@Override
	public void init(PageContext pageContext, MenuDisplayerMapping mapping) {
		super.init(pageContext, mapping);
		InputStream enginejs = OreasMenuDisplayer.class.getResourceAsStream("/br/com/wicstech/strutsmenuoreas/oreasmenu.js");
		InputStream configuracao = pageContext.getServletContext().getResourceAsStream(getConfig());
		try {
			out.print("<script type=\"text/javascript\">\r\n");
			IOUtils.copy(enginejs, out);
			out.print("</script>");
			Properties config = new Properties();
			config.load(configuracao);

			String varFactoryMenu = FACTORY_PREFIX + mapping.getName();
			StringBuilder javascript = new StringBuilder();
			String idContainer = config.getProperty(KEY_ID_CONTAINER);
			String insertPosition = config.getProperty(KEY_INSERT_POSITION);

			javascript.append("var " + varFactoryMenu + " = new FactoryMenu(menus, \"" + mapping.getName() + "\", \"" + idContainer + "\", \"" + insertPosition + "\");\r\n");

			for (int i = 0; i < NumberUtils.toInt(config.getProperty(KEY_QUANTIDADE_NIVEIS), 0); i++) {

				javascript.append(varFactoryMenu + ".addNivel(new Nivel(");
				javascript.append(config.getProperty(KEY_NIVEL + i + KEY_ORIENTACAO));

				javascript.append(",");
				javascript.append(getStringParam(config.getProperty(KEY_NIVEL + i + KEY_STYLE_CLASS)));
				javascript.append("");

				javascript.append(",");
				javascript.append(getStringParam(config.getProperty(KEY_NIVEL + i + KEY_STYLE_CLASS_HOVER)));
				javascript.append("");

				String imagemSeta = config.getProperty(KEY_NIVEL + i + KEY_IMAGEM_SETA);
				if (StringUtils.isBlank(imagemSeta)) {
					javascript.append(", null");
				} else {
					javascript.append(",");
					javascript.append(getStringParam(imagemSeta));
					javascript.append("");
				}
				javascript.append(',');
				javascript.append(config.getProperty(KEY_NIVEL + i + KEY_WIDTH_DEFAULT));
				javascript.append(',');
				javascript.append(config.getProperty(KEY_NIVEL + i + KEY_HEIGHT_DEFAULT));
				javascript.append(',');
				javascript.append(config.getProperty(KEY_NIVEL + i + KEY_TAMANHO_RELATIVO));
				javascript.append("));\r\n");
			}
			out.print("<script type=\"text/javascript\">\r\n");
			out.print("var menus = new Array();\r\n");
			out.print(javascript);
		} catch (IOException e) {
			log.error(e, e);
		} finally {
			IOUtils.closeQuietly(configuracao);
			IOUtils.closeQuietly(enginejs);
		}
	}

	@Override
	public void end(PageContext pageContext) {
		try {
			String varFactoryMenu = FACTORY_PREFIX + mapping.getName();
			out.print(varFactoryMenu + ".construirMenu();");
			out.print("</script>");
		} catch (IOException e) {
			log.error(e, e);
		}

	}

	@Override
	public void display(MenuComponent menu) throws JspException, IOException {
		StringBuilder sb = new StringBuilder();
		buildMenuString(menu, sb, isAllowed(menu), null);
		out.print(sb);
	}

	private String getStringParam(String valor) {
		if (StringUtils.isBlank(valor)) {
			return StringUtils.EMPTY + valor;
		}
		return "\"" + valor + "\"";
	}

	protected void buildMenuString(MenuComponent menu, StringBuilder sb, boolean allowed, String parentMenu) {
		if (allowed) {

			String menuName = "menu" + StringEscapeUtils.escapeJavaScript(menu.getName());
			sb.append("var ");
			sb.append(menuName);
			sb.append(" = new MenuItem(");
			sb.append(getStringParam(StringEscapeUtils.escapeJavaScript(getMessage(menu.getTitle()))));
			sb.append(',');
			sb.append(getStringParam(StringUtils.replace(menu.getImage(), "\"", "\\\"")));
			sb.append(',');
			sb.append("" + menu.getWidth());
			sb.append(',');
			sb.append("" + menu.getHeight());
			sb.append(',');
			sb.append(getStringParam(menu.getUrl()));
			sb.append(',');
			sb.append(getStringParam(menuName));
			sb.append(',');
			sb.append(getStringParam(menu.getTarget()));
			sb.append(',');
			sb.append("" + menu.getOnclick());
			sb.append(',');
			sb.append("" + menu.getOnmouseover());
			sb.append(',');
			sb.append("" + menu.getOnmouseout());
			sb.append(',');
			sb.append(getStringParam(menu.getAlign()));
			sb.append(");\r\n");
			if (parentMenu != null) {
				sb.append(menuName);
				sb.append(".setParentMenuItem(");
				sb.append(parentMenu);
				sb.append(");\r\n");
			} else {
				sb.append("menus.push(");
				sb.append(menuName);
				sb.append(");\r\n");
			}

			MenuComponent[] subMenus = menu.getMenuComponents();

			if (subMenus.length > 0) {
				for (int i = 0; i < subMenus.length; i++) {
					buildMenuString(subMenus[i], sb, isAllowed(subMenus[i]), menuName);
				}
			}
		}
	}

}
