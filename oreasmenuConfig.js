
/**
 * Configura��es globais
 * configure aqui suas prefer�ncias
 * @class ConfiguracaoMenu
 */
var ConfiguracaoMenu = {
	/**
	 * Elemento onde o menu dever� ser constru�do, pode ser qualquer elemento v�lido
	 * ou o body ou uma div ou qualquer outra coisa, mas s� garanto que funciona com 
	 * body ou div
	 * @type HTMLElement
	 */
	parentElement: "principal",
	/**
	 * Posi��o onde ser� inserido o menu, para saber as posi��es do menu consulte a 
	 * documenta��o do prototype
	 * @see Element#insert
	 * 
	 * @type String
	 */
	insertion: "top"
};
/**
 * N�veis de configura��o 
 * Dever� ser adicionado todos os n�veis que o menu poder� ter, e para cada
 * n�vel definir configura��es como largura do item de menu altura, seta quando indicar
 * mais n�veis orienta��o horizontal ou vertical, estilo a ser aplicado quando mouseover
 * estilo normal
 */
FactoryMenu.addNivel(new Nivel(true, "cmMenu", "cmMenuOver", null, 125, 22));
FactoryMenu.addNivel(new Nivel(false, "cmItem", "cmItemOver", "imagens/Darrow.gif", 150, 20));