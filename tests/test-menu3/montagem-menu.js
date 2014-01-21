if (typeof MenuBar == "undefined") {
	MenuBar = new Object();
}
MenuBar.menuCategorias10 = function() {
	var menus = new Array();
	var menu0 = new MenuItem("\u00D3culos de sol", null, null, null, "categoria/id/1", null, null, null, null, null);
	menus.push(menu0);
	var menu1 = new MenuItem("Feminino", null, null, null, "categoria/id/5", null, null, null, null, null);
	menu1.setParentMenuItem(menu0);
	var menu2 = new MenuItem("Masculino", null, null, null, "categoria/id/6", null, null, null, null, null);
	menu2.setParentMenuItem(menu0);
	var menu3 = new MenuItem("Vintage", null, null, null, "categoria/id/23", null, null, null, null, null);
	menu3.setParentMenuItem(menu0);
	var menu4 = new MenuItem("\u00D3culos de grau", null, null, null, "categoria/id/2", null, null, null, null, null);
	menus.push(menu4);
	var menu5 = new MenuItem("outra categoria", null, null, null, "categoria/id/16", null, null, null, null, null);
	menu5.setParentMenuItem(menu4);
	var menu6 = new MenuItem("\u00D3culos feminino", null, null, null, "categoria/id/3", null, null, null, null, null);
	menus.push(menu6);
	var menu7 = new MenuItem("\u00D3culos masculino", null, null, null, "categoria/id/4", null, null, null, null, null);
	menus.push(menu7);
	var factorymenuCategorias = new FactoryMenu(menus, "menuCategorias", "menuCategorias10", "top");
	factorymenuCategorias.addNivel(new Nivel(true, "menuCategorias-cmMenu", "menuCategorias-cmMenuOver", "test-menu3_files/down-arrow.gif", 25, 100, true, true, false));
	factorymenuCategorias.addNivel(new Nivel(false, "menuCategorias-cmMenuItem", "menuCategorias-cmMenuItemOver", "test-menu3_files/Darrow.gif", 180, 18, false, true, false));
	factorymenuCategorias.construirMenu();
};