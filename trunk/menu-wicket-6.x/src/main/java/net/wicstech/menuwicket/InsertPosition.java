package net.wicstech.menuwicket;

/**
 * Local de inser��o dos itens de menu no elemento cont�iner
 * 
 * @author Sergio
 * 
 */
public enum InsertPosition {
	/**
	 * Inserir o elemento dentro e no topo da pilha de elementos filhos do
	 * elemento cont�iner
	 */
	TOP,

	/**
	 * Inserir o elemento acima do elemento cont�iner.
	 */
	ABOVE,

	/**
	 * Inserir o elemento abaixo do elemento cont�iner.
	 */
	BELOW,

	/**
	 * Inserir o elemento dentro e ap�s o �ltimo elemento dos elementos filhos
	 * do elemento cont�iner.
	 */
	BOTTOM
}
