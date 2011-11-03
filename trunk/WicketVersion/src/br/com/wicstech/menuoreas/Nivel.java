package br.com.wicstech.menuoreas;

import java.io.Serializable;

import org.apache.wicket.ResourceReference;

/**
 * Configuração de nível.
 * É possível definir configurações únicas para todo um nível de menu.
 * 
 * @author Sergio
 *
 */
public class Nivel implements Serializable{
	private static final long serialVersionUID = 4069467046986058750L;
	
	
	/**
	 * Orientação do menu, vertical ou horizontal
	 */
	private boolean orientacao,
	
	/**
	 * Indica se as dimensões do item de menu é em % ou em pixels.
	 */
	tamanhoRelativo;
	
	/**
	 * Imagem da seta.
	 */
	private ResourceReference imagemSeta;
	
	/**
	 * Classe de estilo padrão do item de menu.
	 */
	private String styleClass, 
	
	/**
	 * Classe de estilo quando o mouse está acima do item de menu.
	 */
	styleClassHover; 
	
	/**
	 * Largura padrão do item de menu.
	 */
	private Integer widthDefault, 
	
	/**
	 * Altura padrão do item de menu.
	 */
	heightDefault;


	public Nivel(boolean orientacao, String styleClass, String styleClassHover,
			ResourceReference imagemSeta, Integer widthDefault,
			Integer heightDefault) {
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
	public boolean isOrientacao() {
		return orientacao;
	}

	/**
	 * @param orientacao the orientacao to set
	 */
	public void setOrientacao(boolean orientacao) {
		this.orientacao = orientacao;
	}

	/**
	 * @return the imagemSeta
	 */
	public ResourceReference getImagemSeta() {
		return imagemSeta;
	}

	/**
	 * @param imagemSeta the imagemSeta to set
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
	 * @param styleClass the styleClass to set
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
	 * @param styleClassHover the styleClassHover to set
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
	 * @param widthDefault the widthDefault to set
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
	 * @param heightDefault the heightDefault to set
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
	 * @param tamanhoRelativo the tamanhoRelativo to set
	 */
	public void setTamanhoRelativo(boolean tamanhoRelativo) {
		this.tamanhoRelativo = tamanhoRelativo;
	}
}
