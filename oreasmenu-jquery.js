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
function PeriodicalExecuter(callback, frequency) {
    this.callback = callback;
    this.frequency = frequency;
    this.currentlyExecuting = false;

    this.timer = setInterval(jQuery.proxy(this.onTimerEvent, this), this.frequency * 1000);
}

PeriodicalExecuter.prototype.execute = function () {
    this.callback(this);
};

PeriodicalExecuter.prototype.stop = function () {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.timer = null;
};

PeriodicalExecuter.prototype.onTimerEvent = function () {
    if (!this.currentlyExecuting) {
        try {
            this.currentlyExecuting = true;
            this.execute();
            this.currentlyExecuting = false;
        } catch (e) {
            this.currentlyExecuting = false;
            throw e;
        }
    }
};


/**
 * @base MenuItem
 *
 * Construir o item de menu na tela
 * @returns void
 */
MenuItem.prototype.buildItem = function () {
    if (!this.divMenuItem) {
        var nivel = this.getNivel();
        var div = $("<div></div>").css("margin", "0");

        div.css(this.getDimensions());

        if (this.toolTip) {
            div.title = this.toolTip;
        }
        if (this.imagem) {
            var estilo = "margin-right: 5px; float:left; ";
            div.append($("<div></div>").attr("style", estilo).append(this.getImageLink()));
        }
        var adicionarSeta = nivel.imagemSeta && this.hasChildNodes();

        /**
         * @type HTMLDivElement
         */
        var divLinkTitulo = this.getDivLinkTitulo();

        if (adicionarSeta) {
            divLinkTitulo.css("float", "left");
            if (this.imagem) {
                divLinkTitulo.css("width", "70%");
            }
            div.append(divLinkTitulo);
        } else {
            div.append(divLinkTitulo);
        }
        if (adicionarSeta) {
            div.append($("<div></div>").attr({style: "margin-left:auto; width: 4px; width: 10%;"}).append(
                $("<img />").attr({
                    src: nivel.imagemSeta,
                    style: "vertical-align:middle; margin-top:5px; margin-bottom:5px;"
                })
            ));
        }
        div.addClass(nivel.estilo);
        this.divMenuItem = div;
        this.adicionarEventosCustom();
        if (this.align) {
            div.css("textAlign", this.align);
        }
        var novaDiv = null;
        var estiloDiv = "";
        if (this.isHorizontal()) {
            estiloDiv = "float: left;";
        }
        if (this.elementoInicial) {
            novaDiv = $("<div></div>").attr("style", estiloDiv).addClass(this.menuGroup + "-cmMenuBorder").append(div);
            this.insertNivelZeroMenu(novaDiv);
        } else if (this.parentMenuItem) {
            div.css("clear", "both");
            novaDiv = $("<div></div>").attr("style", "margin:1px;" + estiloDiv).append(div);
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
 * Inserir o n�vel zero do menu de acordo com as posi��o solicitada
 * @param {HTMLDivElement} div
 */
MenuItem.prototype.insertNivelZeroMenu = function (div) {
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
            this.elementoInicial.prepend(div);
            break;
    }
};


/**
 * Adicionar eventos customizados desse bot�o, que pode se definido no XML
 * @private
 * @returns void
 */
MenuItem.prototype.adicionarEventosCustom = function () {
    if (this.onClick) {
        this.divMenuItem.click(this.onClick);
    }
    if (this.onMouseOut) {
        this.divMenuItem.mouseout(this.onMouseOut);
    }
    if (this.onMouseOver) {
        this.divMenuItem.mouseover(this.onMouseOver);
    }
};

/**
 * Retornar a imagem com o link se houver
 * @returns o elemento imagem
 * @type Element
 */
MenuItem.prototype.getImageLink = function () {
    var img = $("<img />").attr({src: this.imagem, alt: this.titulo, style: "vertical-align: middle; border:none;"});
    if (!this.pagina) {
        return img;
    }
    return $("<a></a>").attr({href: this.pagina, target: this.getTarget()}).append(img);
};


/**
 * Retorna a div contendo o link ou somente o t�tulo do item.
 * @returns {HTMLDivElement}
 */
MenuItem.prototype.getDivLinkTitulo = function () {
    /**
     * @type HTMLAnchorElement|String
     */
    var linkOuTexto = this.getLinkTitulo();

    /**
     * @type HTMLDivElement
     */
    var divRetorno = $("<div></div>");
    if (this.hint) {
        if (typeof linkOuTexto === "string") {
            divRetorno.title = this.hint;
        } else {
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
MenuItem.prototype.getLinkTitulo = function () {
    if (!this.pagina) {
        return this.titulo;
    }
    var estiloLink = "text-decoration:none; ";
    if (this.imagem) {
        estiloLink = estiloLink.concat("width: 70%; float:left;");
    }
    return $("<a></a>").attr({href: this.pagina, style: estiloLink, target: this.getTarget()}).append(this.titulo);
};

/**
 * Construir a �rea de submenus, que dever� estar inicialmente oculta
 */
MenuItem.prototype.buildChildArea = function () {
    if (!this.childArea) {
        var indiceNivelVisual = this.getNivel().indiceNivelVisual;
        var div = $("<div></div>").addClass(this.menuGroup + "-cmItemBorder" + this.getNivel().indiceNivel);
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
MenuItem.prototype.addChildDiv = function (div) {
    this.buildChildArea();
    this.childArea.append(div);
};

/**
 * Ajustar posi��o da �rea de submenus para que fique perto do �tem
 * associado a ela
 */
MenuItem.prototype.ajustarPosicao = function () {
    var divMenuIr = this.divMenuItem;
    if (this.childArea) {
        var xCoord = null;
        var yCoord = null;
        //se for o primeiro n�vel
        if (this.elementoInicial || this.isHorizontal()) {
            xCoord = divMenuIr.offset().left;
            yCoord = divMenuIr.offset().top + divMenuIr.height() + this.getNivel().ajusteDistanciaMenu;
        } else {
            xCoord = divMenuIr.offset().left + divMenuIr.width() + this.getNivel().ajusteDistanciaMenu;
            yCoord = divMenuIr.offset().top;
        }
        if (this.nivel.alinharCoordenadaXMenuPai) {
            this.childArea.css("left", xCoord + "px");
        }
        this.childArea.css("top", yCoord + "px");
    }
};

/**
 * Trocar estilo do bot�o e exibir a �rea de submenus associada
 * a esse menuItem
 */
MenuItem.prototype.mouseOver = function () {
    var nivel = this.getNivel();
    if (nivel.estiloHover !== nivel.estilo) {
        this.divMenuItem.addClass(nivel.estiloHover);
        this.divMenuItem.removeClass(nivel.estilo);
    }
    if (this.hasChildNodes()) {
        this.showDivArea();
    }
};

/**
 * Voltar o estilo original do menuItem e esconder a �rea de submenus
 * associada a ele
 */
MenuItem.prototype.mouseOut = function () {
    var nivel = this.getNivel();
    if (nivel.estiloHover !== nivel.estilo) {
        this.divMenuItem.addClass(nivel.estilo);
        this.divMenuItem.removeClass(nivel.estiloHover);
    }
    if (this.hasChildNodes() && !nivel.expandirSubNiveis) {
        this.hideDivArea();
    }
};

/**
 * Atribuir o elemento onde o menu ser� criado.
 */
FactoryMenu.prototype.lookupParentElement = function () {
    this.parentElement = $("#" + this.parentElement);
};

/**
 * Clonar o �ltimo n�vel
 * @returns Nivel
 */
FactoryMenu.prototype.clonarUltimoNivel = function () {
    var ultimoNivel = this.niveis[this.niveis.length - 1];
    return jQuery.extend({}, ultimoNivel);
};

/**
 * Registrar os eventos de funcionalidade do menu.
 * @param {MenuItem} menuItem
 * @param {Number} indiceNivel
 */
FactoryMenu.prototype.registrarEventosDefault = function (menuItem, indiceNivel) {
    $(window).resize(jQuery.proxy(menuItem.ajustarPosicao, menuItem));

    var tipoEvento = menuItem.nivel.eventoMostraArea;
    if ("ONMOUSEOVER" === tipoEvento) {
        menuItem.divMenuItem.mouseover(jQuery.proxy(this.mouseOver, this, menuItem, indiceNivel));

        menuItem.divMenuItem.mouseover(jQuery.proxy(this.registrarMouseOver, this));
        menuItem.divMenuItem.mouseout(jQuery.proxy(this.registrarMouseOut, this));

        if (menuItem.childArea) {
            menuItem.childArea.mouseover(jQuery.proxy(this.registrarMouseOver, this));
            menuItem.childArea.mouseout(jQuery.proxy(this.registrarMouseOut, this));
        }
    } else if ("ONCLICK" === tipoEvento) {
        menuItem.divMenuItem.click(jQuery.proxy(this.mouseOver, this, menuItem, indiceNivel));
    }

};

/**
 * Callback mouseout
 */
FactoryMenu.prototype.abstractCallbackMouseOut = function () {
    return jQuery.proxy(this.verificarMouseSobreMenu, this);
};