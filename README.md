# Repositório do projeto Store Manager

  Este projeto consiste no desenvolvimento de uma API RESTful utilizando uma arquitetura em camadas(MVC). A API representa um sistema de gerenciamento de vendas, sendo possível criar, visualizar, deletar e atualizart produtos e vendas.

  Para criação do projeto foram utilizadas como tecnologias principais: JavaScript, Express, MySQL e Node.js. Também foram desenvolvidos teste para garantir a funcionalidade das implementações.

## Orientações

<details>
<summary>🐳 Iniciando a aplicação no Docker Compose</summary>

```bash
# Instale as dependências
npm install

# Inicie os containers do compose `backend` e `db`
# A aplicação estará disponível em `http://localhost:3001` em modo de desenvolvimento
docker-compose up -d

# É possível ver os logs da aplicação com `docker logs -n 20 -f <nome-do-container>`
docker logs -n 20 -f store_manager
```
</details>

<details>
<summary>🖥️ Iniciando a aplicação localmente</summary>

> ⚠️ Atenção: Ao rodar localmente, a aplicação deverá receber variáveis de ambiente como exemplificado em [`env.example`](./env.example) para poder se comunicar com o serviço de banco de dados.

```bash
# Instale as dependências
npm install

# Inicie apenas o serviço `db` no compose
docker-compose up -d db

# Inicie a aplicação em modo de desenvolvimento
npm run dev:local
```
</details>

<details>
<summary>🛠 Rodando testes</summary>

Segue um resumo dos comandos relacionados aos testes:

```bash
#### Comandos dos testes com mocha
npm run test:mocha     # roda os testes do mocha
npm run test:coverage  # roda os testes e mostra a cobertura geral
npm run test:mutation  # roda os testes e mostra a cobertura de mutações
```
</details>
