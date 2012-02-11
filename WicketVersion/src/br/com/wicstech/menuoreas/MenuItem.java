package br.com.wicstech.menuoreas;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.wicket.Page;
import org.apache.wicket.PageParameters;
import org.apache.wicket.ResourceReference;

/**
 * Item de menu.
 * 
 * @author Sergio
 * 
 */
public class MenuItem implements Serializable {
	private static final long serialVersionUID = 4602042305416858668L;

	/**
	 * T�tulo do menu.
	 */
	private String titulo,

	/**
	 * Url de destino do link do menu.
	 */
	urlDestino,

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

	/**
	 * P�gina de destino do link.
	 */
	private Class<? extends Page> pageClass;

	/**
	 * Par�metros da p�gina, se existirem.
	 */
	private PageParameters pageParameters;

	/**
	 * @param titulo
	 * @param imagem
	 * @param pageClass
	 * @param pageParameters
	 */
	public MenuItem(String titulo, ResourceReference imagem, Class<? extends Page> pageClass, PageParameters pageParameters) {
		super();
		this.titulo = titulo;
		this.imagem = imagem;
		this.pageClass = pageClass;
		this.pageParameters = pageParameters;
	}

	/**
	 * Construtor do menu com um t�tulo, imagem e url de destino do menu.
	 * 
	 * @param titulo
	 * @param imagem
	 * @param pageClass
	 */
	public MenuItem(String titulo, ResourceReference imagem, Class<? extends Page> pageClass) {
		this.titulo = titulo;
		this.imagem = imagem;
		this.pageClass = pageClass;
	}

	/**
	 * Construtor com t�tulo e destino.
	 * 
	 * @param titulo
	 * @param urlDestino
	 */
	public MenuItem(String titulo, String urlDestino) {
		super();
		this.titulo = titulo;
		this.urlDestino = urlDestino;
	}

	/**
	 * Construtor.
	 * 
	 * @param titulo
	 * @param pageClass
	 */
	public MenuItem(String titulo, Class<? extends Page> pageClass) {
		this.titulo = titulo;
		this.pageClass = pageClass;
	}

	/**
	 * Construtor do menu somente com t�tulo.
	 * 
	 * @param titulo
	 */
	public MenuItem(String titulo) {
		this.titulo = titulo;
	}

	/**
	 * Construtor do menu com uma imagem e um t�tulo.
	 * 
	 * @param titulo
	 * @param imagem
	 */
	public MenuItem(String titulo, ResourceReference imagem) {
		this(titulo, imagem, null);
	}

	/**
	 * @see MenuItem#getTitulo()
	 * 
	 * @return the titulo
	 */
	public String getTitulo() {
		return titulo;
	}

	/**
	 * T�tulo ou label do item de menu.
	 * 
	 * @param titulo
	 *            the titulo to set
	 */
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	/**
	 * @see MenuItem#setWidth(Integer)
	 * 
	 * @return the width
	 */
	public Integer getWidth() {
		return width;
	}

	/**
	 * Largura do item de menu. Caso n�o especificada ser� considerada a largura
	 * definida nas configura��es de n�veis.
	 * 
	 * @param width
	 *            the width to set
	 */
	public void setWidth(Integer width) {
		this.width = width;
	}

	/**
	 * @see MenuItem#setHeight(Integer)
	 * @return the height
	 */
	public Integer getHeight() {
		return height;
	}

	/**
	 * Altura do item de menu. Caso n�o especificado ser� considerado a altura
	 * definida nas configura��es de n�veis.
	 * 
	 * @param height
	 *            the height to set
	 */
	public void setHeight(Integer height) {
		this.height = height;
	}

	/**
	 * @see MenuItem#setPageClass(String)
	 * @return the pageClass
	 */
	public Class<? extends Page> getPageClass() {
		return pageClass;
	}

	/**
	 * Atribui a p�gina que ser� chamada quando o item de menu for clicado.
	 * 
	 * @param pageClass
	 *            the pageClass to set
	 */
	public void setPageClass(Class<? extends Page> page) {
		this.pageClass = page;
	}

	/**
	 * @see MenuItem#setToolTip(String)
	 * @return the toolTip
	 */
	public String getToolTip() {
		return toolTip;
	}

	/**
	 * Dica a ser mostrada quando o mouse estiver por cima deste item de menu.
	 * 
	 * @param toolTip
	 *            the toolTip to set
	 */
	public void setToolTip(String toolTip) {
		this.toolTip = toolTip;
	}

	/**
	 * Alvo da janela que se abrir� quando o item de menu for clicado.
	 * 
	 * @return the target
	 */
	public String getTarget() {
		return target;
	}

	/**
	 * @param target
	 *            the target to set
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
	 * Alinhamento do texto do label (t�tulo) do menu.
	 * 
	 * @param align
	 *            the align to set
	 */
	public void setAlign(String align) {
		this.align = align;
	}

	/**
	 * Lista de sub-menus adicionados.
	 * 
	 * @return the subMenus
	 */
	List<MenuItem> getSubMenus() {
		return subMenus;
	}

	/**
	 * Adicionar um submenu neste item de menu.
	 * 
	 * @param menuItem
	 * @return
	 */
	public MenuItem addSubMenu(MenuItem... menuItem) {
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
	 * Refer�ncia ao recurso de imagem do bot�o do item de menu.
	 * 
	 * @param imagem
	 *            the imagem to set
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
	 * Fun��o javascript a ser chamada quando o bot�o for clicado.
	 * 
	 * @param onclick
	 *            the onclick to set
	 */
	void setOnclick(String onclick) {
		this.onclick = onclick;
	}

	/**
	 * @see MenuItem#setOnmouseover(String)
	 * @return the onmouseover
	 */
	String getOnmouseover() {
		return onmouseover;
	}

	/**
	 * Fun��o javascript que � acionada quando o mouse est� por cima do item de
	 * menu.
	 * 
	 * @param onmouseover
	 *            the onmouseover to set
	 */
	void setOnmouseover(String onmouseover) {
		this.onmouseover = onmouseover;
	}

	/**
	 * @see MenuItem#setOnmouseout(String)
	 * @return the onmouseout
	 */
	String getOnmouseout() {
		return onmouseout;
	}

	/**
	 * Fun��o javascript quando o mouse sai de cima do item de menu.
	 * 
	 * @param onmouseout
	 *            the onmouseout to set
	 */
	void setOnmouseout(String onmouseout) {
		this.onmouseout = onmouseout;
	}

	/**
	 * @return the urlDestino
	 */
	public String getUrlDestino() {
		return urlDestino;
	}

	/**
	 * @param urlDestino
	 *            the urlDestino to set
	 */
	public void setUrlDestino(String urlDestino) {
		this.urlDestino = urlDestino;
	}

	/**
	 * @return the pageParameters
	 */
	public PageParameters getPageParameters() {
		return pageParameters;
	}

	/**
	 * @param pageParameters
	 *            the pageParameters to set
	 */
	public void setPageParameters(PageParameters pageParameters) {
		this.pageParameters = pageParameters;
	}

}
