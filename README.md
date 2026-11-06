# PetVita - Petshop

A PetVita é um petshop virtual demonstrativo, criado como projeto da disciplina de Projeto de Software. A proposta é reunir em uma única loja produtos para cães e gatos, informações sobre serviços de cuidado e uma experiência de compra simples: o visitante pode explorar o catálogo, consultar detalhes, montar um carrinho e criar uma conta.

O catálogo inclui rações, petiscos, brinquedos, itens de higiene, acessórios e produtos para cães e gatos. A página inicial também apresenta serviços como banho e tosa, atendimento veterinário e hospedagem. O site é uma demonstração acadêmica: não processa pagamentos nem confirma pedidos reais.

O frontend foi desenvolvido com React e Vite, e o backend com Flask, Flask-Login e SQLite.

## Requisitos

- Python 3.8 ou superior
- Node.js 20.19+ ou 22.12+

## Configuração

No PowerShell, na pasta do projeto:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
npm install
python init_db.py
```

`init_db.py` recria as tabelas e insere 72 produtos de exemplo. **A execução apaga os dados existentes**, incluindo usuários e itens do carrinho.

## Executar em desenvolvimento

Abra dois terminais, ative o ambiente virtual Python no primeiro e inicie os servidores:

```powershell
$env:FLASK_DEBUG = "1"
python run.py
```

```powershell
npm run dev
```

Abra o endereço informado pelo Vite, normalmente `http://127.0.0.1:5173`. O Vite encaminha as chamadas de API, autenticação e arquivos estáticos para o Flask em `http://127.0.0.1:5000`.

## Build e execução do frontend pelo Flask

```powershell
npm run build
python run.py
```

Com o build gerado, o Flask serve o frontend em `http://127.0.0.1:5000`. O comando `npm run preview` também permite visualizar localmente o build do Vite.

## Funcionalidades

- **Página inicial:** apresentação da loja, busca, navegação por categorias, produtos em destaque e cartões informativos de serviços.
- **Catálogo:** listagem paginada de produtos, com 12 itens por página, busca por texto, filtro por categoria e faixa de preço e ordenação por nome, preço ou avaliação.
- **Detalhes do produto:** imagem, categoria, avaliação e preço; permite selecionar quantidade, adicionar o item ao carrinho e consultar o CEP pelo ViaCEP. A indicação de cobertura considera somente a cidade de São Paulo; não calcula frete ou prazo real.
- **Carrinho:** adiciona produtos, atualiza quantidades, remove itens, limpa o carrinho e calcula o subtotal. Os dados ficam no SQLite; visitantes são identificados por uma sessão e usuários autenticados pelo identificador da conta.
- **Conta:** cadastro com nome, email ou telefone e senha; login por email ou telefone e logout com sessão gerenciada pelo Flask-Login.
- **Painel:** página de boas-vindas para usuários autenticados, com atalhos visuais demonstrativos para pedidos, favoritos, dados e endereços.
- **Layout responsivo:** páginas adaptadas para desktop e dispositivos móveis.

O botão de pagamento e os atalhos do painel são demonstrativos. Não há checkout, integração de pagamento, criação ou acompanhamento de pedidos, favoritos ou gerenciamento de endereços.

## Estrutura

- `app/`: aplicação Flask, autenticação, modelos, rotas e CSS.
- `src/models/`: chamadas à API e funções de domínio do frontend.
- `src/presenters/`: estado e lógica de apresentação das telas.
- `src/views/`: composição das páginas e rotas React.
- `src/components/`: componentes reutilizáveis.
- `src/context/`: estado compartilhado do carrinho.
- `public/`: identidade visual e imagens dos produtos.
- `dist/`: arquivos gerados por `npm run build`; não precisa ser versionado.
- `run.py`: inicialização local do Flask.
- `init_db.py`: recriação e carga do banco com produtos de exemplo.

O frontend organiza suas responsabilidades no padrão Model-View-Presenter: models concentram acesso à API e operações de dados, presenters mantêm estado e lógica de apresentação, e views compõem as páginas React. Os componentes reutilizáveis ficam em `src/components/`, e `src/context/CartContext.jsx` compartilha o estado do carrinho.

## Rotas

### Páginas do site

| Rota | Acesso | Descrição |
| --- | --- | --- |
| `/` | Público | Página inicial da PetVita, com apresentação, serviços e produtos em destaque. |
| `/products` | Público | Catálogo com busca, filtros, ordenação e paginação. |
| `/product/<id>` | Público | Detalhes do produto identificado pelo seu ID no banco. |
| `/auth/login` | Público | Formulário de login. Usuários autenticados são redirecionados para a página inicial. |
| `/auth/register` | Público | Formulário de cadastro. Após o cadastro, a pessoa é direcionada ao login. |
| `/auth/logout` | Autenticado | Encerra a sessão e retorna à página inicial. |
| `/dashboard` | Autenticado | Painel de boas-vindas com atalhos visuais demonstrativos da conta. |

As páginas são exibidas pelo frontend React. No ambiente de desenvolvimento, o Vite serve a interface; após `npm run build`, o Flask entrega os arquivos compilados de `dist/`.

### API

| Método e rota | Descrição |
| --- | --- |
| `GET /api/products` | Lista produtos e informações de paginação. Aceita `featured` (`true`), `category`, `search`, `min_price`, `max_price`, `sort_by` (`name`, `price_asc`, `price_desc` ou `rating`), `page` e `per_page`. |
| `GET /api/products/<id>` | Retorna os dados de um produto; responde com erro 404 se o ID não existir. |
| `GET /api/categories` | Retorna as categorias existentes no catálogo. |
| `GET /api/session` | Informa se a sessão está autenticada, os dados básicos do usuário e mensagens temporárias. |
| `GET /api/cart` | Retorna os itens, quantidades, subtotal e contagem do carrinho da sessão ou conta atual. |
| `POST /api/cart` | Adiciona um produto ao carrinho ou incrementa sua quantidade. Recebe `product_id` e, opcionalmente, `quantity` em JSON. |
| `PUT /api/cart/<id>` | Atualiza a quantidade de um item. Recebe `quantity` em JSON. |
| `DELETE /api/cart/<id>` | Remove um item do carrinho. |
| `DELETE /api/cart` | Remove todos os itens do carrinho atual. |
| `GET` e `POST /auth/login` | Exibe e processa o formulário de login por email ou telefone e senha. |
| `GET` e `POST /auth/register` | Exibe e processa o formulário de cadastro. |
| `GET /auth/logout` | Encerra a sessão autenticada. |

As rotas de autenticação recebem e enviam formulários HTML; as rotas iniciadas por `/api/` retornam JSON. O carrinho está disponível também sem login e é associado à sessão do navegador.

## Tecnologias

- Frontend: React 19, React Router DOM 7, Vite 6 e CSS.
- Backend: Python, Flask 3, Flask-SQLAlchemy, Flask-Login e SQLite.

## Antes de publicar

- Configure `SECRET_KEY` com um valor aleatório e persistente no ambiente de execução. Sem essa variável, a aplicação gera uma chave temporária, que invalida as sessões quando o processo reinicia.
- Mantenha `FLASK_DEBUG` desativado fora do desenvolvimento.
- Use um servidor WSGI apropriado para produção; `python run.py` inicia o servidor de desenvolvimento do Flask.
- Garanta armazenamento persistente para o arquivo `petshop.db` e faça backup dos dados.
- O catálogo, o cadastro, o carrinho e as consultas usam o banco SQLite local; o checkout não está implementado.
