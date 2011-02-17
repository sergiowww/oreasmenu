package br.com.wicstech.menuoreas;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.wicket.ResourceReference;

/**
 * Item de menu.
 * @author Sergio
 *
 */
public class MenuItem implements Serializable{
	private static final long serialVersionUID = 4602042305416858668L;

	/**
	 * Título do menu.
	 */
	private String titulo,
	
	/**
	 * Página de destino do link.
	 */
	page,
	
	/**
	 * Janela destino do menu (_blank, _self)
	 */
	target,
	
	/**
	 * Alinhamento do texto do menu.
	 */
	align,
	
	/**
	 * Dica da ferramenta
	 */
	toolTip,
	
	/**
	 * Evento javascript ao clicar no item de menu.
	 */
	onclick,
	
	/**
	 * Evento javascript ao passar o mouse por cima do item de menu.
	 */
	onmouseover,
	
	/**
	 * Ao retirar o mouse de cima do item de menu.
	 */
	onmouseout;
	
	/**
	 * Imagem do menu.
	 */
	private ResourceReference imagem;
	
	/**
	 * Largura do item de menu.
	 */
	private Integer width,
	
	/**
	 * Altura do item de menu.
	 */
	height;
	
	/**
	 * Lista de submenus.
	 */
	private List<MenuItem> subMenus = new ArrayList<MenuItem>();
	
	

	public MenuItem(String titulo, ResourceReference imagem, CharSequence urlDestino) {
		this.titulo = titulo;
		this.imagem = imagem;
		if(urlDestino != null){
			this.page = urlDestino.toString();
		}
		
	}
	public MenuItem(String titulo, ResourceReference imagem) {
		this(titulo, imagem, null);
	}

	/**
	 * @return the titulo
	 */
	public String getTitulo() {
		return titulo;
	}

	/**
	 * @param titulo the titulo to set
	 */
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	/**
	 * @return the width
	 */
	public Integer getWidth() {
		return width;
	}

	/**
	 * @param width the width to set
	 */
	public void setWidth(Integer width) {
		this.width = width;
	}

	/**
	 * @return the height
	 */
	public Integer getHeight() {
		return height;
	}

	/**
	 * @param height the height to set
	 */
	public void setHeight(Integer height) {
		this.height = height;
	}

	/**
	 * @return the page
	 */
	public String getPage() {
		return page;
	}

	/**
	 * @param page the page to set
	 */
	public void setPage(String page) {
		this.page = page;
	}

	/**
	 * @return the toolTip
	 */
	public String getToolTip() {
		return toolTip;
	}

	/**
	 * @param toolTip the toolTip to set
	 */
	public void setToolTip(String toolTip) {
		this.toolTip = toolTip;
	}

	/**
	 * @return the target
	 */
	public String getTarget() {
		return target;
	}

	/**
	 * @param target the target to set
	 */
	public void setTarget(String target) {
		this.target = target;
	}

	/**
	 * @return the align
	 */
	public String getAlign() {
		return align;
	}

	/**
	 * @param align the align to set
	 */
	public void setAlign(String align) {
		this.align = align;
	}

	/**
	 * @return the subMenus
	 */
	List<MenuItem> getSubMenus() {
		return subMenus;
	}
	
	/**
	 * Adicionar um submenu.
	 * @param menuItem
	 * @return 
	 */
	public MenuItem addSubMenu(MenuItem ... menuItem){
		this.subMenus.addAll(Arrays.asList(menuItem));
		return this;
	}

	/**
	 * @return the imagem
	 */
	ResourceReference getImagem() {
		return imagem;
	}

	/**
	 * @param imagem the imagem to set
	 */
	void setImagem(ResourceReference imagem) {
		this.imagem = imagem;
	}

	/**
	 * @return the onclick
	 */
	String getOnclick() {
		return onclick;
	}

	/**
	 * @param onclick the onclick to set
	 */
	void setOnclick(String onclick) {
		this.onclick = onclick;
	}

	/**
	 * @return the onmouseover
	 */
	String getOnmouseover() {
		return onmouseover;
	}

	/**
	 * @param onmouseover the onmouseover to set
	 */
	void setOnmouseover(String onmouseover) {
		this.onmouseover = onmouseover;
	}

	/**
	 * @return the onmouseout
	 */
	String getOnmouseout() {
		return onmouseout;
	}

	/**
	 * @param onmouseout the onmouseout to set
	 */
	void setOnmouseout(String onmouseout) {
		this.onmouseout = onmouseout;
	}
	
}
