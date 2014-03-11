/**
 * Gerador de menus javascript - prototype version.
 *  
 * @author Sergio
 */

/**
 * @base MenuItem
 * 
 * Construir o item de menu na tela
 * @returns void
 */
MenuItem.prototype.buildItem = function(){
	if(this.divMenuItem == null){
		var nivel = this.getNivel();
		var div = new Element("div", {style: "margin: 0px;"});

		div.setStyle(this.getDimensions());
		
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
			this.insertNivelZeroMenu(novaDiv);
		}else if(this.parentMenuItem != null){
			div.setStyle({clear: "both"});
			novaDiv = new Element("div", {style: "margin:1px;"+estiloDiv}).update(div);
			
			this.parentMenuItem.addChildDiv(novaDiv);
		}

		novaDiv.setStyle(this.getClipDimensions());
		novaDiv.setStyle({
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
};

/**
 * Inserir o nível zero do menu de acordo com as posição solicitada
 * @param {HTMLDivElement} div
 */
MenuItem.prototype.insertNivelZeroMenu = function(div){
	var ins = new Object();
	ins[this.insertPosition] = div; 
	this.elementoInicial.insert(ins);
};
		
/**
 * Adicionar eventos customizados desse botão, que pode se definido no XML
 * @private
 * @returns void
 */
MenuItem.prototype.adicionarEventosCustom = function(){
	if(this.onClick != null){
		Event.observe(this.divMenuItem, "click", this.onClick);
	}
	if(this.onMouseOut != null){
		Event.observe(this.divMenuItem, "mouseout", this.onMouseOut);
	}
	if(this.onMouseOver != null){
		Event.observe(this.divMenuItem, "mouseover", this.onMouseOver);
	}
};
		
/**
 * Retornar a imagem com o link se houver
 * @returns o elemento imagem
 * @type Element
 */
MenuItem.prototype.getImageLink = function(){
	var img = new Element("img", {src: this.imagem, alt: this.titulo, style: "vertical-align: middle; border:none;"});
	if(this.pagina == null){
		return img;
	}
	return new Element("a", {href: this.pagina, target: this.getTarget()}).update(img);
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
	var divRetorno = new Element("div");
	if (this.hint != null) {
		if (Object.isString(linkOuTexto)) {
			divRetorno.title = this.hint;
		}else{
			linkOuTexto.title = this.hint;
		}
	}
	return divRetorno.update(linkOuTexto);
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
	return new Element("a", {href: this.pagina, style: estiloLink, target: this.getTarget()}).update(this.titulo);
};

/**
 * Construir a área de submenus, que deverá estar inicialmente oculta
 */
MenuItem.prototype.buildChildArea = function(){
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
};
		
/**
 * Adicionar uma div como filho na área
 * @param {HTMLDivElement} div
 * @returns void
 */
MenuItem.prototype.addChildDiv = function(div){
	this.buildChildArea();
	this.childArea.appendChild(div);
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
			xCoord = divMenuIr.cumulativeOffset().left;
			yCoord = divMenuIr.cumulativeOffset().top+divMenuIr.getHeight() + this.getNivel().ajusteDistanciaMenu;
		}else{
			xCoord = divMenuIr.cumulativeOffset().left + divMenuIr.getWidth() + this.getNivel().ajusteDistanciaMenu;
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
};
/**
 * Trocar estilo do botão e exibir a área de submenus associada 
 * a esse menuItem
 * 
 * @returns
 */
MenuItem.prototype.mouseOver = function(){
	var nivel=this.getNivel();
	if (nivel.estiloHover != nivel.estilo) {
		this.divMenuItem.addClassName(nivel.estiloHover);
		this.divMenuItem.removeClassName(nivel.estilo);
	} 
	if(this.hasChildNodes()){
		this.showDivArea();
	}
};
		
/**
 * Voltar o estilo original do menuItem e esconder a área de submenus
 * associada a ele
 * @returns
 */
MenuItem.prototype.mouseOut = function(){
	var nivel = this.getNivel();
	if (nivel.estiloHover != nivel.estilo) {
		this.divMenuItem.addClassName(nivel.estilo);
		this.divMenuItem.removeClassName(nivel.estiloHover);
	}
	if(this.hasChildNodes() && !nivel.expandirSubNiveis){
		this.hideDivArea();
	}
};

/**
 * Atribuir o elemento onde o menu será criado.
 */
FactoryMenu.prototype.lookupParentElement = function() {
	this.parentElement = $(this.parentElement);
};

/**
 * Clonar o último nível
 * @returns Nivel
 */
FactoryMenu.prototype.clonarUltimoNivel = function() {
	return Object.clone(this.niveis.last());
};

/**
 * Registrar os eventos de funcionalidade do menu.
 * @param {MenuItem} menuItem
 * @param {Number} indiceNivel
 */
FactoryMenu.prototype.registrarEventosDefault = function(menuItem, indiceNivel) {
	Event.observe(window, "resize", menuItem.ajustarPosicao.bind(menuItem));
	
	var tipoEvento = menuItem.nivel.eventoMostraArea;
	if ("ONMOUSEOVER" == tipoEvento) {
		Event.observe(menuItem.divMenuItem, "mouseover", this.mouseOver.bind(this, menuItem, indiceNivel));
		
		Event.observe(menuItem.divMenuItem, "mouseover", this.registrarMouseOver.bind(this));
		Event.observe(menuItem.divMenuItem, "mouseout", this.registrarMouseOut.bind(this));
		if(menuItem.childArea != null){
			Event.observe(menuItem.childArea, "mouseover", this.registrarMouseOver.bind(this));
			Event.observe(menuItem.childArea, "mouseout", this.registrarMouseOut.bind(this));
		}
	} else if ("ONCLICK" == tipoEvento) {
		Event.observe(menuItem.divMenuItem, "click", this.mouseOver.bind(this, menuItem, indiceNivel));
	}
};

/**
 * Callback mouseout
 */
FactoryMenu.prototype.abstractCallbackMouseOut = function() {
	return this.verificarMouseSobreMenu.bind(this);
};