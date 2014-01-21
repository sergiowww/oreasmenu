/**
 * Gerador de menus javascript - jquery version.
 *  
 * @author Sergio
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
 * @base MenuItem
 * 
 * Construir o item de menu na tela
 * @returns void
 */
MenuItem.prototype.buildItem = function(){
	if(this.divMenuItem == null){
		var nivel = this.getNivel();
		var div = $("<div></div>").css("margin", "0");
		
		div.css(this.getDimensions());
		
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
		novaDiv.css(this.getClipDimensions());
		novaDiv.css({
			overflow: "hidden",
			zIndex: nivel.indiceNivelVisual
		});
		var cor = this.divMenuItem.css("color");
		novaDiv.find("a").css("color", cor);
	}
};
	
/**
 * Inserir o nível zero do menu de acordo com as posição solicitada
 * @param {HTMLDivElement} div
 */
MenuItem.prototype.insertNivelZeroMenu = function(div){
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
 * Adicionar eventos customizados desse botão, que pode se definido no XML
 * @private
 * @returns void
 */
MenuItem.prototype.adicionarEventosCustom = function(){
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
MenuItem.prototype.getImageLink = function(){
	var img = $("<img />").attr({src: this.imagem, alt: this.titulo, style: "vertical-align: middle; border:none;"});
	if(this.pagina == null){
		return img;
	}
	return $("<a></a>").attr({href: this.pagina, target: this.getTarget()}).append(img);
};
	
	
/**
 * Retorna a div contendo o link ou somente o título do item.
 * @returns {HTMLDivElement}
 */
MenuItem.prototype.getDivLinkTitulo = function() {
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
 * Retornar o título com o link se houver
 * @see HTMLAnchorElement
 * @returns o link de título do ítem 
 * @type Object
 */
MenuItem.prototype.getLinkTitulo = function(){
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
 * Construir a área de submenus, que deverá estar inicialmente oculta
 */
MenuItem.prototype.buildChildArea = function(){
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
 * Adicionar uma div como filho na área
 * @param {HTMLDivElement} div
 * @returns void
 */
MenuItem.prototype.addChildDiv = function(div){
	this.buildChildArea();
	this.childArea.append(div);
};
	
/**
 * Ajustar posição da área de submenus para que fique perto do ítem 
 * associado a ela
 */
MenuItem.prototype.ajustarPosicao = function(){
	var divMenuIr = this.divMenuItem;
	if(this.childArea != null){
		var xCoord = null;
		var yCoord = null;
		//se for o primeiro nível
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
 * Trocar estilo do botão e exibir a área de submenus associada 
 * a esse menuItem
 */
MenuItem.prototype.mouseOver = function(){
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
 * Voltar o estilo original do menuItem e esconder a área de submenus
 * associada a ele
 */
MenuItem.prototype.mouseOut = function(){
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
 * Atribuir o elemento onde o menu será criado.
 */
FactoryMenu.prototype.lookupParentElement = function() {
	this.parentElement = $("#" + this.parentElement);
};
	
/**
 * Clonar o último nível
 * @returns Nivel
 */
FactoryMenu.prototype.clonarUltimoNivel = function() {
	var ultimoNivel = this.niveis[this.niveis.length - 1];
	return jQuery.extend({}, ultimoNivel);
};
	
/**
 * Registrar os eventos de funcionalidade do menu.
 * @param {MenuItem} menuItem
 * @param {Number} indiceNivel
 */
FactoryMenu.prototype.registrarEventosDefault = function(menuItem, indiceNivel) {
	$(window).resize(jQuery.proxy(menuItem.ajustarPosicao, menuItem));
	
	menuItem.divMenuItem.mouseover(jQuery.proxy(this.mouseOver, this, menuItem, indiceNivel));
	
	menuItem.divMenuItem.mouseover(jQuery.proxy(this.registrarMouseOver, this));
	menuItem.divMenuItem.mouseout(jQuery.proxy(this.registrarMouseOut, this));
	
	if(menuItem.childArea != null){
		menuItem.childArea.mouseover(jQuery.proxy(this.registrarMouseOver, this));
		menuItem.childArea.mouseout(jQuery.proxy(this.registrarMouseOut, this));
	}
};