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
	 * Título do menu.
	 */
	private String titulo,

	/**
	 * Url de destino do link do menu.
	 */
	urlDestino,

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
	 * Página de destino do link.
	 */
	private Class<? extends Page> pageClass;

	/**
	 * Janela destino do link do menu.
	 */
	private LinkTarget target;

	/**
	 * Parâmetros da página, se existirem.
	 */
	private PageParameters pageParameters;

	/**
	 * @param titulo
	 * @param imagem
	 * @param urlDestino
	 */
	public MenuItem(String titulo, ResourceReference imagem, String urlDestino) {
		super();
		this.titulo = titulo;
		this.imagem = imagem;
		this.urlDestino = urlDestino;
	}

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
	 * Construtor do menu com um título, imagem e url de destino do menu.
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
	 * Construtor com título e destino.
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
	 * Construtor do menu somente com título.
	 * 
	 * @param titulo
	 */
	public MenuItem(String titulo) {
		this.titulo = titulo;
	}

	/**
	 * Construtor do menu com uma imagem e um título.
	 * 
	 * @param titulo
	 * @param imagem
	 */
	public MenuItem(String titulo, ResourceReference imagem) {
		this.imagem = imagem;
		this.titulo = titulo;
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
	 * Título ou label do item de menu.
	 * 
	 * @param titulo
	 *            the titulo to set
	 * @return
	 */
	public MenuItem setTitulo(String titulo) {
		this.titulo = titulo;
		return this;
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
	 * Largura do item de menu. Caso não especificada será considerada a largura
	 * definida nas configurações de níveis.
	 * 
	 * @param width
	 *            the width to set
	 * @return
	 */
	public MenuItem setWidth(Integer width) {
		this.width = width;
		return this;
	}

	/**
	 * @see MenuItem#setHeight(Integer)
	 * @return the height
	 */
	public Integer getHeight() {
		return height;
	}

	/**
	 * Altura do item de menu. Caso não especificado será considerado a altura
	 * definida nas configurações de níveis.
	 * 
	 * @param height
	 *            the height to set
	 * @return
	 */
	public MenuItem setHeight(Integer height) {
		this.height = height;
		return this;
	}

	/**
	 * @see MenuItem#setPageClass(String)
	 * @return the pageClass
	 */
	public Class<? extends Page> getPageClass() {
		return pageClass;
	}

	/**
	 * Atribui a página que será chamada quando o item de menu for clicado.
	 * 
	 * @param pageClass
	 *            the pageClass to set
	 * @return
	 */
	public MenuItem setPageClass(Class<? extends Page> page) {
		this.pageClass = page;
		return this;
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
	 * @return
	 */
	public MenuItem setToolTip(String toolTip) {
		this.toolTip = toolTip;
		return this;
	}

	/**
	 * @return the align
	 */
	public String getAlign() {
		return align;
	}

	/**
	 * Alinhamento do texto do label (título) do menu.
	 * 
	 * @param align
	 *            the align to set
	 * @return
	 */
	public MenuItem setAlign(String align) {
		this.align = align;
		return this;
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
	public ResourceReference getImagem() {
		return imagem;
	}

	/**
	 * Referência ao recurso de imagem do botão do item de menu.
	 * 
	 * @param imagem
	 *            the imagem to set
	 * @return
	 */
	public MenuItem setImagem(ResourceReference imagem) {
		this.imagem = imagem;
		return this;
	}

	/**
	 * @return the onclick
	 */
	public String getOnclick() {
		return onclick;
	}

	/**
	 * Função javascript a ser chamada quando o botão for clicado.
	 * 
	 * @param onclick
	 *            the onclick to set
	 * @return
	 */
	public MenuItem setOnclick(String onclick) {
		this.onclick = onclick;
		return this;
	}

	/**
	 * @see MenuItem#setOnmouseover(String)
	 * @return the onmouseover
	 */
	public String getOnmouseover() {
		return onmouseover;
	}

	/**
	 * Função javascript que é acionada quando o mouse está por cima do item de
	 * menu.
	 * 
	 * @param onmouseover
	 *            the onmouseover to set
	 * @return
	 */
	public MenuItem setOnmouseover(String onmouseover) {
		this.onmouseover = onmouseover;
		return this;
	}

	/**
	 * @see MenuItem#setOnmouseout(String)
	 * @return the onmouseout
	 */
	public String getOnmouseout() {
		return onmouseout;
	}

	/**
	 * Função javascript quando o mouse sai de cima do item de menu.
	 * 
	 * @param onmouseout
	 *            the onmouseout to set
	 * @return
	 */
	public MenuItem setOnmouseout(String onmouseout) {
		this.onmouseout = onmouseout;
		return this;
	}

	/**
	 * URL de destino do item de menu clicado.
	 * 
	 * @return the urlDestino
	 */
	public String getUrlDestino() {
		return urlDestino;
	}

	/**
	 * URL de destino do link, quando não especificada o parâmetro
	 * {@link MenuItem#getPageClass()} deve ser especificado.
	 * 
	 * @param urlDestino
	 *            the urlDestino to set
	 * @return
	 */
	public MenuItem setUrlDestino(String urlDestino) {
		this.urlDestino = urlDestino;
		return this;
	}

	/**
	 * Parâmetros da página de destino do link.
	 * 
	 * @return the pageParameters
	 */
	public PageParameters getPageParameters() {
		return pageParameters;
	}

	/**
	 * @see MenuItem#getPageParameters()
	 * 
	 * @param pageParameters
	 *            the pageParameters to set
	 * @return
	 */
	public MenuItem setPageParameters(PageParameters pageParameters) {
		this.pageParameters = pageParameters;
		return this;
	}

	/**
	 * Alvo da janela que se abrirá quando o item de menu for clicado.
	 * 
	 * @return the target
	 */
	public LinkTarget getTarget() {
		return target;
	}

	/**
	 * @see MenuItem#getTarget()
	 * 
	 * @param target
	 *            the target to set
	 * @return
	 */
	public MenuItem setTarget(LinkTarget target) {
		this.target = target;
		return this;
	}

}
