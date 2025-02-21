# Payflow - Backend Challenge

## Descrição

Este projeto implementa uma versão simplificada do sistema de pagamentos, onde usuários e lojistas podem realizar transferências de dinheiro entre si. A aplicação inclui validações como saldo suficiente, transações atômicas, e notificações em tempo real para recebimentos. 

Foi desenvolvido com as seguintes tecnologias:

- **NestJS**: Framework para a criação de APIs RESTful.
- **MySQL**: Banco de dados relacional para armazenamento dos dados de usuários e transações.
- **Redis**: Utilizado para FIFO (First In, First Out) e cache de operações de transferências.
- **Docker**: Para containerização da aplicação, facilitando o deploy e a configuração do ambiente.
- **Bcrypt**: Para criptografar senhas de usuários.

A aplicação segue as melhores práticas de design e organização de código, incluindo conceitos como **Event Sourcing**, **SOLID**, **Estrutura de Dados** e **Design Patterns**.

## Funcionalidades Implementadas

1. **Cadastro de Usuários e Lojistas**:
    - Campos obrigatórios: Nome Completo, CPF, e-mail e senha.
    - Validação de CPF e e-mail únicos no sistema.
    - Lojistas e usuários têm carteiras virtuais com saldo.

2. **Transferência de Dinheiro**:
    - Os usuários podem enviar dinheiro para outros usuários ou lojistas, desde que tenham saldo suficiente.
    - As transferências são atômicas, ou seja, se houver qualquer inconsistência, a operação é revertida.

3. **Validação de Transferências**:
    - Antes de concluir a transferência, a aplicação consulta um serviço de autorização externo para validar a operação.
    - Utilização de um mock para simular a autorização externa (GET - [https://util.devi.tools/api/v2/authorize](https://util.devi.tools/api/v2/authorize)).

4. **Notificações**:
    - Ao receber um pagamento, o usuário ou lojista é notificado via SMS ou e-mail.
    - A notificação é feita por meio de um serviço de terceiros, que também é simulado via mock (POST - [https://util.devi.tools/api/v1/notify](https://util.devi.tools/api/v1/notify)).

5. **Gerenciamento de Banco de Dados**:
    - O sistema utiliza um banco de dados MySQL para persistência de dados, com tabelas para armazenar informações de usuários, lojistas e transações.

6. **Cache com Redis**:
    - Utilização de Redis para operações de FIFO e otimização de algumas consultas.

## Como Rodar o Projeto

### Requisitos

- Docker
- Node.js (versão >= 20)
- MySQL
- Redis

### Passos para execução:

1. Clone o repositório:

    ```bash
    git clone https://github.com/Lucaswillians/payflow.git
    cd payflow
    ```

2. Suba os containers com Docker:

    ```bash
    docker-compose up -d
    ```

    Isso vai subir o ambiente com MySQL, Redis e o seu backend NestJS.

4. Inicie o servidor:

    ```bash
    docker-compose exec backend npm run start:dev
    ```

Agora, a aplicação estará disponível em `http://localhost:3000`.

### Insomnia - Testando os Endpoints

Para facilitar o teste e a visualização dos endpoints da API, foi incluído um arquivo do Insomnia no projeto. O Insomnia é uma ferramenta de teste de APIs que permite importar e testar requisições de forma prática e visual.

#### Como usar:

1. Baixe e instale o [Insomnia](https://insomnia.rest/), caso ainda não tenha.
2. Importe o arquivo `payflow-apis.json` (disponível no repositório) diretamente no Insomnia.
3. O arquivo já contém as configurações dos principais endpoints da API, incluindo os detalhes das requisições e dos corpos de dados esperados para cada operação.

Com o arquivo importado, você poderá:

- Testar os endpoints como **/transfers**, **/users** e **/wallets**, sem precisar configurar manualmente as requisições.
- Visualizar os corpos de requisição e resposta para cada endpoint.
- Realizar testes de maneira rápida e eficiente, verificando as respostas da API.

Basta seguir os exemplos de requisição contidos no arquivo para enviar as requisições e verificar os resultados no Insomnia.

Este arquivo serve como uma documentação interativa, permitindo que você explore os endpoints de forma simples.




