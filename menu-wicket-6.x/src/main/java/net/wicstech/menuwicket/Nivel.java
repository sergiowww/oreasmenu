package net.wicstech.menuwicket;

import java.io.Serializable;

import org.apache.wicket.request.resource.ResourceReference;

/**
 * Configuração de nível. É possível definir configurações únicas para todo um
 * nível de menu.
 * 
 * @author Sergio
 * 
 */
public class Nivel implements Serializable {
	private static final long serialVersionUID = 4069467046986058750L;

	/**
	 * Orientação do menu, vertical ou horizontal
	 */
	private Orientacao orientacao;

	/**
	 * Indica se as dimensões do item de menu é em % ou em pixels.
	 */
	private boolean tamanhoRelativo;

	/**
	 * Indica se o próximo nível deve ser expandido automaticamente quando este
	 * for apresentado.
	 */
	private boolean expandirSubNiveis;

	/**
	 * Alinhar a coordenada x do submenu ao menu pai.
	 */
	private boolean alinharCoordenadaXMenuPai = true;

	/**
	 * Tipo do evento que mostra o próximo subnível.
	 */
	private EventoExibirSubMenu evento = EventoExibirSubMenu.ONMOUSEOVER;

	/**
	 * Imagem da seta.
	 */
	private ResourceReference imagemSeta;

	/**
	 * Classe de estilo padrão do item de menu.
	 */
	private String styleClass;

	/**
	 * Classe de estilo quando o mouse está acima do item de menu.
	 */
	private String styleClassHover;

	/**
	 * Largura padrão do item de menu.
	 */
	private Integer widthDefault;

	/**
	 * Altura padrão do item de menu.
	 */
	private Integer heightDefault;

	/**
	 * Ajuste de distância do submenu para o menu.
	 */
	private Integer ajusteDistanciaMenu;

	public Nivel(Orientacao orientacao, String styleClass, String styleClassHover, ResourceReference imagemSeta, Integer widthDefault, Integer heightDefault) {
		super();
		this.orientacao = orientacao;
		this.styleClass = styleClass;
		this.styleClassHover = styleClassHover;
		this.imagemSeta = imagemSeta;
		this.widthDefault = widthDefault;
		this.heightDefault = heightDefault;
	}

	/**
	 * @return the orientacao
	 */
	public Orientacao getOrientacao() {
		return orientacao;
	}

	/**
	 * @param orientacao
	 *            the orientacao to set
	 * @return
	 */
	public Nivel setOrientacao(Orientacao orientacao) {
		this.orientacao = orientacao;
		return this;
	}

	/**
	 * @return the imagemSeta
	 */
	public ResourceReference getImagemSeta() {
		return imagemSeta;
	}

	/**
	 * @param imagemSeta
	 *            the imagemSeta to set
	 * @return
	 */
	public Nivel setImagemSeta(ResourceReference imagemSeta) {
		this.imagemSeta = imagemSeta;
		return this;
	}

	/**
	 * @return the styleClass
	 */
	public String getStyleClass() {
		return styleClass;
	}

	/**
	 * @param styleClass
	 *            the styleClass to set
	 * @return
	 */
	public Nivel setStyleClass(String styleClass) {
		this.styleClass = styleClass;
		return this;
	}

	/**
	 * @return the styleClassHover
	 */
	public String getStyleClassHover() {
		return styleClassHover;
	}

	/**
	 * @param styleClassHover
	 *            the styleClassHover to set
	 * @return
	 */
	public Nivel setStyleClassHover(String styleClassHover) {
		this.styleClassHover = styleClassHover;
		return this;
	}

	/**
	 * @return the widthDefault
	 */
	public Integer getWidthDefault() {
		return widthDefault;
	}

	/**
	 * @param widthDefault
	 *            the widthDefault to set
	 * @return
	 */
	public Nivel setWidthDefault(Integer widthDefault) {
		this.widthDefault = widthDefault;
		return this;
	}

	/**
	 * @return the heightDefault
	 */
	public Integer getHeightDefault() {
		return heightDefault;
	}

	/**
	 * @param heightDefault
	 *            the heightDefault to set
	 * @return
	 */
	public Nivel setHeightDefault(Integer heightDefault) {
		this.heightDefault = heightDefault;
		return this;
	}

	/**
	 * @return the tamanhoRelativo
	 */
	public boolean isTamanhoRelativo() {
		return tamanhoRelativo;
	}

	/**
	 * @param tamanhoRelativo
	 *            the tamanhoRelativo to set
	 * @return
	 */
	public Nivel setTamanhoRelativo(boolean tamanhoRelativo) {
		this.tamanhoRelativo = tamanhoRelativo;
		return this;
	}

	public boolean isExpandirSubNiveis() {
		return expandirSubNiveis;
	}

	public Nivel setExpandirSubNiveis(boolean expandirSubNiveis) {
		this.expandirSubNiveis = expandirSubNiveis;
		return this;
	}

	/**
	 * @return the alinharCoordenadaXMenuPai
	 */
	public boolean isAlinharCoordenadaXMenuPai() {
		return alinharCoordenadaXMenuPai;
	}

	/**
	 * @param alinharCoordenadaXMenuPai
	 *            the alinharCoordenadaXMenuPai to set
	 * @return
	 */
	public Nivel setAlinharCoordenadaXMenuPai(boolean alinharCoordenadaXMenuPai) {
		this.alinharCoordenadaXMenuPai = alinharCoordenadaXMenuPai;
		return this;
	}

	/**
	 * @return the ajusteDistanciaMenu
	 */
	public Integer getAjusteDistanciaMenu() {
		return ajusteDistanciaMenu;
	}

	/**
	 * @param ajusteDistanciaMenu
	 *            the ajusteDistanciaMenu to set
	 * @return
	 */
	public Nivel setAjusteDistanciaMenu(Integer ajusteDistanciaMenu) {
		this.ajusteDistanciaMenu = ajusteDistanciaMenu;
		return this;
	}

	/**
	 * Método responsável por retornar evento.
	 * 
	 * @return evento
	 */
	public EventoExibirSubMenu getEvento() {
		return evento;
	}

	/**
	 * Método responsável por definir o campo evento.
	 * 
	 * @param evento
	 *            valor atribuído a evento
	 * @return
	 */

	public Nivel setEvento(EventoExibirSubMenu evento) {
		this.evento = evento;
		return this;
	}
}
