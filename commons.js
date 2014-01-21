/**
 * Gerador de menus javascript
 *  
 * @author Sergio
 */

/**
 * Itens de menu
 * Cada ítem de menu é uma instância dessa classe
 * @class MenuItem
 * 
 * @constructor
 * 
 * @param {String} titulo				Título do menu
 * @param {String} imagem				Caminho da imagem do menu
 * @param {Number} width				Largura do menu
 * @param {Number} height				Altura do menu
 * @param {String} pagina				Página do link do menu
 * @param {String} id					Identificador do menu
 * @param {String} target				Alvo, onde a página deverá ser carregada
 * @param {Function} onClick			Função a ser chamada quando o clique for efetuado no menu
 * @param {Function} onMouseOver		Função a ser chamada quando o mouse estiver dentro do menu
 * @param {Function} onMouseOut			Função a ser chamada quando o mouse estiver fora do menu
 * @param {String} align				Alinhamento do menu, que pode ser definido também no CSS
 */
function MenuItem(titulo, imagem, width, height, pagina, target, onClick, onMouseOver, onMouseOut, align) {
		
	/**
	 * Título do menu
	 * @type String
	 */
	this.titulo = titulo;
	
	/**
	 * Dica do item de menu.
	 * @type String
	 */
	this.hint = null;
	
	/**
	 * Imagem do item (caminho relativo da imagem)
	 * @type String
	 */
	this.imagem = imagem;
	
	/**
	 * Largura do item
	 * @type Number
	 */
	this.width = width;
	
	/**
	 * Altura do item
	 * @type Number
	 */
	this.height = height;
	
	/**
	 * Página de destino do link
	 * @type String
	 */
	this.pagina = pagina;
	
	/**
	 * Dica do menu
	 * @type String
	 */
	this.toolTip = null;
	
	/**
	 * Elemento pai desse menu
	 * @type MenuItem
	 */
	this.parentMenuItem = null;
	
	/**
	 * MenuItem filhos desse menu
	 * @type Array
	 */
	this.childMenuItem = null;
	
	/**
	 * Nível desse ítem
	 * @type Nivel
	 */
	this.nivel = null;
	
	/**
	 * Elemento inicial, no caso desse menuItem ser o primeiro nível ele deverá
	 * ser colocado no elemento inicial definido na configuração
	 * 
	 * @see ConfiguracaoMenu#parentElement
	 * 
	 * @type HTMLElement
	 */
	this.elementoInicial = null;
	
	/**
	 * div que representa o ítem de menu
	 * @type HTMLDivElement
	 */
	this.divMenuItem = null;
	
	/**
	 * Os submenus filhos desse menu deverão estar inseridos dentro dessa div, e estarão
	 * inicialmente ocultados
	 * 
	 * @type HTMLDivElement
	 */
	this.childArea = null;
	
	/**
	 * posição de inserção no elemento principal da tela
	 * 
	 * @see ConfiguracaoMenu#insertion
	 * @see Element#insert
	 * 
	 * @type String
	 */
	this.insertPosition = "top";
	
	/**
	 * Destino onde a página deverá ser carregada
	 * @type String
	 */
	this.target = target;
	
	/**
	 * Função a ser chamada quando o menu for clicado
	 * @type Function
	 */
	this.onClick = onClick;
	
	/** 
	 * Função a ser chamada quando o mouse estiver sobre o menu
	 * @type Function
	 */
	this.onMouseOver = onMouseOver;
	
	/**
	 * Função a ser chamada quando o mouse estiver fora do menu
	 * @type Function
	 */
	this.onMouseOut = onMouseOut;
	
	/**
	 * Alinhamento do menu
	 * @type String
	 */
	this.align = align;
	
	/**
	 * Grupo de menu ou identificador da barra de menu ao qual esse item de menu pertence.
	 * @type String
	 */
	this.menuGroup = null;

	
	/**
	 * Setar o pai desse menu item
	 * @param {MenuItem} menuItem
	 * @returns void
	 */
	this.setParentMenuItem = function(menuItem){
		if(menuItem != null){
			//o pai é ele
			this.parentMenuItem = menuItem;
			if(this.parentMenuItem.childMenuItem == null){
				this.parentMenuItem.childMenuItem = new Array();
			}
			//o filho sou eu
			this.parentMenuItem.childMenuItem.push(this);
		}
		return this;
	};
	
	/**
	 * Retorna as dimensões do menu.
	 * @returns {Object}
	 */
	this.getDimensions = function() {
		var dimension = new Object();
		var width=this.getWidth();
		var height=this.getHeight();
		if (this.nivel.tamanhoRelativo) {
			dimension.width = dimension.height = "100%";
		}
		if (!this.nivel.tamanhoRelativo && width != 0) {
			dimension.width = width+this.getUnidadeMedida();
		} 
		if (!this.nivel.tamanhoRelativo && height != 0) {
			dimension.height = height+this.getUnidadeMedida();
		}
		return dimension;
	};
	
	/**
	 * Dimensões externas.
	 * @returns {Object}
	 */
	this.getClipDimensions = function() {
		var dimension = this.getDimensions();
		if (("width" in dimension) && "height" in dimension) {
			var width=this.getWidth();
			var height=this.getHeight();
			dimension.clip = "rect(0px, "+(width+2)+this.getUnidadeMedida()+", "+(height+2)+this.getUnidadeMedida()+", 0px)";
		}
		return dimension;
	};
	
	/**
	 * Unidade de medida para a altura e largura do item de menu.
	 * @returns String
	 */
	this.getUnidadeMedida = function(){
		if(this.nivel.tamanhoRelativo){
			return "%";
		}
		return "px";
	};
	
	/**
	 * Indicar se esse menu deverá ser na posição horizontal
	 * @returns Boolean true se é horizontal false se vertical
	 * @type Boolean
	 */
	this.isHorizontal = function(){
		return this.getNivel().isHorizontal();
	};
	
	
	/**
	 * Recuperar target do link
	 * @returns html target
	 * @type String
	 */
	this.getTarget = function(){
		var target = "_self";
		if(this.target != null){
			target = this.target;
		}
		return target;
	};
	
	/**
	 * Mostrar a área de submenus associada a esse menuItem
	 */
	this.showDivArea = function(){
		this.ajustarPosicao();
		this.childArea.show();
	};
	
	/**
	 * Esconder a área de submenus associada a esse item
	 */
	this.hideDivArea = function(){
		this.childArea.hide();
	};
	
	/**
	 * Recuperar o tamanho do item de menu
	 * @returns a largura do item de menu
	 * @type Number
	 */
	this.getWidth = function(){
		if(this.width != null){
			return this.width;
		}
		var widthDefault = this.getNivel().widthDefault;
		if(widthDefault != null){
			return widthDefault;
		}
		return 0;
	};
	
	/**
	 * Recuperar a altura do item
	 * @returns altura do ítem de menu
	 * @type Number
	 */
	this.getHeight = function(){
		if(this.height != null){
			return this.height;
		}
		var heightDefault = this.getNivel().heightDefault;
		if(heightDefault != null){
			return heightDefault;
		}
		return 0;
	};
	
	/**
	 * Retorna o nível associado a esse menuItem
	 * @returns instância da nível associada a esse ítem de menu
	 * @type Nivel
	 */
	this.getNivel = function(){
		return this.nivel;
	};
	
	/**
	 * Verificar se existem nós filhos
	 * @returns true se esse menuItem possui menus filhos
	 * @type Boolean
	 */
	this.hasChildNodes = function(){
		return this.childMenuItem != null && this.childMenuItem.length != 0;
	};
};

/**
 * Constantes
 */
var Constantes = {};
Constantes.TAMANHO_EM_PX = false;
Constantes.TAMANHO_EM_PC = true;
Constantes.ORIENTACAO_HORIZONTAL = true;
Constantes.ORIENTACAO_VERTICAL = false;
Constantes.NAO_EXPANDIR_SUBNIVEL = false;
Constantes.EXPANDIR_SUBNIVEL = true;


/**
 * Classe nível, essa classe representa os níveis da árvore de menu,
 * considerando que cada nível pode ter uma configuração diferente, todas as configurações
 * são descritas aqui.
 * Não é necessário criar uma instância para quantidade máxima de níveis da árvore, basta dizer
 * qual é a configuração da primeira e da segunda em diante será considerado a última configuração
 * de nível
 * 
 * @class Nivel
 * 
 * @constructor
 * @param {Boolean} orientacao		orientação do do menu se é horizontal ou vertical
 * @param {String} estilo			estilo que o menu deve possuir no seu estado normal
 * @param {String} estiloHover		estilo que o menu deve ter quando o mouse estiver por cima do mesmo
 * @param {String} imagemSeta		caminho da imagem que representa a seta indicando que existe submenus
 * @param {Number} width			largura dos ítens de menu desse nível
 * @param {Number} height			altura dos ítens de menu desse nível
 * @param {Number} tamanhoRelativo  indica se as dimensões dos itens de menu é em % ou em px.
 * @param {Boolean} alinharCoordenadaXMenuPai
 * @param {Boolean} expandirSubNiveis
 * 
 */
function Nivel(orientacao, estilo, estiloHover, imagemSeta, width, height, tamanhoRelativo, alinharCoordenadaXMenuPai, expandirSubNiveis){
	/**
	 * Indicar se é o nível inicial
	 * @type Boolean
	 */
	this.nivelInicial = true;
	
	/**
	 * Indica se o tamanho dos botões é em porcentagem ou em pixels.
	 * se <code>false</code> é em pixels, se <code>true</code> é em %.
	 * @type Boolean
	 */
	this.tamanhoRelativo = tamanhoRelativo;
	
	/**
	 * Indicar o tipo de orientação desse nível do menu, se é horizontal ou vertical
	 * horizontal = true
	 * vertical = false
	 * @type Boolean
	 */
	this.orientacao = orientacao;
	
	/**
	 * Estilo de todos os ítens de menu desse nível
	 * @type String
	 */
	this.estilo = estilo;
	
	/**
	 * Estilo de todos os ítens de menu desse nível quando são focados (mouseover)
	 * @type String
	 */
	this.estiloHover = estiloHover;
	
	/**
	 * Imagem que indicará que esse menú contém submenus
	 * caminho da imagem
	 * @type String
	 */
	this.imagemSeta = imagemSeta;
	
	/**
	 * MenuItem selecionado no nível atual
	 * @type MenuItem
	 */
	this.selecionadoNivel = null;
	
	/**
	 * Tamanho default de todos os ítens desse nível em pixels
	 * @type Number
	 */
	this.widthDefault = width;
	
	/**
	 * Altura padrão dos ítens de menu em pixels
	 * @type Number
	 */
	this.heightDefault = height;
	
	/**
	 * Indice do nível sendo o maior nível o primeiro nível
	 * @type Number
	 */
	this.indiceNivelVisual = null;
	
	
	/**
	 * Índice do nível sendo o zero o primeiro nível.
	 */
	this.indiceNivel = null;
	
	/**
	 * Indica se este nível deve ser alinhado com o menu que o abriu.
	 * Caso contrário, ele alinha com o início da página.
	 * @type Boolean
	 */
	this.alinharCoordenadaXMenuPai = alinharCoordenadaXMenuPai;
	
	/**
	 * Indica se o próximo subnível deste nível deve ser expandido automaticamente 
	 * quando este for apresentado.
	 * @type Boolean
	 */
	this.expandirSubNiveis = expandirSubNiveis;
	
	/**
	 * Ajuste de distância do sub-menu para o menu pai respectivo.
	 * @type Number
	 */
	this.ajusteDistanciaMenu = 0;
	
	/**
	 * Verificar se a orientação é horizontal ou vertical
	 * @returns 
	 * @type Boolean
	 */
	this.isHorizontal = function(){
		return this.orientacao;
	};
	
	/**
	 * Set ajusteDistanciaMenu 
	 * @param ajusteDistanciaMenu
	 */
	this.setAjusteDistanciaMenu = function(ajusteDistanciaMenu){
		this.ajusteDistanciaMenu = ajusteDistanciaMenu;
		return this;
	};
};

/**
 * Factory de menus
 *  Construtor da fábrica.
 * 
 * @class FactoryMenu
 * @param {Array} menus
 * @param {String} menuGroup
 * @param {String|HTMLElement} parentElement
 * @param {String} insertion
 */
function FactoryMenu(menus, menuGroup, parentElement, insertion) {
	/**
	 * Elemento onde o menu deverá ser construído, pode ser qualquer elemento válido
	 * ou o body ou uma div ou qualquer outra coisa, mas só garanto que funciona com 
	 * body ou div
	 * @type HTMLElement
	 */
	this.parentElement = parentElement;
	
	/**
	 * Posição onde será inserido o menu, para saber as posições do menu consulte a 
	 * documentação do prototype
	 * @see Element#insert
	 * 
	 * @type String
	 */
	this.insertion = insertion;
	
	/**
	 * Configuração dos níveis de menu
	 * será seguido a ordem dos níveis adicionados nesse array, e no caso de existir
	 * mais níveis do que a quantidade de instâncias da Nivel nesse Array a configuração 
	 * considerada será sempre a do último elemento desse array
	 * @private
	 * @type Array
	 */
	this.niveis = new Array();
	
	/**
	 * Menus adicionados, árvore de MenuItem
	 * @type Array
	 */
	this.menus = menus;
	
	/**
	 * Identificador da barra de menus ou grupo de menu.
	 * @type String
	 */
	this.menuGroup = menuGroup;
	
	
	/**
	 * Retorna o objeto nível relativo ao índice passado, se não existir retorna o último
	 * nível e adiciona o mesmo no final da lista (considerando add == true)
	 * 
	 * @param {Number} indice
	 * @param {Boolean} add indica se esse índice deverá ser adicionado
	 * @returns instância do nível que foi adicionada
	 * @type Nivel
	 */
	this.getNivel = function(indice, add){
		var nivel = this.niveis[indice];
		if(add && (nivel == undefined || nivel == null)){
			nivel = this.clonarUltimoNivel();
			this.niveis.push(nivel);
		}
		return nivel;
	};
	
	/**
	 * Adiciona um nível contendo configurações
	 * @param {Nivel} nivel
	 */
	this.addNivel = function(nivel){
		this.niveis.push(nivel);
	};
	
	/**
	 * Verifica se o mouse está sobre o menu
	 * @type PeriodicalExecuter
	 */
	this.pe = null;
	
	/**
	 * Indicar se o mouse se encontra sobre o menu atual
	 * @type Boolean
	 */
	this.mouseSobreMenu = null;
	
	/**
	 * Inicia a construção do menu.
	 */	
	this.construirMenu = function(){
		if(this.insertion == "top"){
			this.menus = this.menus.reverse();
		}
		this.lookupParentElement();
		var nivelInicio = 0;
		this.construirSub(this.menus, nivelInicio);
	};
	
	/**
	 * Verificar se o mouse está sobre o menu ou não 
	 * para esconder os menus ativos
	 */
	this.verificarMouseSobreMenu = function(){
		if(!this.mouseSobreMenu){
			this.hideOutrosMenus(-1);
		}
	};
	
	/**
	 * Função de recursividade para construir todos os níveis do menu
	 * @param {Array} menus
	 * @param {Number} indiceNivel
	 */
	this.construirSub = function(menus, indiceNivel){
		for (var i = 0; i < menus.length; i++) {
			/**
			 * @type MenuItem
			 */
			var menuItem = menus[i];
			menuItem.menuGroup = this.menuGroup;
			var nivel = this.getNivel(indiceNivel, true);
			if(indiceNivel == 0){
				nivel.nivelInicial = true;
				menuItem.elementoInicial = this.parentElement;
				menuItem.insertPosition = this.insertion;
			}
			nivel.indiceNivelVisual = this.niveis.length - indiceNivel;
			nivel.indiceNivel = indiceNivel;
			menuItem.nivel = nivel;
			
			menuItem.buildItem();
			
			this.registrarEventosDefault(menuItem, indiceNivel);
			
			if(menuItem.hasChildNodes()){
				this.construirSub(menuItem.childMenuItem, indiceNivel+1);
			}			
		}
	};
	
	/**
	 * Registrar que mouse está sobre um menu
	 */
	this.registrarMouseOver = function(){
		if(this.pe != null){
			this.pe.stop();
			this.pe = null;
		}
		this.mouseSobreMenu = true;
	};
	
	/**
	 * Registrar que o mouse está fora do menu
	 */
	this.registrarMouseOut = function(){
		this.pe = new PeriodicalExecuter(this.verificarMouseSobreMenu.bind(this), 0.5);
		this.mouseSobreMenu = false;
	};
	
	/**
	 * Quando o usuário passar o mouse sobre um ítem de menu
	 * @param {MenuItem} menuItem
	 * @param {Number} indiceNivel
	 */
	this.mouseOver = function(menuItem, indiceNivel){
		this.toggleMenuItem(menuItem, indiceNivel);
		this.hideOutrosMenus(indiceNivel);
	};
	
	/**
	 * Esconder os outros menus, deve ser especificado a partir de qual nível 
	 * os menus devem ser escondidos, para não esconder todos
	 * 
	 * @param {Number} indiceNivel
	 */
	this.hideOutrosMenus = function(indiceNivel){
		var outrosNiveis = indiceNivel;
		while(++outrosNiveis < this.niveis.length){
			this.toggleMenuItem(null, outrosNiveis);
		}
	};
	
	/**
	 * Desmarcar todos os outros níveis selecionados quando
	 * um nível superior for marcado
	 * 
	 * @param {MenuItem} menuItem
	 * @param {Number} indiceNivel
	 */
	this.toggleMenuItem = function(menuItem, indiceNivel){
		var nivel = this.getNivel(indiceNivel, false);
		
		if(nivel.selecionadoNivel == null && menuItem != null){
			nivel.selecionadoNivel = menuItem;
			menuItem.mouseOver();
		}else if(nivel.selecionadoNivel != null){
			var menuItemAnterior = nivel.selecionadoNivel;
			menuItemAnterior.mouseOut();
			if(menuItem != null){
				menuItem.mouseOver();
			}
			nivel.selecionadoNivel = menuItem;
		}
	};
};
