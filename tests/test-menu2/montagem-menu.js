MenuBar = new Object();

MenuBar.menuBar6 = function() {
	var menus = new Array();
	
	var menu0 = new MenuItem("Início", null, null, null, null, null, null, null, null, null);
	var menu1 = new MenuItem("Administração", null, null, null, null, null, null, null, null, null);
	{
		var menu1_0 = new MenuItem("Cadastro de Agentes", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1);
		{
			var menu1_0_0 = new MenuItem("Bolsa / Associação", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1_0);
			{
				var menu1_0_0_0 = new MenuItem("Consultar", null, null, null, "teste", null, null, null, null, null).setParentMenuItem(menu1_0_0);
				var menu1_0_0_1 = new MenuItem("Incluir", null, null, null, "teste", null, null, null, null, null).setParentMenuItem(menu1_0_0);
				var menu1_0_0_2 = new MenuItem("Alterar senha", null, null, "teste", null, null, null, null, null, null).setParentMenuItem(menu1_0_0);
			}
			var menu1_0_1 = new MenuItem("Corretor / Corretora", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1_0);
			{
				var menu1_0_1_0 = new MenuItem("Consultar", null, null, "teste", null, null, null, null, null, null).setParentMenuItem(menu1_0_1);
				var menu1_0_1_1 = new MenuItem("Incluir", null, null, "teste", null, null, null, null, null, null).setParentMenuItem(menu1_0_1);
			}
		}
		
		
		var menu1_1 = new MenuItem("Cadastro de Modelo de Aviso/Edital", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1);
		{
			var menu1_1_0 = new MenuItem("Manter Modelo de Aviso/Edital", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1_1);
			{
				var menu1_1_0_0 = new MenuItem("Incluir", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1_1_0);
				var menu1_1_0_1 = new MenuItem("Consultar", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1_1_0);
				
			}
			
		}
		var menu1_2 = new MenuItem("Documentos/Infrações", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1);
		var menu1_3 = new MenuItem("Configuração", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1);
		var menu1_4 = new MenuItem("Manter Comunicado", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1);
		var menu1_5 = new MenuItem("Iniciar Leilão", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1);
		var menu1_6 = new MenuItem("Reordenar Avisos", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1);
		var menu1_7 = new MenuItem("Liberar Participação", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1);
		var menu1_8 = new MenuItem("Consultar Log do Leilão", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1);
		var menu1_9 = new MenuItem("Consultar Histórico do SEC", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu1);
	}
	
	
	var menu2 = new MenuItem("Pré-leilão", null, null, null, null, "menu2", null, null, null, null, null);
	{
		var menu2_0 = new MenuItem("Cadastro de Aviso/Edital", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu2);
		var menu2_1 = new MenuItem("Cadastros", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu2);
		var menu2_2 = new MenuItem("Consultas", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu2);
		var menu2_3 = new MenuItem("Relatórios", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu2);
	}
	
	var menu3 = new MenuItem("Pós-leilão", null, null, null, null, "menu3", null, null, null, null, null);
	{
		var menu3_0 = new MenuItem("Manter Boleto", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu3);
		var menu3_1 = new MenuItem("Confirmar Habilitação do Arrematante", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu3);
		var menu3_2 = new MenuItem("Gerar Documento Comprobatório de Operação", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu3);
		var menu3_3 = new MenuItem("Alterar Responsável pela Operação", null, null, null, null, null, null, null, null, null).setParentMenuItem(menu3);
		
	}
	
	
	menus.push(menu0);
	menus.push(menu1);
	menus.push(menu2);
	menus.push(menu3);
	var factorymenuBar = new FactoryMenu(menus, "menuPrincipal", "menuPrincipal", "top");
	factorymenuBar.addNivel(new Nivel(Nivel.ORIENTACAO_HORIZONTAL, "menuNivel1", "menuNivel1-Hover", null, 120, 22, Nivel.TAMANHO_EM_PX, false, Nivel.NAO_EXPANDIR_SUBNIVEL).setAjusteDistanciaMenu(-5));
	factorymenuBar.addNivel(new Nivel(Nivel.ORIENTACAO_HORIZONTAL, "menuNivel2", "menuNivel2-Hover", null, null, null, Nivel.TAMANHO_EM_PX, false, Nivel.NAO_EXPANDIR_SUBNIVEL).setAjusteDistanciaMenu(0));
	factorymenuBar.addNivel(new Nivel(Nivel.ORIENTACAO_HORIZONTAL, "menuNivel3", "menuNivel3", null, null, null, Nivel.TAMANHO_EM_PX, true, Nivel.EXPANDIR_SUBNIVEL));
	factorymenuBar.addNivel(new Nivel(Nivel.ORIENTACAO_VERTICAL, "menuNivel4", "menuNivel4", null, null, null, Nivel.TAMANHO_EM_PX, true, Nivel.NAO_EXPANDIR_SUBNIVEL));
	factorymenuBar.construirMenu();
};