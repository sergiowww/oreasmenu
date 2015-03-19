# Introdução #

Esse gerador de menu pode ser utilizado com qualquer linguagem, mas o exemplo que eu fiz aqui é em Java com o framework Struts e o plugin struts-menu (http://struts-menu.sourceforge.net/). Recentemente, desenvolvi uma API para Apache Wicket utilizando a mesma biblioteca JS.

A aplicação exemplo é um WAR que pode ser facilmente instalado no tomcat, os sources também estão disponíveis no download.

A utilização do JS Gerador de menu é bem simples e a Documentação da API está dentro do próprio código, em caso de dúvida, consulte-as!
Esse JS foi implementado com as mesmas funcionalidades do JS original que vem com o StrutsMenu, porém é bem mais fácil de ler e entender o código, caso precise (totalmente JS OO).

O principal motivo que encontrei para criar uma nova implementação em substituição ao coomenu.js (que vem com o struts menu) foi a falta de flexibilidade quanto ao posicionamento, ele assume somente posições absolutas na tela, ele não fica em qualquer lugar na tela, não é possível inserí-lo dentro de outro elemento, pois ele não possui posição relativa.
Agora com a nova implementação é possível clicar em um item de menu e abrí-lo em uma nova aba em qualquer navegador, pressionando ctrl e clicando o item de menu, ou clicando com o botão do meio do mouse. Tal característica não existe no coolmenu.js pois os ítens de menu não são links.
Outro ganho importantíssimo que obtivemos foi a melhoria do código JS que agora é bem mais manutenível (é bem árduo entender o JS do coolmenu, por isso eu não corrigi ele, preferí fazer um novo).
A nova implementação foi testada em todos os Browsers e não apresentou nenhum problema.
Para facilitar a substituição do coolmenu.js pela nova implementação mantive o mesmo CSS com os mesmos nomes de estilos

A nova implementação, carinhosamente apelidada de oreasmenu, depende somente do PrototypeJS (http://www.prototypejs.org/).
Então para que funcione, é necessário importar na sua página HTML o Prototype.
Por último, importamos o arquivo oreasmenu.js e logo em seguida o oreasmenuConfig.js

Uso da API com Wicket:
```

public class SamplePage extends WebPage{
public SamplePage (){
add(buildMenu());
}
private MenuBar buildMenu() {
		ArrayList<MenuItem> menus = new ArrayList<MenuItem>();
		
		menus.add(
			new MenuItem(getString("menu.produtos"), getImagemBotao("product.png")).addSubMenu(
				new MenuItem(getString("menu.produtos.cadastrar"), getImagemBotao("novo_registro.png"), getUrl("produtos/cadastrar")),
				new MenuItem(getString("menu.produtos.listar"), getImagemBotao("procurar.png"))
			)
		);
		
		menus.add(
			new MenuItem(getString("menu.estoque"), getImagemBotao("estoque.png")).addSubMenu(
				new MenuItem(getString("menu.estoque.cadastrar"), getImagemBotao("add2.png")),
				new MenuItem(getString("menu.estoque.listar"), getImagemBotao("procurar.png"))
			)
		);
		menus.add(
			new MenuItem(getString("menu.acesso"), getImagemBotao("acessos.png")).addSubMenu(
				new MenuItem(getString("menu.acesso.usuarios"), getImagemBotao("usuarios.png")).addSubMenu(
					new MenuItem(getString("menu.acesso.usuarios.cadastrar"), getImagemBotao("novo_registro.png")),
					new MenuItem(getString("menu.acesso.usuarios.consultar"), getImagemBotao("procurar.png"))
				),
				new MenuItem(getString("menu.acesso.perfis"), getImagemBotao("perfis.png"))
			)
		);
		menus.add(
			new MenuItem(
				getString("menu.sair"), 
				new ResourceReference(AbstractAdminPage.class, "resources/botoes/sair.png"), 
				getUrl("logout")
			)
		);
		
		MenuBar menuBar = new MenuBar("principal", menus);
		menuBar.addNivel(new Nivel(true, "cmMenu", "cmMenuOver", null, 125, 22));
		menuBar.addNivel(new Nivel(false, "cmItem", "cmItemOver", new ResourceReference(AbstractAdminPage.class, "resources/imagens/Darrow.gif"), 125, 22));
		return menuBar;
	}
/**
	 * retorna a url da página sem parâmetros associados.
	 * @param class1
	 * @return
	 */
	private CharSequence getUrl(String url) {
		HttpServletRequest request = getWebRequestCycle().getWebRequest().getHttpServletRequest();
		return request.getContextPath()+"/"+url;
	}
}
```