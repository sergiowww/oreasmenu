package br.com.wicstech.menuoreas;

import java.io.Serializable;

import org.apache.wicket.ResourceReference;

/**
 * Configura��o de n�vel. � poss�vel definir configura��es �nicas para todo um
 * n�vel de menu.
 * 
 * @author Sergio
 * 
 */
public class Nivel implements Serializable {
	private static final long serialVersionUID = 4069467046986058750L;

	/**
	 * Orienta��o do menu, vertical ou horizontal
	 */
	private Orientacao orientacao;

	/**
	 * Indica se as dimens�es do item de menu � em % ou em pixels.
	 */
	private boolean tamanhoRelativo;

	/**
	 * Indica se o pr�ximo n�vel deve ser expandido automaticamente quando este
	 * for apresentado.
	 */
	private boolean expandirSubNiveis;

	/**
	 * Alinhar a coordenada x do submenu ao menu pai.
	 */
	private boolean alinharCoordenadaXMenuPai = true;

	/**
	 * Imagem da seta.
	 */
	private ResourceReference imagemSeta;

	/**
	 * Classe de estilo padr�o do item de menu.
	 */
	private String styleClass,

	/**
	 * Classe de estilo quando o mouse est� acima do item de menu.
	 */
	styleClassHover;

	/**
	 * Largura padr�o do item de menu.
	 */
	private Integer widthDefault,

	/**
	 * Altura padr�o do item de menu.
	 */
	heightDefault,

	/**
	 * Ajuste de dist�ncia do submenu para o menu.
	 */
	ajusteDistanciaMenu;

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
	 */
	public void setOrientacao(Orientacao orientacao) {
		this.orientacao = orientacao;
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
	 */
	public void setImagemSeta(ResourceReference imagemSeta) {
		this.imagemSeta = imagemSeta;
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
	 */
	public void setStyleClass(String styleClass) {
		this.styleClass = styleClass;
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
	 */
	public void setStyleClassHover(String styleClassHover) {
		this.styleClassHover = styleClassHover;
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
	 */
	public void setWidthDefault(Integer widthDefault) {
		this.widthDefault = widthDefault;
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
	 */
	public void setHeightDefault(Integer heightDefault) {
		this.heightDefault = heightDefault;
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
	 */
	public void setTamanhoRelativo(boolean tamanhoRelativo) {
		this.tamanhoRelativo = tamanhoRelativo;
	}

	public boolean isExpandirSubNiveis() {
		return expandirSubNiveis;
	}

	public void setExpandirSubNiveis(boolean expandirSubNiveis) {
		this.expandirSubNiveis = expandirSubNiveis;
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
	 */
	public void setAlinharCoordenadaXMenuPai(boolean alinharCoordenadaXMenuPai) {
		this.alinharCoordenadaXMenuPai = alinharCoordenadaXMenuPai;
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
	 */
	public void setAjusteDistanciaMenu(Integer ajusteDistanciaMenu) {
		this.ajusteDistanciaMenu = ajusteDistanciaMenu;
	}
}
