# PetVita - Petshop

Este projeto consiste na entrega da disciplina de Projeto de Software, desenvolvida em React e Vite, backend Flask, Flask-Login e SQLite.

## Requisitos

- Python 3.8 ou superior
- Node.js 20.19+ ou 22.12+

## Desenvolvimento

1. Crie e ative um ambiente virtual Python:

   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

2. Instale as dependências do backend:

   ```powershell
   pip install -r requirements.txt
   ```

3. Instale as dependências do front-end:

   ```powershell
   npm install
   ```

4. Em terminais separados, inicie o Flask e o Vite:

   ```powershell
   python run.py
   ```

   ```powershell
   npm run dev
   ```

5. Acesse o endereço exibido pelo Vite (por padrão, `http://127.0.0.1:5173`).

O Vite encaminha as requisições de autenticação e sessão para o Flask em `http://127.0.0.1:5000`.

## Build de produção

Gere o front-end compilado e inicie o Flask:

```powershell
npm run build
python run.py
```

A aplicação ficará disponível em `http://127.0.0.1:5000`.

## Arquitetura do front-end

O front-end segue MVP (Model-View-Presenter), com a camada de interface React organizada em `src/`:

- `src/models/`: dados e operações da aplicação, como catálogo e consulta da sessão Flask.
- `src/presenters/`: estado e regras de apresentação das telas, expostos por hooks React.
- `src/views/`: composição das páginas Home, autenticação, painel e seleção da tela atual.
- `src/components/`: componentes reutilizáveis e partes da Home, separados em `common/` e `home/`. O painel lateral do carrinho está em `common/CartDrawer.jsx`.
- `src/main.jsx`: ponto de entrada do React e carregamento dos estilos.
- `app/static/css/`: estilos globais compartilhados pelas telas React.
- `app/`: backend Flask, autenticação, modelos e integração com o build do front-end.
- `public/`: imagens usadas pelo front-end.
- `dist/`: build do Vite, gerado por `npm run build`.
- `petshop.db`: banco de dados SQLite.
- `run.py`: ponto de entrada do servidor Flask.

A Home é composta por `HeroSection`, `ProductsSection` (com `ProductCard`) e `ServicesSection`. Seu estado de busca, categoria e carrinho fica no presenter `useHomePresenter`; os dados dos produtos ficam no model `productModel`. Produtos sem imagem definida mantêm o espaço reservado em branco no cartão para receber uma imagem depois.

O carrinho abre em um painel lateral e permite alterar quantidades ou remover itens. Os dados do carrinho são mantidos durante a sessão atual da página.

O hero da Home usa `public/header.png` à direita, com texto e botões à esquerda em um fundo branco neutro. Um cartão de destaque abaixo da imagem completa a composição.

## Rotas principais

- `/`: pagina inicial.
- `/dashboard`: painel para usuarios autenticados.
- `/auth/login`: login.
- `/auth/register`: cadastro.
- `/auth/logout`: sair da conta.
