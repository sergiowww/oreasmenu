/**
 * Gerador de menus, mais um produto das organiza��es Orelhas!!!
 * Resolv� desenvolver esse gerador de menus em substitui��o ao maldito coolmenus.js que � o Javascript
 * mais horr�vel que existe na face da terra, � t�o feio que parece que foi ofuscado e na verdade foi um z� man� 
 * que fez aquela imundice.
 * Mas enfim, se ele tivesse a funcionalidade que eu queria, que por sinal � algo trivial, eu n�o teria tido 
 * trabalho de criar um.
 * O diferencial � simples, essa implementa��o � humanamente mais compreens�vel que a outra e permite tamb�m 
 * que o menu seja colocado dentro de outro elemento, n�o necessariamente o body (qualquer elemento div), e 
 * o mais importante, o menu ocupar� o espa�o que for designado para ele, pois ele n�o possui posi��o 
 * absoluta e sim relativa. 
 * Basta especificar o elemento onde ele dever� ser construido e ele estar� l�.
 * Agora � poss�vel alinhar o menu onde o programador achar melhor, lembrando que o alinhamento do coolmenus.js
 * Era relativo a posi��o da tela do navegador que n�o era necessariamente o meio da tela.
 *  
 * @author Sergio www.wicstech.com.br
 */

/**
 * Itens de menu
 * Cada �tem de menu � uma inst�ncia dessa classe
 * @class MenuItem
 */
var MenuItem = Class.create();
MenuItem.prototype = {
	/**
	 * T�tulo do menu
	 * @type String
	 */
	titulo: null,
	/**
	 * Imagem do item (caminho relativo da imagem)
	 * @type String
	 */
	imagem: null,
	/**
	 * Largura do item
	 * @type Number
	 */
	width: null,
	/**
	 * Altura do item
	 * @type Number
	 */
	height: null,
	/**
	 * P�gina de destino do link
	 * @type String
	 */
	pagina: null,
	/**
	 * Dica do menu
	 * @type String
	 */
	toolTip: null,
	/**
	 * Elemento pai desse menu
	 * @type MenuItem
	 */
	parentMenuItem: null,
	/**
	 * MenuItem filhos desse menu
	 * @type Array
	 */
	childMenuItem: null,
	/**
	 * N�vel desse �tem
	 * @type Nivel
	 */
	nivel: null,
	/**
	 * Elemento inicial, no caso desse menuItem ser o primeiro n�vel ele dever�
	 * ser colocado no elemento inicial definido na configura��o
	 * 
	 * @see ConfiguracaoMenu#parentElement
	 * 
	 * @type HTMLElement
	 */
	elementoInicial: null,
	
	/**
	 * Nome do menu: in�til mas existe no menu-config.xml
	 * Para dar um pouco mais de utilidade esse atributo n�o vai ser
	 * obrigat�rio mas ter� de ser �nico, se n�o for passado ser� gerado
	 * @type String
	 */
	id: null,
	/**
	 * div que representa o �tem de menu
	 * @type HTMLDivElement
	 */
	divMenuItem: null,
	/**
	 * Os submenus filhos desse menu dever�o estar inseridos dentro dessa div, e estar�o
	 * inicialmente ocultados
	 * 
	 * @type HTMLDivElement
	 */
	childArea: null,
	/**
	 * posi��o de inser��o no elemento principal da tela
	 * 
	 * @see ConfiguracaoMenu#insertion
	 * @see Element#insert
	 * 
	 * @type String
	 */
	insertPosition: null,
	/**
	 * Destino onde a p�gina dever� ser carregada
	 * @type String
	 */
	target: null,
	/**
	 * Fun��o a ser chamada quando o menu for clicado
	 * @type Function
	 */
	onClick: null,
	/** 
	 * Fun��o a ser chamada quando o mouse estiver sobre o menu
	 * @type Function
	 */
	onMouseOver: null,
	/**
	 * Fun��o a ser chamada quando o mouse estiver fora do menu
	 * @type Function
	 */
	onMouseOut: null,
	/**
	 * Alinhamento do menu
	 * @type String
	 */
	align: null,
	/**
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
	 * @return
	 */
	initialize: function(titulo, imagem, width, height, pagina, id, target, onClick, onMouseOver, onMouseOut, align){
		//se o identificador for nulo cria um id para ele
		if(id == null){
			var identifier = Math.random();
			id = "menuItem"+identifier;
			id = id.replace(".", "");
		}
		this.titulo = titulo;
		this.imagem = imagem;
		this.width = width;
		this.height = height;
		this.pagina = pagina;
		this.id = id;
		this.onClick = onClick;
		this.onMouseOver = onMouseOver;
		this.onMouseOut = onMouseOut;
		this.target = target;
		this.align = align;
	},
	/**
	 * Setar o pai desse menu item
	 * @param {MenuItem} menuItem
	 * @return void
	 */
	setParentMenuItem: function(menuItem){
		if(menuItem != null){
			//o pai � ele
			this.parentMenuItem = menuItem;
			if(this.parentMenuItem.childMenuItem == null){
				this.parentMenuItem.childMenuItem = new Array();
			}
			//o filho sou eu
			this.parentMenuItem.childMenuItem.push(this);
		}
	},
	/**
	 * Indicar se esse menu dever� ser na posi��o horizontal
	 * @return true se � horizontal false se vertical
	 * @type Boolean
	 */
	isHorizontal: function(){
		return this.getNivel().isHorizontal();
	},
	/**
	 * Construir o item de menu na tela
	 * @return void
	 */
	buildItem: function(){
		if(this.divMenuItem == null){
			var nivel = this.getNivel();
			var div = new Element("div", {style: "margin: 0px;"});
			var width=this.getWidth();
			var height=this.getHeight();
			div.setStyle({
				width: width+"px",
				height: height+"px"
			});
			if(this.toolTip != null){
				div.title = this.toolTip;
			}
			var possuiImagem = this.imagem != null;
			if(possuiImagem){
				var estilo = "margin-right: 5px; float:left; ";
				div.appendChild(new Element("div", {style: estilo}).update(this.getImageLink()));
			}
			var adicionarSeta = nivel.imagemSeta != null && this.hasChildNodes();
			if(adicionarSeta){
				var estiloTexto = "";
				if(possuiImagem) {
					estiloTexto = "float:left;width: 70%;";
				}
				div.appendChild(new Element("div", {style: estiloTexto}).update(this.getLinkTitulo()));
			}else{
				div.appendChild(new Element("div").update(this.getLinkTitulo()));
			}
			if(adicionarSeta){
				div.appendChild(new Element("div", {style: "margin-left:auto; width: 4px; width: 10%;"}).update(
					new Element("img", {src: nivel.imagemSeta, style :"vertical-align:middle; margin-top:5px; margin-bottom:5px;"})
				));
			}
			div.addClassName(nivel.estilo);
			this.divMenuItem = div;
			this.adicionarEventosCustom();
			if(this.align != null){
				div.setStyle({textAlign: this.align});
			}
			var larguraNova = null;
			var alturaNova = null;
			var novaDiv = null;
			var estiloDiv = "";
			if(this.isHorizontal()){
				estiloDiv = "float: left;";
			}
			if(this.elementoInicial != null){
				novaDiv = new Element("div", {className: "cmMenuBorder", style: estiloDiv}).update(div);
				var ins = new Object();
				ins[this.insertPosition] = novaDiv; 
				this.elementoInicial.insert(ins);
			}else if(this.parentMenuItem != null){
				div.setStyle({clear: "both"});
				novaDiv = new Element("div", {style: "margin:1px;"+estiloDiv}).update(div);
				
				this.parentMenuItem.addChildDiv(novaDiv);
			}
			
			novaDiv.setStyle({
				clip: "rect(0px, "+(width+2)+"px, "+(height+2)+"px, 0px)",
				width: width+"px",
				height: height+"px",
				overflow: "hidden",
				zIndex: nivel.indiceNivelVisual
			});
			var cor = this.divMenuItem.getStyle("color");
			novaDiv.select("a").each(function(a){
				a.setStyle({
					color: cor
				});
			});
		}
	},
	/**
	 * Adicionar eventos customizados desse bot�o, que pode se definido no XML
	 * @private
	 * @return void
	 */
	adicionarEventosCustom: function(){
		if(this.onClick != null){
			Event.observe(this.divMenuItem, "click", this.onClick);
		}
		if(this.onMouseOut != null){
			Event.observe(this.divMenuItem, "mouseout", this.onMouseOut);
		}
		if(this.onMouseOver != null){
			Event.observe(this.divMenuItem, "mouseover", this.onMouseOver);
		}
	},
	/**
	 * Retornar a imagem com o link se houver
	 * @return o elemento imagem
	 * @type HTMLElement
	 */
	getImageLink: function(){
		var img = new Element("img", {src: this.imagem, alt: this.titulo, style: "vertical-align: middle; border:none;"});
		if(this.pagina == null){
			return img;
		}
		return new Element("a", {href: this.pagina, target: this.getTarget()}).update(img);
			
	},
	/**
	 * Recuperar target do link
	 * @return html target
	 * @type String
	 */
	getTarget: function(){
		var target = "_self";
		if(this.target != null){
			target = this.target;
		}
		return target;
	},
	/**
	 * Retornar o t�tulo com o link se houver
	 * @return o link de t�tulo do �tem
	 * @type HTMLElement|String
	 */
	getLinkTitulo: function(){
		if(this.pagina == null){
			return this.titulo;
		}
		var estiloLink = "text-decoration:none; ";
		if(this.imagem != null) {
			estiloLink = estiloLink.concat("width: 70%; float:left;");
		}
		return new Element("a", {href: this.pagina, style: estiloLink, target: this.getTarget()}).update(this.titulo);
	},
	/**
	 * Construir a �rea de submenus, que dever� estar inicialmente oculta
	 */
	buildChildArea: function(){
		if(this.childArea == null){
			var indiceNivelVisual = this.getNivel().indiceNivelVisual;
			var div = new Element("div", {style: "position: absolute; z-index:"+indiceNivelVisual+";", className: "cmItemBorder"});
			div.hide();
			this.childArea = div;
			document.body.appendChild(div);
		}
	},
	/**
	 * Adicionar uma div como filho na �rea
	 * @param {HTMLDivElement} div
	 * @return
	 */
	addChildDiv: function(div){
		this.buildChildArea();
		this.childArea.appendChild(div);
	},
	/**
	 * Retorna o menuitem construido
	 * @return menu item construido
	 * @type HTMLDivElement
	 */
	getDivMenuItem: function(){
		this.buildItem();
		return this.divMenuItem;
	},
	/**
	 * Mostrar a �rea de submenus associada a esse menuItem
	 */
	showDivArea: function(){
		this.ajustarPosicao();
		this.childArea.show();
	},
	/**
	 * Ajustar posi��o da �rea de submenus para que fique perto do �tem 
	 * associado a ela
	 */
	ajustarPosicao: function(){
		var divMenuIr = this.divMenuItem;
		if(this.childArea != null){
			var xCoord = null;
			var yCoord = null;
			//se for o primeiro n�vel
			if(this.elementoInicial != null && this.isHorizontal()){
				xCoord = divMenuIr.cumulativeOffset().left;
				yCoord = divMenuIr.cumulativeOffset().top+divMenuIr.getHeight()-7;
			}else{
				xCoord = divMenuIr.cumulativeOffset().left + divMenuIr.getWidth()-7;
				yCoord = divMenuIr.cumulativeOffset().top;
			}
			this.childArea.setStyle({
				left: xCoord+"px",
				top: yCoord+"px"
			});
		}
	},
	/**
	 * Esconder a �rea de submenus associada a esse item
	 */
	hideDivArea: function(){
		this.childArea.hide();
	},
	/**
	 * Trocar estilo do bot�o e exibir a �rea de submenus associada 
	 * a esse menuItem
	 * 
	 * @return
	 */
	mouseOver: function(){
		var nivel=this.getNivel();
		this.divMenuItem.addClassName(nivel.estiloHover);
		this.divMenuItem.removeClassName(nivel.estilo);
		if(this.hasChildNodes()){
			this.showDivArea();
		}
	},
	/**
	 * Voltar o estilo original do menuItem e esconder a �rea de submenus
	 * associada a ele
	 * @return
	 */
	mouseOut: function(){
		var nivel = this.getNivel();
		this.divMenuItem.addClassName(nivel.estilo);
		this.divMenuItem.removeClassName(nivel.estiloHover);
		if(this.hasChildNodes()){
			this.hideDivArea();
		}
	},
	/**
	 * Recuperar o tamanho do item de menu
	 * @return a largura do item de menu
	 * @type Number
	 */
	getWidth: function(){
		if(this.width != null){
			return this.width;
		}
		var widthDefault = this.getNivel().widthDefault;
		if(widthDefault != null){
			return widthDefault;
		}
		return null;
	},
	/**
	 * Recuperar a altura do item
	 * @return altura do �tem de menu
	 * @type Number
	 */
	getHeight: function(){
		if(this.height != null){
			return this.height;
		}
		var heightDefault = this.getNivel().heightDefault;
		if(heightDefault != null){
			return heightDefault;
		}
		return null;
	},
	/**
	 * Retorna o n�vel associado a esse menuItem
	 * @return inst�ncia da n�vel associada a esse �tem de menu
	 * @type Nivel
	 */
	getNivel: function(){
		return this.nivel;
	},
	/**
	 * Setar o n�vel desse menu
	 * @param {Nivel} nivel
	 * @return void
	 */
	setNivel: function(nivel){
		this.nivel = nivel;
	},
	/**
	 * Verificar se existem n�s filhos
	 * @return true se esse menuItem possui menus filhos
	 * @type Boolean
	 */
	hasChildNodes: function(){
		return this.childMenuItem != null && this.childMenuItem.length != 0;
	}
};

/**
 * Classe n�vel, essa classe representa os n�veis da �rvore de menu,
 * considerando que cada n�vel pode ter uma configura��o diferente, todas as configura��es
 * s�o descritas aqui.
 * N�o � necess�rio criar uma inst�ncia para quantidade m�xima de n�veis da �rvore, basta dizer
 * qual � a configura��o da primeira e da segunda em diante ser� considerado a �ltima configura��o
 * de n�vel
 * 
 * @class Nivel
 */
var Nivel = Class.create();
Nivel.prototype = {
	/**
	 * Indicar se � o n�vel inicial
	 * @type Boolean
	 */
	nivelInicial: false,
	/**
	 * Indicar o tipo de orienta��o desse n�vel do menu, se � horizontal ou vertical
	 * horizontal = true
	 * vertical = false
	 * @type Boolean
	 */
	orientacao: null,
	/**
	 * Estilo de todos os �tens de menu desse n�vel
	 * @type String
	 */
	estilo:null,
	/**
	 * Estilo de todos os �tens de menu desse n�vel quando s�o focados (mouseover)
	 * @type String
	 */
	estiloHover: null,
	/**
	 * Imagem que indicar� que esse men� cont�m submenus
	 * caminho da imagem
	 * @type String
	 */
	imagemSeta:null,
	/**
	 * MenuItem selecionado no n�vel atual
	 * @type MenuItem
	 */
	selecionadoNivel: null,
	
	/**
	 * Tamanho default de todos os �tens desse n�vel em pixels
	 * @type Number
	 */
	widthDefault: null,
	/**
	 * Altura padr�o dos �tens de menu em pixels
	 * @type Number
	 */
	heightDefault: null,
	/**
	 * Indice desse n�vel
	 * @type Number
	 */
	indiceNivelVisual: null,
	/**
	 * @constructor
	 * @param {Boolean} orientacao		orienta��o do do menu se � horizontal ou vertical
	 * @param {String} estilo			estilo que o menu deve possuir no seu estado normal
	 * @param {String} estiloHover		estilo que o menu deve ter quando o mouse estiver por cima do mesmo
	 * @param {String} imagemSeta		caminho da imagem que representa a seta indicando que existe submenus
	 * @param {Number} width			largura dos �tens de menu desse n�vel
	 * @param {Number} height			altura dos �tens de menu desse n�vel
	 * @return
	 */
	initialize: function(orientacao, estilo, estiloHover, imagemSeta, width, height){
		this.orientacao = orientacao;
		this.estilo = estilo;
		this.estiloHover = estiloHover;
		this.imagemSeta = imagemSeta;
		this.widthDefault = width;
		this.heightDefault = height;
	},
	/**
	 * Verificar se a orienta��o � horizontal ou vertical
	 * @return 
	 * @type Boolean
	 */
	isHorizontal: function(){
		return this.orientacao;
	}
};

/**
 * Factory de menus
 * @class FactoryMenu
 */
var FactoryMenu = {
	/**
	 * Configura��o dos n�veis de menu
	 * ser� seguido a ordem dos n�veis adicionados nesse array, e no caso de existir
	 * mais n�veis do que a quantidade de inst�ncias da Nivel nesse Array a configura��o 
	 * considerada ser� sempre a do �ltimo elemento desse array
	 * @private
	 * @type Array
	 */
	niveis: new Array(),
	/**
	 * Menus adicionados, �rvore de MenuItem
	 * @type Array
	 */
	menus: null,
	/**
	 * Retorna o objeto n�vel relativo ao �ndice passado, se n�o existir retorna o �ltimo
	 * n�vel e adiciona o mesmo no final da lista (considerando add == true)
	 * 
	 * @param {Number} indice
	 * @param {Boolean} add indica se esse �ndice dever� ser adicionado
	 * @return inst�ncia do n�vel que foi adicionada
	 * @type Nivel
	 */
	getNivel: function(indice, add){
		var nivel = this.niveis[indice];
		if(add && (nivel == undefined || nivel == null)){
			nivel = Object.clone(this.niveis.last());
			this.niveis.push(nivel);
		}
		return nivel;
	},
	/**
	 * Adiciona um n�vel contendo configura��es
	 * @param {Nivel} nivel
	 */
	addNivel: function(nivel){
		this.niveis.push(nivel);
	},
	/**
	 * Verifica se o mouse est� sobre o menu
	 * @type PeriodicalExecuter
	 */
	pe: null,
	/**
	 * Indicar se o mouse se encontra sobre o menu atual
	 * @type Boolean
	 */
	mouseSobreMenu: null,
	/**
	 * Recebe o array de menus e constroi o mesmo na tela
	 * @param {Array} menus
	 */
	construirMenu: function(menus){
		this.menus = menus;
		if(ConfiguracaoMenu.insertion == "top"){
			menus = menus.reverse();
		}
		var nivelInicio = 0;
		this.construirSub(menus, nivelInicio);
	},
	/**
	 * Verificar se o mouse est� sobre o menu ou n�o 
	 * para esconder os menus ativos
	 */
	verificarMouseSobreMenu: function(){
		if(!this.mouseSobreMenu){
			this.hideOutrosMenus(-1);
		}
	},
	/**
	 * Fun��o de recursividade para construir todos os n�veis do menu
	 * @param {MenuItem} menuItem
	 * @param {Number} indiceNivel
	 */
	construirSub: function(menus, indiceNivel){
		menus.each((function(menuItem){
			var nivel = this.getNivel(indiceNivel, true);
			if(indiceNivel == 0){
				nivel.nivelInicial = true;
				menuItem.elementoInicial = $(ConfiguracaoMenu.parentElement);
				menuItem.insertPosition = ConfiguracaoMenu.insertion;
			}
			nivel.indiceNivelVisual = this.niveis.length - indiceNivel;
			menuItem.setNivel(nivel);
			
			menuItem.buildItem();
			Event.observe(window, "resize", menuItem.ajustarPosicao.bind(menuItem));
			Event.observe(menuItem.divMenuItem, "mouseover", this.mouseOver.bind(this, menuItem, indiceNivel));
			
			Event.observe(menuItem.divMenuItem, "mouseover", this.registrarMouseOver.bind(this));
			Event.observe(menuItem.divMenuItem, "mouseout", this.registrarMouseOut.bind(this));
			if(menuItem.childArea != null){
				Event.observe(menuItem.childArea, "mouseover", this.registrarMouseOver.bind(this));
				Event.observe(menuItem.childArea, "mouseout", this.registrarMouseOut.bind(this));
			}
			if(menuItem.hasChildNodes()){
				this.construirSub(menuItem.childMenuItem, indiceNivel+1);
			}
		}).bind(this));
	},
	/**
	 * Registrar que mouse est� sobre um menu
	 */
	registrarMouseOver: function(){
		if(this.pe != null){
			this.pe.stop();
			this.pe = null;
		}
		this.mouseSobreMenu = true;
	},
	/**
	 * Registrar que o mouse est� fora do menu
	 */
	registrarMouseOut: function(){
		this.pe = new PeriodicalExecuter(this.verificarMouseSobreMenu.bind(this), 1);
		this.mouseSobreMenu = false;
	},
	/**
	 * Quando o usu�rio passar o mouse sobre um �tem de menu
	 * @param {MenuItem} menuItem
	 * @param {Number} indiceNivel
	 */
	mouseOver: function(menuItem, indiceNivel){
		this.toggleMenuItem(menuItem, indiceNivel);
		this.hideOutrosMenus(indiceNivel);
	},
	/**
	 * Esconder os outros menus, deve ser especificado a partir de qual n�vel 
	 * os menus devem ser escondidos, para n�o esconder todos
	 * 
	 * @param {Number} indiceNivel
	 */
	hideOutrosMenus: function(indiceNivel){
		var outrosNiveis = indiceNivel;
		while(++outrosNiveis < this.niveis.length){
			this.toggleMenuItem(null, outrosNiveis);
		}
	},
	/**
	 * Desmarcar todos os outros n�veis selecionados quando
	 * um n�vel superior for marcado
	 * 
	 * @param {MenuItem} menuItem
	 * @param {Number} indiceNivel
	 */
	toggleMenuItem: function(menuItem, indiceNivel){
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
	}
};
