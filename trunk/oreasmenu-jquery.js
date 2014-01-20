/**
 * Gerador de menus javascript.
 *  
 * @author Sergio wicstech.net
 */

/**
 * Creates a PeriodicalExecuter.
 * @class PeriodicalExecuter
 * 
 * @constructor
 * 
 * @param {Function} callback  the function to be executed at each interval
 * @param {Number} frequency the amount of time, in seconds, to wait in between callbacks
 */
function PeriodicalExecuter(callback, frequency){
	this.callback = callback;
	this.frequency = frequency;
	this.currentlyExecuting = false;

	this.execute = function() {
		this.callback(this);
	};

	this.stop = function() {
		if (!this.timer) return;
		clearInterval(this.timer);
		this.timer = null;
	};

	this.onTimerEvent = function() {
		if (!this.currentlyExecuting) {
			try {
				this.currentlyExecuting = true;
				this.execute();
				this.currentlyExecuting = false;
			} catch(e) {
				this.currentlyExecuting = false;
				throw e;
			}
		}
	};
	this.timer = setInterval(this.onTimerEvent.bind(this), this.frequency * 1000);
};

/**
 * Itens de menu
 * Cada �tem de menu � uma inst�ncia dessa classe
 * @class MenuItem
 * 
 * @constructor
 * 
 * @param {String} titulo				T�tulo do menu
 * @param {String} imagem				Caminho da imagem do menu
 * @param {Number} width				Largura do menu
 * @param {Number} height				Altura do menu
 * @param {String} pagina				P�gina do link do menu
 * @param {String} id					Identificador do menu
 * @param {String} target				Alvo, onde a p�gina dever� ser carregada
 * @param {Function} onClick			Fun��o a ser chamada quando o clique for efetuado no menu
 * @param {Function} onMouseOver		Fun��o a ser chamada quando o mouse estiver dentro do menu
 * @param {Function} onMouseOut			Fun��o a ser chamada quando o mouse estiver fora do menu
 * @param {String} align				Alinhamento do menu, que pode ser definido tamb�m no CSS
 */
function MenuItem(titulo, imagem, width, height, pagina, target, onClick, onMouseOver, onMouseOut, align) {
		
	/**
	 * T�tulo do menu
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
	 * P�gina de destino do link
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
	 * N�vel desse �tem
	 * @type Nivel
	 */
	this.nivel = null;
	
	/**
	 * Elemento inicial, no caso desse menuItem ser o primeiro n�vel ele dever�
	 * ser colocado no elemento inicial definido na configura��o
	 * 
	 * @see ConfiguracaoMenu#parentElement
	 * 
	 * @type HTMLElement
	 */
	this.elementoInicial = null;
	
	/**
	 * div que representa o �tem de menu
	 * @type HTMLDivElement
	 */
	this.divMenuItem = null;
	
	/**
	 * Os submenus filhos desse menu dever�o estar inseridos dentro dessa div, e estar�o
	 * inicialmente ocultados
	 * 
	 * @type HTMLDivElement
	 */
	this.childArea = null;
	
	/**
	 * posi��o de inser��o no elemento principal da tela
	 * 
	 * @see ConfiguracaoMenu#insertion
	 * @see Element#insert
	 * 
	 * @type String
	 */
	this.insertPosition = "top";
	
	/**
	 * Destino onde a p�gina dever� ser carregada
	 * @type String
	 */
	this.target = target;
	
	/**
	 * Fun��o a ser chamada quando o menu for clicado
	 * @type Function
	 */
	this.onClick = onClick;
	
	/** 
	 * Fun��o a ser chamada quando o mouse estiver sobre o menu
	 * @type Function
	 */
	this.onMouseOver = onMouseOver;
	
	/**
	 * Fun��o a ser chamada quando o mouse estiver fora do menu
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
			//o pai � ele
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
	 * Indicar se esse menu dever� ser na posi��o horizontal
	 * @returns Boolean true se � horizontal false se vertical
	 * @type Boolean
	 */
	this.isHorizontal = function(){
		return this.getNivel().isHorizontal();
	};
	
	/**
	 * Construir o item de menu na tela
	 * @returns void
	 */
	this.buildItem = function(){
		if(this.divMenuItem == null){
			var nivel = this.getNivel();
			var div = $("<div></div>").css("margin", "0");
			var width=this.getWidth();
			var height=this.getHeight();
			div.css({
				width: this.nivel.tamanhoRelativo ? "100%" : width+this.getUnidadeMedida(),
				height: this.nivel.tamanhoRelativo ? "100%" : height+this.getUnidadeMedida()
			});
			
			if(this.toolTip != null){
				div.title = this.toolTip;
			}
			var possuiImagem = this.imagem != null;
			if(possuiImagem){
				var estilo = "margin-right: 5px; float:left; ";
				div.append($("<div></div>").attr("style", estilo).append(this.getImageLink()));
			}
			var adicionarSeta = nivel.imagemSeta != null && this.hasChildNodes();
			
			/**
			 * @type HTMLDivElement
			 */
			var divLinkTitulo = this.getDivLinkTitulo();
			
			if(adicionarSeta){
				divLinkTitulo.css("float", "left");
				if(possuiImagem) {
					divLinkTitulo.css("width", "70%");
				}
				div.append(divLinkTitulo);
			}else{
				div.append(divLinkTitulo);
			}
			if(adicionarSeta){
				div.append($("<div></div>").attr({style: "margin-left:auto; width: 4px; width: 10%;"}).append(
					$("<img />").attr({src: nivel.imagemSeta, style :"vertical-align:middle; margin-top:5px; margin-bottom:5px;"})
				));
			}
			div.addClass(nivel.estilo);
			this.divMenuItem = div;
			this.adicionarEventosCustom();
			if(this.align != null){
				div.css("textAlign", this.align);
			}
			var novaDiv = null;
			var estiloDiv = "";
			if(this.isHorizontal()){
				estiloDiv = "float: left;";
			}
			if(this.elementoInicial != null){
				novaDiv = $("<div></div>").attr("style", estiloDiv).addClass(this.menuGroup + "-cmMenuBorder").append(div);
				this.insertNivelZeroMenu(novaDiv);
			}else if(this.parentMenuItem != null){
				div.css("clear", "both");
				novaDiv = $("<div></div>").attr("style", "margin:1px;"+estiloDiv).append(div);
				this.parentMenuItem.addChildDiv(novaDiv);
			}
			
			novaDiv.css({
				clip: "rect(0px, "+(width+2)+this.getUnidadeMedida()+", "+(height+2)+this.getUnidadeMedida()+", 0px)",
				width: width+this.getUnidadeMedida(),
				height: height+this.getUnidadeMedida(),
				overflow: "hidden",
				zIndex: nivel.indiceNivelVisual
			});
			var cor = this.divMenuItem.css("color");
			novaDiv.find("a").css("color", cor);
		}
	};
	
	/**
	 * Inserir o n�vel zero do menu de acordo com as posi��o solicitada
	 * @param {HTMLDivElement} div
	 */
	this.insertNivelZeroMenu = function(div){
		switch (this.insertPosition) {
		case "top":
			this.elementoInicial.prepend(div);
			break;
		case "above":
			this.elementoInicial.after(div);
			break;
		case "below":
			this.elementoInicial.before(div);
			break;
		case "bottom":
			this.elementoInicial.append(div);
			break;
		default:
			break;
		}
	};
	
	
	/**
	 * Adicionar eventos customizados desse bot�o, que pode se definido no XML
	 * @private
	 * @returns void
	 */
	this.adicionarEventosCustom = function(){
		if(this.onClick != null){
			this.divMenuItem.click(this.onClick);
		}
		if(this.onMouseOut != null){
			this.divMenuItem.mouseout(this.onMouseOut);
		}
		if(this.onMouseOver != null){
			this.divMenuItem.mouseover(this.onMouseOver);
		}
	};
	
	/**
	 * Retornar a imagem com o link se houver
	 * @returns o elemento imagem
	 * @type Element
	 */
	this.getImageLink = function(){
		var img = $("<img />").attr({src: this.imagem, alt: this.titulo, style: "vertical-align: middle; border:none;"});
		if(this.pagina == null){
			return img;
		}
		return $("<a></a>").attr({href: this.pagina, target: this.getTarget()}).append(img);
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
	 * Retorna a div contendo o link ou somente o t�tulo do item.
	 * @returns {HTMLDivElement}
	 */
	this.getDivLinkTitulo = function() {
		/**
		 * @type HTMLAnchorElement|String
		 */
		var linkOuTexto = this.getLinkTitulo();
		
		/**
		 * @type HTMLDivElement
		 */
		var divRetorno = $("<div></div>");
		if (this.hint != null) {
			if (typeof linkOuTexto == "string") {
				divRetorno.title = this.hint;
			}else{
				linkOuTexto.title = this.hint;
			}
		}
		return divRetorno.append(linkOuTexto);
	};
	
	/**
	 * Retornar o t�tulo com o link se houver
	 * @see HTMLAnchorElement
	 * @returns o link de t�tulo do �tem 
	 * @type Object
	 */
	this.getLinkTitulo = function(){
		if(this.pagina == null){
			return this.titulo;
		}
		var estiloLink = "text-decoration:none; ";
		if(this.imagem != null) {
			estiloLink = estiloLink.concat("width: 70%; float:left;");
		}
		return $("<a></a>").attr({href: this.pagina, style: estiloLink, target: this.getTarget()}).append(this.titulo);
	};
	
	/**
	 * Construir a �rea de submenus, que dever� estar inicialmente oculta
	 */
	this.buildChildArea = function(){
		if(this.childArea == null){
			var indiceNivelVisual = this.getNivel().indiceNivelVisual;
			var div = $("<div></div>").addClass(this.menuGroup + "-cmItemBorder"+ this.getNivel().indiceNivel);
			this.childArea = div;
			if (this.getNivel().expandirSubNiveis) {
				this.divMenuItem.append(div);
			} else { 
				div.hide();
				div.css({position: "absolute", zIndex: indiceNivelVisual});
				$(document.body).append(div);
			}
		}
	};
	
	/**
	 * Adicionar uma div como filho na �rea
	 * @param {HTMLDivElement} div
	 * @returns void
	 */
	this.addChildDiv = function(div){
		this.buildChildArea();
		this.childArea.append(div);
	};
	
	/**
	 * Mostrar a �rea de submenus associada a esse menuItem
	 */
	this.showDivArea = function(){
		this.ajustarPosicao();
		this.childArea.show();
	};
	
	/**
	 * Ajustar posi��o da �rea de submenus para que fique perto do �tem 
	 * associado a ela
	 */
	this.ajustarPosicao = function(){
		var divMenuIr = this.divMenuItem;
		if(this.childArea != null){
			var xCoord = null;
			var yCoord = null;
			//se for o primeiro n�vel
			if(this.elementoInicial != null || this.isHorizontal()){
				xCoord = divMenuIr.offset().left;
				yCoord = divMenuIr.offset().top+divMenuIr.height() + this.getNivel().ajusteDistanciaMenu;
			}else{
				xCoord = divMenuIr.offset().left + divMenuIr.width() + this.getNivel().ajusteDistanciaMenu;
				yCoord = divMenuIr.offset().top;
			}
			if (this.nivel.alinharCoordenadaXMenuPai) {
				this.childArea.css("left", xCoord+"px");
			}
			this.childArea.css("top", yCoord+"px");
		}
	};
	
	/**
	 * Esconder a �rea de submenus associada a esse item
	 */
	this.hideDivArea = function(){
		this.childArea.hide();
	};
	
	/**
	 * Trocar estilo do bot�o e exibir a �rea de submenus associada 
	 * a esse menuItem
	 * 
	 * @returns
	 */
	this.mouseOver = function(){
		var nivel=this.getNivel();
		if (nivel.estiloHover != nivel.estilo) {
			this.divMenuItem.addClass(nivel.estiloHover);
			this.divMenuItem.removeClass(nivel.estilo);
		} 
		if(this.hasChildNodes()){
			this.showDivArea();
		}
	};
	
	/**
	 * Voltar o estilo original do menuItem e esconder a �rea de submenus
	 * associada a ele
	 * @returns
	 */
	this.mouseOut = function(){
		var nivel = this.getNivel();
		if (nivel.estiloHover != nivel.estilo) {
			this.divMenuItem.addClass(nivel.estilo);
			this.divMenuItem.removeClass(nivel.estiloHover);
		}
		if(this.hasChildNodes() && !nivel.expandirSubNiveis){
			this.hideDivArea();
		}
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
		return 100;
	};
	
	/**
	 * Recuperar a altura do item
	 * @returns altura do �tem de menu
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
		return 100;
	};
	
	/**
	 * Retorna o n�vel associado a esse menuItem
	 * @returns inst�ncia da n�vel associada a esse �tem de menu
	 * @type Nivel
	 */
	this.getNivel = function(){
		return this.nivel;
	};
	
	/**
	 * Setar o n�vel desse menu
	 * @param {Nivel} nivel
	 * @returns void
	 */
	this.setNivel = function(nivel){
		this.nivel = nivel;
	};
	
	/**
	 * Setar o grupo do menu deste item.
	 * @param {String} menuGroup
	 */
	this.setMenuGroup = function(menuGroup){
		this.menuGroup = menuGroup;
	};
	
	/**
	 * Verificar se existem n�s filhos
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
 * Classe n�vel, essa classe representa os n�veis da �rvore de menu,
 * considerando que cada n�vel pode ter uma configura��o diferente, todas as configura��es
 * s�o descritas aqui.
 * N�o � necess�rio criar uma inst�ncia para quantidade m�xima de n�veis da �rvore, basta dizer
 * qual � a configura��o da primeira e da segunda em diante ser� considerado a �ltima configura��o
 * de n�vel
 * 
 * @class Nivel
 * 
 * @constructor
 * @param {Boolean} orientacao		orienta��o do do menu se � horizontal ou vertical
 * @param {String} estilo			estilo que o menu deve possuir no seu estado normal
 * @param {String} estiloHover		estilo que o menu deve ter quando o mouse estiver por cima do mesmo
 * @param {String} imagemSeta		caminho da imagem que representa a seta indicando que existe submenus
 * @param {Number} width			largura dos �tens de menu desse n�vel
 * @param {Number} height			altura dos �tens de menu desse n�vel
 * @param {Number} tamanhoRelativo  indica se as dimens�es dos itens de menu � em % ou em px.
 * @param {Boolean} alinharCoordenadaXMenuPai
 * @param {Boolean} expandirSubNiveis
 * 
 */
function Nivel(orientacao, estilo, estiloHover, imagemSeta, width, height, tamanhoRelativo, alinharCoordenadaXMenuPai, expandirSubNiveis){
	/**
	 * Indicar se � o n�vel inicial
	 * @type Boolean
	 */
	this.nivelInicial = true;
	
	/**
	 * Indica se o tamanho dos bot�es � em porcentagem ou em pixels.
	 * se <code>false</code> � em pixels, se <code>true</code> � em %.
	 * @type Boolean
	 */
	this.tamanhoRelativo = tamanhoRelativo;
	
	/**
	 * Indicar o tipo de orienta��o desse n�vel do menu, se � horizontal ou vertical
	 * horizontal = true
	 * vertical = false
	 * @type Boolean
	 */
	this.orientacao = orientacao;
	
	/**
	 * Estilo de todos os �tens de menu desse n�vel
	 * @type String
	 */
	this.estilo = estilo;
	
	/**
	 * Estilo de todos os �tens de menu desse n�vel quando s�o focados (mouseover)
	 * @type String
	 */
	this.estiloHover = estiloHover;
	
	/**
	 * Imagem que indicar� que esse men� cont�m submenus
	 * caminho da imagem
	 * @type String
	 */
	this.imagemSeta = imagemSeta;
	
	/**
	 * MenuItem selecionado no n�vel atual
	 * @type MenuItem
	 */
	this.selecionadoNivel = null;
	
	/**
	 * Tamanho default de todos os �tens desse n�vel em pixels
	 * @type Number
	 */
	this.widthDefault = width;
	
	/**
	 * Altura padr�o dos �tens de menu em pixels
	 * @type Number
	 */
	this.heightDefault = height;
	
	/**
	 * Indice do n�vel sendo o maior n�vel o primeiro n�vel
	 * @type Number
	 */
	this.indiceNivelVisual = null;
	
	/**
	 * �ndice do n�vel sendo o zero o primeiro n�vel.
	 */
	this.indiceNivel = null;
	
	/**
	 * Indica se este n�vel deve ser alinhado com o menu que o abriu.
	 * Caso contr�rio, ele alinha com o in�cio da p�gina.
	 * @type Boolean
	 */
	this.alinharCoordenadaXMenuPai = alinharCoordenadaXMenuPai;
	
	/**
	 * Indica se o pr�ximo subn�vel deste n�vel deve ser expandido automaticamente 
	 * quando este for apresentado.
	 * @type Boolean
	 */
	this.expandirSubNiveis = expandirSubNiveis;
	
	/**
	 * Ajuste de dist�ncia do sub-menu para o menu pai respectivo.
	 * @type Number
	 */
	this.ajusteDistanciaMenu = 1;
	
	/**
	 * Verificar se a orienta��o � horizontal ou vertical
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
 *  Construtor da f�brica.
 * 
 * @class FactoryMenu
 * @param {Array} menus
 * @param {String} menuGroup
 * @param {String|HTMLElement} parentElement
 * @param {String} insertion
 */
function FactoryMenu(menus, menuGroup, parentElement, insertion) {
	/**
	 * Elemento onde o menu dever� ser constru�do, pode ser qualquer elemento v�lido
	 * ou o body ou uma div ou qualquer outra coisa, mas s� garanto que funciona com 
	 * body ou div
	 * @type HTMLElement
	 */
	this.parentElement = null;
	
	/**
	 * Posi��o onde ser� inserido o menu, para saber as posi��es do menu consulte a 
	 * documenta��o do prototype
	 * @see Element#insert
	 * 
	 * @type String
	 */
	this.insertion = insertion;
	
	/**
	 * Configura��o dos n�veis de menu
	 * ser� seguido a ordem dos n�veis adicionados nesse array, e no caso de existir
	 * mais n�veis do que a quantidade de inst�ncias da Nivel nesse Array a configura��o 
	 * considerada ser� sempre a do �ltimo elemento desse array
	 * @private
	 * @type Array
	 */
	this.niveis = new Array();
	
	/**
	 * Menus adicionados, �rvore de MenuItem
	 * @type Array
	 */
	this.menus = menus;
	
	/**
	 * Identificador da barra de menus ou grupo de menu.
	 * @type String
	 */
	this.menuGroup = menuGroup;
	
	
	/**
	 * Retorna o objeto n�vel relativo ao �ndice passado, se n�o existir retorna o �ltimo
	 * n�vel e adiciona o mesmo no final da lista (considerando add == true)
	 * 
	 * @param {Number} indice
	 * @param {Boolean} add indica se esse �ndice dever� ser adicionado
	 * @returns inst�ncia do n�vel que foi adicionada
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
	 * Atribuir o elemento onde o menu ser� criado.
	 * @param {String} parentElement
	 */
	this.setParentElement = function(parentElement) {
		this.parentElement = $("#" + this.parentElement);
	};
	this.setParentElement(parentElement);
	
	/**
	 * Clonar o �ltimo n�vel
	 * @returns Nivel
	 */
	this.clonarUltimoNivel = function() {
		var ultimoNivel = this.niveis[this.niveis.length - 1];
		return jQuery.extend({}, ultimoNivel);
	};
	
	/**
	 * Adiciona um n�vel contendo configura��es
	 * @param {Nivel} nivel
	 */
	this.addNivel = function(nivel){
		this.niveis.push(nivel);
	};
	
	/**
	 * Verifica se o mouse est� sobre o menu
	 * @type PeriodicalExecuter
	 */
	this.pe = null;
	
	/**
	 * Indicar se o mouse se encontra sobre o menu atual
	 * @type Boolean
	 */
	this.mouseSobreMenu = null;
	
	/**
	 * Inicia a constru��o do menu.
	 */	
	this.construirMenu = function(){
		if(this.insertion == "top"){
			this.menus = this.menus.reverse();
		}
		var nivelInicio = 0;
		this.construirSub(this.menus, nivelInicio);
	};
	
	/**
	 * Verificar se o mouse est� sobre o menu ou n�o 
	 * para esconder os menus ativos
	 */
	this.verificarMouseSobreMenu = function(){
		if(!this.mouseSobreMenu){
			this.hideOutrosMenus(-1);
		}
	};
	
	/**
	 * Fun��o de recursividade para construir todos os n�veis do menu
	 * @param {Array} menus
	 * @param {Number} indiceNivel
	 */
	this.construirSub = function(menus, indiceNivel){
		for (var i = 0; i < menus.length; i++) {
			/**
			 * @type MenuItem
			 */
			var menuItem = menus[i];
			menuItem.setMenuGroup(this.menuGroup);
			var nivel = this.getNivel(indiceNivel, true);
			if(indiceNivel == 0){
				nivel.nivelInicial = true;
				menuItem.elementoInicial = this.parentElement;
				menuItem.insertPosition = this.insertion;
			}
			nivel.indiceNivelVisual = this.niveis.length - indiceNivel;
			nivel.indiceNivel = indiceNivel;
			menuItem.setNivel(nivel);
			
			menuItem.buildItem();
			
			this.registrarEventosDefault(menuItem);
			
			if(menuItem.hasChildNodes()){
				this.construirSub(menuItem.childMenuItem, indiceNivel+1);
			}			
		}
	};
	
	/**
	 * Registrar os eventos de funcionalidade do menu.
	 * @param {MenuItem} menuItem
	 */
	this.registrarEventosDefault = function(menuItem) {
		$(window).resize(jQuery.proxy(menuItem.ajustarPosicao, menuItem));
		
		menuItem.divMenuItem.mouseover(jQuery.proxy(this.mouseOver, this, menuItem, indiceNivel));
		
		menuItem.divMenuItem.mouseover(jQuery.proxy(this.registrarMouseOver, this));
		menuItem.divMenuItem.mouseout(jQuery.proxy(this.registrarMouseOut, this));
		
		if(menuItem.childArea != null){
			menuItem.childArea.mouseover(jQuery.proxy(this.registrarMouseOver, this));
			menuItem.childArea.mouseout(jQuery.proxy(this.registrarMouseOut, this));
		}
	};
	
	/**
	 * Registrar que mouse est� sobre um menu
	 */
	this.registrarMouseOver = function(){
		if(this.pe != null){
			this.pe.stop();
			this.pe = null;
		}
		this.mouseSobreMenu = true;
	};
	
	/**
	 * Registrar que o mouse est� fora do menu
	 */
	this.registrarMouseOut = function(){
		this.pe = new PeriodicalExecuter(this.verificarMouseSobreMenu.bind(this), 0.5);
		this.mouseSobreMenu = false;
	};
	
	/**
	 * Quando o usu�rio passar o mouse sobre um �tem de menu
	 * @param {MenuItem} menuItem
	 * @param {Number} indiceNivel
	 */
	this.mouseOver = function(menuItem, indiceNivel){
		this.toggleMenuItem(menuItem, indiceNivel);
		this.hideOutrosMenus(indiceNivel);
	};
	
	/**
	 * Esconder os outros menus, deve ser especificado a partir de qual n�vel 
	 * os menus devem ser escondidos, para n�o esconder todos
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
	 * Desmarcar todos os outros n�veis selecionados quando
	 * um n�vel superior for marcado
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
