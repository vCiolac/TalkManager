# Talker Manager

Este projeto consiste em uma aplicação para cadastro de palestrantes (talkers), oferecendo funcionalidades de cadastro, visualização, pesquisa, edição e exclusão de informações.

## Funcionalidades

- **Listagem de Palestrantes:** Endpoint `GET /talker` retorna um array com todas as pessoas palestrantes cadastradas. Caso não haja palestrantes cadastrados, retorna um array vazio.
  
- **Visualização de Palestrante por ID:** Endpoint `GET /talker/:id` retorna uma pessoa palestrante com base no ID fornecido na rota. Se não for encontrado nenhum palestrante com o ID fornecido, retorna status 404.

- **Autenticação:** Endpoint `POST /login` recebe os campos `email` e `password` no corpo da requisição e retorna um token aleatório de 16 caracteres para autenticação.

- **Validação de Autenticação:** Os campos recebidos pelo endpoint `/login` são validados. Caso os valores sejam inválidos, retorna status 400 com a mensagem de erro correspondente.

- **Cadastro de Palestrante:** Endpoint `POST /talker` adiciona um novo palestrante ao sistema.

- **Atualização de Palestrante:** Endpoint `PUT /talker/:id` permite a edição dos dados de um palestrante existente.

- **Exclusão de Palestrante:** Endpoint `DELETE /talker/:id` remove um palestrante do sistema.

- **Pesquisa de Palestrantes:** Endpoint `GET /talker/search?q=searchTerm` permite pesquisar palestrantes por um termo específico.

- **Filtro por Avaliação:** No endpoint `GET /talker/search`, é possível filtrar palestrantes por avaliação utilizando o parâmetro `rate=rateNumber`.

- **Filtro por Data de Visualização:** No endpoint `GET /talker/search`, é possível filtrar palestrantes por data de visualização utilizando o parâmetro `date=watchedDate`.

- **Atualização de Avaliação:** Endpoint `PATCH /talker/rate/:id` permite atualizar a avaliação de um palestrante específico.
