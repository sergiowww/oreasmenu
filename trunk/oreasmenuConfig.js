
/**
 * Configurações globais
 * configure aqui suas preferências
 * @class ConfiguracaoMenu
 */
var ConfiguracaoMenu = {
	/**
	 * Elemento onde o menu deverá ser construído, pode ser qualquer elemento válido
	 * ou o body ou uma div ou qualquer outra coisa, mas só garanto que funciona com 
	 * body ou div
	 * @type HTMLElement
	 */
	parentElement: "principal",
	/**
	 * Posição onde será inserido o menu, para saber as posições do menu consulte a 
	 * documentação do prototype
	 * @see Element#insert
	 * 
	 * @type String
	 */
	insertion: "top"
};
/**
 * Níveis de configuração 
 * Deverá ser adicionado todos os níveis que o menu poderá ter, e para cada
 * nível definir configurações como largura do item de menu altura, seta quando indicar
 * mais níveis orientação horizontal ou vertical, estilo a ser aplicado quando mouseover
 * estilo normal
 */
FactoryMenu.addNivel(new Nivel(true, "cmMenu", "cmMenuOver", null, 125, 22));
FactoryMenu.addNivel(new Nivel(false, "cmItem", "cmItemOver", "imagens/Darrow.gif", 150, 20));