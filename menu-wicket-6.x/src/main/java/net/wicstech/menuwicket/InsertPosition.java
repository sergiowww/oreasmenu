package net.wicstech.menuwicket;

/**
 * Local de inserção dos itens de menu no elemento contâiner
 * 
 * @author Sergio
 * 
 */
public enum InsertPosition {
	/**
	 * Inserir o elemento dentro e no topo da pilha de elementos filhos do
	 * elemento contâiner
	 */
	TOP,

	/**
	 * Inserir o elemento acima do elemento contâiner.
	 */
	ABOVE,

	/**
	 * Inserir o elemento abaixo do elemento contâiner.
	 */
	BELOW,

	/**
	 * Inserir o elemento dentro e após o último elemento dos elementos filhos
	 * do elemento contâiner.
	 */
	BOTTOM
}
