/**
 * Gerador de menus javascript.
 *  
 * @author Sergio wicstech.net
 */

/**
 * Itens de menu
 * Cada ítem de menu é uma instância dessa classe
 * @class MenuItem
 */
var MenuItem = Class.create();
MenuItem.prototype = {
		
	/**
	 * Título do menu
	 * @type String
	 */
	titulo: null,
	
	/**
	 * Dica do item de menu.
	 * @type String
	 */
	hint: null,
	
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
	 * Página de destino do link
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
	 * Nível desse ítem
	 * @type Nivel
	 */
	nivel: null,
	
	/**
	 * Elemento inicial, no caso desse menuItem ser o primeiro nível ele deverá
	 * ser colocado no elemento inicial definido na configuração
	 * 
	 * @see ConfiguracaoMenu#parentElement
	 * 
	 * @type HTMLElement
	 */
	elementoInicial: null,
	
	/**
	 * div que representa o ítem de menu
	 * @type HTMLDivElement
	 */
	divMenuItem: null,
	
	/**
	 * Os submenus filhos desse menu deverão estar inseridos dentro dessa div, e estarão
	 * inicialmente ocultados
	 * 
	 * @type HTMLDivElement
	 */
	childArea: null,
	
	/**
	 * posição de inserção no elemento principal da tela
	 * 
	 * @see ConfiguracaoMenu#insertion
	 * @see Element#insert
	 * 
	 * @type String
	 */
	insertPosition: null,
	
	/**
	 * Destino onde a página deverá ser carregada
	 * @type String
	 */
	target: null,
	
	/**
	 * Função a ser chamada quando o menu for clicado
	 * @type Function
	 */
	onClick: null,
	
	/** 
	 * Função a ser chamada quando o mouse estiver sobre o menu
	 * @type Function
	 */
	onMouseOver: null,
	
	/**
	 * Função a ser chamada quando o mouse estiver fora do menu
	 * @type Function
	 */
	onMouseOut: null,
	
	/**
	 * Alinhamento do menu
	 * @type String
	 */
	align: null,
	
	/**
	 * Grupo de menu ou identificador da barra de menu ao qual esse item de menu pertence.
	 * @type String
	 */
	menuGroup: null,
	
	/**
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
	initialize: function(titulo, imagem, width, height, pagina, target, onClick, onMouseOver, onMouseOut, align){
	
		this.titulo = titulo;
		this.imagem = imagem;
		this.width = width;
		this.height = height;
		this.pagina = pagina;
		this.onClick = onClick;
		this.onMouseOver = onMouseOver;
		this.onMouseOut = onMouseOut;
		this.target = target;
		this.align = align;
		this.childMenuItem = null;
	},
	
	/**
	 * Setar o pai desse menu item
	 * @param {MenuItem} menuItem
	 * @returns void
	 */
	setParentMenuItem: function(menuItem){
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
	},
	
	/**
	 * Unidade de medida para a altura e largura do item de menu.
	 * @returns String
	 */
	getUnidadeMedida: function(){
		if(this.nivel.tamanhoRelativo){
			return "%";
		}
		return "px";
	},
	
	/**
	 * Indicar se esse menu deverá ser na posição horizontal
	 * @returns Boolean true se é horizontal false se vertical
	 * @type Boolean
	 */
	isHorizontal: function(){
		return this.getNivel().isHorizontal();
	},
	
	/**
	 * Construir o item de menu na tela
	 * @returns void
	 */
	buildItem: function(){
		if(this.divMenuItem == null){
			var nivel = this.getNivel();
			var div = new Element("div", {style: "margin: 0px;"});
			var width=this.getWidth();
			var height=this.getHeight();
			div.setStyle({
				width: this.nivel.tamanhoRelativo ? "100%" : width+this.getUnidadeMedida(),
				height: this.nivel.tamanhoRelativo ? "100%" : height+this.getUnidadeMedida()
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
			
			/**
			 * @type HTMLDivElement
			 */
			var divLinkTitulo = this.getDivLinkTitulo();
			
			if(adicionarSeta){
				var estiloLink = new Hash();
				estiloLink.set("float", "left");
				if(possuiImagem) {
					estiloLink.set("width", "70%");
				}
				divLinkTitulo.setStyle(estiloLink.toObject());
				div.appendChild(divLinkTitulo);
			}else{
				div.appendChild(divLinkTitulo);
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
			var novaDiv = null;
			var estiloDiv = "";
			if(this.isHorizontal()){
				estiloDiv = "float: left;";
			}
			if(this.elementoInicial != null){
				novaDiv = new Element("div", {className: this.menuGroup + "-cmMenuBorder", style: estiloDiv}).update(div);
				var ins = new Object();
				ins[this.insertPosition] = novaDiv; 
				this.elementoInicial.insert(ins);
			}else if(this.parentMenuItem != null){
				div.setStyle({clear: "both"});
				novaDiv = new Element("div", {style: "margin:1px;"+estiloDiv}).update(div);
				
				this.parentMenuItem.addChildDiv(novaDiv);
			}
			
			novaDiv.setStyle({
				clip: "rect(0px, "+(width+2)+this.getUnidadeMedida()+", "+(height+2)+this.getUnidadeMedida()+", 0px)",
				width: width+this.getUnidadeMedida(),
				height: height+this.getUnidadeMedida(),
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
	 * Adicionar eventos customizados desse botão, que pode se definido no XML
	 * @private
	 * @returns void
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
	 * @returns o elemento imagem
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
	 * @returns html target
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
	 * Retorna a div contendo o link ou somente o título do item.
	 * @returns {HTMLDivElement}
	 */
	getDivLinkTitulo: function() {
		/**
		 * @type HTMLAnchorElement|String
		 */
		var linkOuTexto = this.getLinkTitulo();
		
		/**
		 * @type HTMLDivElement
		 */
		var divRetorno = new Element("div");
		if (this.hint != null) {
			if (Object.isString(linkOuTexto)) {
				divRetorno.title = this.hint;
			}else{
				linkOuTexto.title = this.hint;
			}
		}
		return divRetorno.update(linkOuTexto);
	},
	
	/**
	 * Retornar o título com o link se houver
	 * @returns o link de título do ítem
	 * @type HTMLAnchorElement|String
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
	 * Construir a área de submenus, que deverá estar inicialmente oculta
	 */
	buildChildArea: function(){
		if(this.childArea == null){
			var indiceNivelVisual = this.getNivel().indiceNivelVisual;
			var div = new Element("div", {className: this.menuGroup + "-cmItemBorder"+ this.getNivel().indiceNivel});
			this.childArea = div;
			if (this.getNivel().expandirSubNiveis) {
				this.divMenuItem.appendChild(div);
			} else { 
				div.hide();
				div.setStyle({position: "absolute", zIndex: indiceNivelVisual});
				document.body.appendChild(div);
			}
		}
	},
	
	/**
	 * Adicionar uma div como filho na área
	 * @param {HTMLDivElement} div
	 * @returns void
	 */
	addChildDiv: function(div){
		this.buildChildArea();
		this.childArea.appendChild(div);
	},
	
	/**
	 * Mostrar a área de submenus associada a esse menuItem
	 */
	showDivArea: function(){
		this.ajustarPosicao();
		this.childArea.show();
	},
	
	/**
	 * Ajustar posição da área de submenus para que fique perto do ítem 
	 * associado a ela
	 */
	ajustarPosicao: function(){
		var divMenuIr = this.divMenuItem;
		if(this.childArea != null){
			var xCoord = null;
			var yCoord = null;
			//se for o primeiro nível
			if(this.elementoInicial != null || this.isHorizontal()){
				xCoord = divMenuIr.cumulativeOffset().left;
				yCoord = divMenuIr.cumulativeOffset().top+divMenuIr.getHeight();
			}else{
				xCoord = divMenuIr.cumulativeOffset().left + divMenuIr.getWidth();
				yCoord = divMenuIr.cumulativeOffset().top;
			}
			if (this.nivel.alinharCoordenadaXMenuPai) {
				this.childArea.setStyle({
					left: xCoord+"px"
				});
			}
			this.childArea.setStyle({
				top: yCoord+"px"
			});
		}
	},
	
	/**
	 * Esconder a área de submenus associada a esse item
	 */
	hideDivArea: function(){
		this.childArea.hide();
	},
	
	/**
	 * Trocar estilo do botão e exibir a área de submenus associada 
	 * a esse menuItem
	 * 
	 * @returns
	 */
	mouseOver: function(){
		var nivel=this.getNivel();
		if (nivel.estiloHover != nivel.estilo) {
			this.divMenuItem.addClassName(nivel.estiloHover);
			this.divMenuItem.removeClassName(nivel.estilo);
		} 
		if(this.hasChildNodes()){
			this.showDivArea();
		}
	},
	
	/**
	 * Voltar o estilo original do menuItem e esconder a área de submenus
	 * associada a ele
	 * @returns
	 */
	mouseOut: function(){
		var nivel = this.getNivel();
		if (nivel.estiloHover != nivel.estilo) {
			this.divMenuItem.addClassName(nivel.estilo);
			this.divMenuItem.removeClassName(nivel.estiloHover);
		}
		if(this.hasChildNodes() && !nivel.expandirSubNiveis){
			this.hideDivArea();
		}
	},
	
	/**
	 * Recuperar o tamanho do item de menu
	 * @returns a largura do item de menu
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
	 * @returns altura do ítem de menu
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
	 * Retorna o nível associado a esse menuItem
	 * @returns instância da nível associada a esse ítem de menu
	 * @type Nivel
	 */
	getNivel: function(){
		return this.nivel;
	},
	
	/**
	 * Setar o nível desse menu
	 * @param {Nivel} nivel
	 * @returns void
	 */
	setNivel: function(nivel){
		this.nivel = nivel;
	},
	
	/**
	 * Setar o grupo do menu deste item.
	 * @param {String} menuGroup
	 */
	setMenuGroup: function(menuGroup){
		this.menuGroup = menuGroup;
	},
	
	/**
	 * Verificar se existem nós filhos
	 * @returns true se esse menuItem possui menus filhos
	 * @type Boolean
	 */
	hasChildNodes: function(){
		return this.childMenuItem != null && this.childMenuItem.length != 0;
	}
};

/**
 * Classe nível, essa classe representa os níveis da árvore de menu,
 * considerando que cada nível pode ter uma configuração diferente, todas as configurações
 * são descritas aqui.
 * Não é necessário criar uma instância para quantidade máxima de níveis da árvore, basta dizer
 * qual é a configuração da primeira e da segunda em diante será considerado a última configuração
 * de nível
 * 
 * @class Nivel
 */
var Nivel = Class.create();
Nivel.TAMANHO_EM_PX = false;
Nivel.TAMANHO_EM_PC = true;
Nivel.ORIENTACAO_HORIZONTAL = true;
Nivel.ORIENTACAO_VERTICAL = false;
Nivel.NAO_EXPANDIR_SUBNIVEL = false;
Nivel.EXPANDIR_SUBNIVEL = true;
Nivel.prototype = {
	
	/**
	 * Indicar se é o nível inicial
	 * @type Boolean
	 */
	nivelInicial: true,
	
	/**
	 * Indica se o tamanho dos botões é em porcentagem ou em pixels.
	 * se <code>false</code> é em pixels, se <code>true</code> é em %.
	 * @type Boolean
	 */
	tamanhoRelativo: Nivel.TAMANHO_EM_PX,
	
	/**
	 * Indicar o tipo de orientação desse nível do menu, se é horizontal ou vertical
	 * horizontal = true
	 * vertical = false
	 * @type Boolean
	 */
	orientacao: null,
	
	/**
	 * Estilo de todos os ítens de menu desse nível
	 * @type String
	 */
	estilo: null,
	
	/**
	 * Estilo de todos os ítens de menu desse nível quando são focados (mouseover)
	 * @type String
	 */
	estiloHover: null,
	
	/**
	 * Imagem que indicará que esse menú contém submenus
	 * caminho da imagem
	 * @type String
	 */
	imagemSeta: null,
	
	/**
	 * MenuItem selecionado no nível atual
	 * @type MenuItem
	 */
	selecionadoNivel: null,
	
	/**
	 * Tamanho default de todos os ítens desse nível em pixels
	 * @type Number
	 */
	widthDefault: null,
	
	/**
	 * Altura padrão dos ítens de menu em pixels
	 * @type Number
	 */
	heightDefault: null,
	
	/**
	 * Indice do nível sendo o maior nível o primeiro nível
	 * @type Number
	 */
	indiceNivelVisual: null,
	
	
	/**
	 * Índice do nível sendo o zero o primeiro nível.
	 */
	indiceNivel: null,
	
	
	/**
	 * Indica se este nível deve ser alinhado com o menu que o abriu.
	 * Caso contrário, ele alinha com o início da página.
	 * @type Boolean
	 */
	alinharCoordenadaXMenuPai: true,
	
	/**
	 * Indica se o próximo subnível deste nível deve ser expandido automaticamente 
	 * quando este for apresentado.
	 * @type Boolean
	 */
	expandirSubNiveis: Nivel.NAO_EXPANDIR_SUBNIVEL,
	
	/**
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
	 */
	initialize: function(orientacao, estilo, estiloHover, imagemSeta, width, height, tamanhoRelativo, alinharCoordenadaXMenuPai, expandirSubNiveis){
		this.orientacao = orientacao;
		this.estilo = estilo;
		this.estiloHover = estiloHover;
		this.imagemSeta = imagemSeta;
		this.widthDefault = width;
		this.heightDefault = height;
		this.tamanhoRelativo = tamanhoRelativo;
		this.alinharCoordenadaXMenuPai = alinharCoordenadaXMenuPai;
		this.expandirSubNiveis = expandirSubNiveis;
	},
	
	/**
	 * Verificar se a orientação é horizontal ou vertical
	 * @returns 
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
var FactoryMenu = Class.create();
FactoryMenu.prototype = {
	/**
	 * Elemento onde o menu deverá ser construído, pode ser qualquer elemento válido
	 * ou o body ou uma div ou qualquer outra coisa, mas só garanto que funciona com 
	 * body ou div
	 * @type HTMLElement
	 */
	parentElement: null,
	
	/**
	 * Posição onde será inserido o menu, para saber as posições do menu consulte a 
	 * documentação do prototype
	 * @see Element#insert
	 * 
	 * @type String
	 */
	insertion: null,
	
	/**
	 * Configuração dos níveis de menu
	 * será seguido a ordem dos níveis adicionados nesse array, e no caso de existir
	 * mais níveis do que a quantidade de instâncias da Nivel nesse Array a configuração 
	 * considerada será sempre a do último elemento desse array
	 * @private
	 * @type Array
	 */
	niveis: new Array(),
	
	/**
	 * Menus adicionados, árvore de MenuItem
	 * @type Array
	 */
	menus: null,
	
	/**
	 * Identificador da barra de menus ou grupo de menu.
	 * @type String
	 */
	menuGroup: null,
	
	/**
	 * Construtor da fábrica.
	 * @param {Array} menus
	 * @param {String} menuGroup
	 * @param {String|HTMLElement} parentElement
	 * @param {String} insertion
	 */
	initialize: function(menus, menuGroup, parentElement, insertion){
		this.menuGroup = menuGroup;
		this.menus = menus;
		this.niveis = new Array();
		this.parentElement = parentElement;
		this.insertion = insertion;
	},
	
	/**
	 * Retorna o objeto nível relativo ao índice passado, se não existir retorna o último
	 * nível e adiciona o mesmo no final da lista (considerando add == true)
	 * 
	 * @param {Number} indice
	 * @param {Boolean} add indica se esse índice deverá ser adicionado
	 * @returns instância do nível que foi adicionada
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
	 * Adiciona um nível contendo configurações
	 * @param {Nivel} nivel
	 */
	addNivel: function(nivel){
		this.niveis.push(nivel);
	},
	
	/**
	 * Verifica se o mouse está sobre o menu
	 * @type PeriodicalExecuter
	 */
	pe: null,
	
	/**
	 * Indicar se o mouse se encontra sobre o menu atual
	 * @type Boolean
	 */
	mouseSobreMenu: null,
	
	/**
	 * Inicia a construção do menu.
	 */	
	construirMenu: function(){
		if(this.insertion == "top"){
			this.menus = this.menus.reverse();
		}
		var nivelInicio = 0;
		this.construirSub(this.menus, nivelInicio);
	},
	
	/**
	 * Verificar se o mouse está sobre o menu ou não 
	 * para esconder os menus ativos
	 */
	verificarMouseSobreMenu: function(){
		if(!this.mouseSobreMenu){
			this.hideOutrosMenus(-1);
		}
	},
	
	/**
	 * Função de recursividade para construir todos os níveis do menu
	 * @param {Array} menus
	 * @param {Number} indiceNivel
	 */
	construirSub: function(menus, indiceNivel){
		for (var i = 0; i < menus.length; i++) {
			/**
			 * @type MenuItem
			 */
			var menuItem = menus[i];
			menuItem.setMenuGroup(this.menuGroup);
			var nivel = this.getNivel(indiceNivel, true);
			if(indiceNivel == 0){
				nivel.nivelInicial = true;
				menuItem.elementoInicial = $(this.parentElement);
				menuItem.insertPosition = this.insertion;
			}
			nivel.indiceNivelVisual = this.niveis.length - indiceNivel;
			nivel.indiceNivel = indiceNivel;
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
		}
	},
	
	/**
	 * Registrar que mouse está sobre um menu
	 */
	registrarMouseOver: function(){
		if(this.pe != null){
			this.pe.stop();
			this.pe = null;
		}
		this.mouseSobreMenu = true;
	},
	
	/**
	 * Registrar que o mouse está fora do menu
	 */
	registrarMouseOut: function(){
		this.pe = new PeriodicalExecuter(this.verificarMouseSobreMenu.bind(this), 0.5);
		this.mouseSobreMenu = false;
	},
	
	/**
	 * Quando o usuário passar o mouse sobre um ítem de menu
	 * @param {MenuItem} menuItem
	 * @param {Number} indiceNivel
	 */
	mouseOver: function(menuItem, indiceNivel){
		this.toggleMenuItem(menuItem, indiceNivel);
		this.hideOutrosMenus(indiceNivel);
	},
	
	/**
	 * Esconder os outros menus, deve ser especificado a partir de qual nível 
	 * os menus devem ser escondidos, para não esconder todos
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
	 * Desmarcar todos os outros níveis selecionados quando
	 * um nível superior for marcado
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
