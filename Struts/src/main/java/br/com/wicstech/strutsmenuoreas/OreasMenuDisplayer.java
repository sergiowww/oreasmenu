package br.com.wicstech.strutsmenuoreas;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.PageContext;

import net.sf.navigator.displayer.MenuDisplayerMapping;
import net.sf.navigator.displayer.MessageResourcesMenuDisplayer;
import net.sf.navigator.menu.MenuComponent;

import org.apache.commons.lang.StringUtils;


public class OreasMenuDisplayer extends MessageResourcesMenuDisplayer {
	@Override
	public void init(PageContext pageContext, MenuDisplayerMapping mapping) {
		super.init(pageContext, mapping);
		try {
			out.print("<script type=\"text/javascript\">\r\n");
			out.print("Event.observe(window, \"load\", function(){");
			out.print("var menus = new Array();\r\n");
		} catch (IOException e) {
			log.error(e, e);
		}
	}
	@Override
	public void end(PageContext pageContext) {
		try {
			out.print("FactoryMenu.construirMenu(menus);");
			out.print("});");
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
	private String getStringParam(String valor){
		if(valor == null){
			return ""+valor;
		}
		return "\""+valor+"\"";
	}
	protected void buildMenuString(MenuComponent menu, StringBuilder sb, boolean allowed, String parentMenu) {
        if (allowed) {
        	
        	short parte = (short) Math.abs((short) (Math.random()*100000));
            String menuName = "menu"+parte;
            sb.append("var ");
            sb.append(menuName);
            sb.append(" = new MenuItem(");
			sb.append(getStringParam(getMessage(menu.getTitle())));
			sb.append(',');
			sb.append(getStringParam(StringUtils.replace(menu.getImage(), "\"", "\\\"")));
	        sb.append(',');
	        sb.append(""+menu.getWidth());
	        sb.append(',');
	        sb.append(""+menu.getHeight());
	        sb.append(',');
	        sb.append(getStringParam(menu.getUrl()));
	        sb.append(',');
	        sb.append(getStringParam(menuName));
	        sb.append(',');
	        sb.append(getStringParam(menu.getTarget()));
	        sb.append(',');
	        sb.append(""+menu.getOnclick());
	        sb.append(',');
	        sb.append(""+menu.getOnmouseover());
	        sb.append(',');
	        sb.append(""+menu.getOnmouseout());
	        sb.append(',');
	        sb.append(getStringParam(menu.getAlign()));
	        sb.append(");\r\n");
	        if(parentMenu != null){
	        	sb.append(menuName);
	        	sb.append(".setParentMenuItem(");
	        	sb.append(parentMenu);
	        	sb.append(");\r\n");
	        }else{
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
