# Gerenciador de Finanças Web

Interface web para o gerenciamento de finanças pessoais, permitindo o controle de receitas, despesas, saldos e categorias. Este projeto é o frontend do sistema **Gerenciador de Finanças**, desenvolvido com HTML, CSS e JavaScript, e utiliza o backend para autenticação e manipulação de dados.

## Funcionalidades

- **Autenticação de Usuários**:
  - Login e logout.
  - Cadastro de novos usuários.
- **Gerenciamento de Finanças**:
  - Visualização de saldo total, receitas e despesas.
  - Listagem e filtragem de transações financeiras.
  - Adição de receitas e despesas.
- **Gerenciamento de Categorias**:
  - Criação e listagem de categorias de receitas e despesas.
- **Interface Responsiva**:
  - Design adaptado para diferentes tamanhos de tela.

## Pré-requisitos

- **Backend**: Certifique-se de que o backend do projeto está configurado e rodando. Ele pode ser encontrado no repositório [gerenciador-financas](https://github.com/BeaMarinhoDev/gerenciador-financas).
- **Node.js**: Versão 14 ou superior.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/BeaMarinhoDev/gerenciador-financas-web.git
   cd gerenciador-financas-web
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Inicie o servidor local:
   ```bash
   npm start
   ```

4. Acesse o projeto no navegador:
   ```
   http://localhost:8080
   ```

## Estrutura do Projeto

Abaixo está a estrutura de diretórios e arquivos do projeto:

```
gerenciador-financas-web/
├── public/
│   ├── cadastro.html
│   ├── extrato.html
│   ├── gerenciar_categorias.js
│   ├── home.html
│   ├── index.html
│   ├── style.css
│   ├── users.html
│   ├── css/
│   │   ├── cadastro.css
│   │   ├── extrato.css
│   │   ├── gerenciar_categorias.css
│   │   ├── home.css
│   │   ├── login.css
│   │   ├── users.css
│   ├── img/
│   │   └── dollar.jpg
│   ├── js/
│       ├── cadastro.js
│       ├── extrato.js
│       ├── gerenciar_categorias.js
│       ├── home.js
│       ├── login.js
│       ├── users.js
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── server.js
```

### Principais Arquivos

- **`server.js`**: Configuração do servidor Express para servir os arquivos estáticos.
- **`public/`**: Diretório contendo os arquivos HTML, CSS, JavaScript e imagens.
- **`package.json`**: Configurações do projeto e dependências.

## Tecnologias Utilizadas

- **HTML5**: Estrutura das páginas.
- **CSS3**: Estilização e design responsivo.
- **JavaScript**: Lógica de interação e comunicação com o backend.
- **Express.js**: Servidor para servir os arquivos estáticos.

## Endpoints do Backend

O frontend se comunica com o backend através dos seguintes endpoints:

- **Autenticação**:
  - `POST /auth/login`: Login de usuários.
  - `POST /auth/register`: Cadastro de novos usuários.
- **Usuários**:
  - `GET /users`: Listagem de usuários.
  - `PUT /users/:id`: Atualização de usuários.
  - `DELETE /users/:id`: Exclusão de usuários.
- **Transações**:
  - `GET /users/transactions`: Listagem de transações.
  - `POST /users/transactions`: Criação de transações.
  - `PUT /users/transactions/:id`: Atualização de transações.
  - `DELETE /users/transactions/:id`: Exclusão de transações.
- **Categorias**:
  - `GET /users/categories`: Listagem de categorias.
  - `POST /users/categories/add`: Criação de categorias.

## Como Contribuir

Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Faça commit das suas alterações:
   ```bash
   git commit -m "Minha nova feature"
   ```
4. Envie para o repositório remoto:
   ```bash
   git push origin minha-feature
   ```
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a licença ISC. Consulte o arquivo `LICENSE` para mais informações.

## Contato

Para dúvidas ou sugestões, entre em contato através do [repositório do projeto](https://github.com/BeaMarinhoDev/gerenciador-financas-web/issues).