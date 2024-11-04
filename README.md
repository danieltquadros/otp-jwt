# OTP Authentication API with JWT

Este projeto é uma API de autenticação utilizando a técnica OTP (One-Time Password) para validar o acesso de usuários de forma segura, gerando tokens JWT para acesso subsequente. Ele foi desenvolvido com Node.js, Express, Prisma e PostgreSQL, com foco em segurança e boas práticas.

## Funcionalidades

### 1. Autenticação OTP

- **Rota de Login**
  - Recebe o e-mail do usuário.
  - Gera um código OTP único com tempo de expiração.
  - Armazena o código no banco de dados.
  - Envia o código OTP para o e-mail do usuário através do Mailtrap.
- **Página de Código**
  - **Rota de Validação de OTP**
    - Recebe e valida o código OTP inserido pelo usuário.
    - Marca o código como "usado" para impedir reutilizações.
    - Gera um token JWT para autenticar o usuário.

### 2. Cadastro de Usuários

- **Rota de Cadastro**
  - Recebe nome e e-mail.
  - Realiza verificações de integridade dos dados.
  - Registra o novo usuário.
  - Executa o processo de login com a geração de OTP, enviando-o por e-mail.

## Tecnologias e Ferramentas Utilizadas

- **Node.js**: Plataforma de execução para JavaScript no servidor.
- **Express**: Framework web minimalista para criação das rotas e middlewares.
- **Prisma**: ORM para manipulação do banco de dados PostgreSQL.
- **JWT (JSON Web Token)**: Para geração de tokens seguros para sessões de usuário.
- **Mailtrap**: Serviço de envio de e-mails usado para o envio do código OTP.
- **UUID**: Geração de identificadores únicos para usuários.
- **Zod**: Biblioteca de validação de esquemas de dados.
- **Helmet**: Middleware de segurança para reforçar as cabeçalhos HTTP.
- **TypeScript**: Linguagem de tipagem estática opcional para JavaScript.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

## Instalação e Configuração

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/otp_jwt.git
   cd otp_jwt

   ```

2. **Instale as dependências**:

   ```bash
   npm install

   ```

3. **Configuração do Banco de Dados**:

- Configure o PostgreSQL e crie um banco de dados para o projeto.
- Crie o arquivo .env com as informações de conexão do seu banco.

4. **Configuração do Mailtrap**:

- Crie/Use uma conta no/do Mailtrap e configure o arquivo .env com as credenciais de envio de e-mails.

5. **Execute as migrações do Prisma**:

   ```bash
   npx prisma migrate dev

   ```

6. **Inicie o servidor em ambiente de desenvolvimento**:

```bash
 npm run dev

```

## Variáveis de Ambiente

- Copie o código abaixo, cole no arquivo .env e configure com seus dados

```bash
DATABASE_URL=postgresql://username:password@localhost:5432/otp_jwt
JWT_SECRET=sua_chave_secreta
MAILTRAP_USER=seu_usuario_mailtrap
MAILTRAP_PASS=sua_senha_mailtrap
```

## Uso da API

**Rota de Login**

- Endpoint: POST /auth/sign-in
- Descrição: Recebe o e-mail do usuário e envia o código OTP por e-mail.
- Exemplo de Request:

```bash
{
"email": "usuario@exemplo.com"
}

```

**Rota de Validação de OTP**

- Endpoint: POST /auth/use-otp
- Descrição: Valida o código OTP e retorna um token JWT.
- Exemplo de Request:

```bash
{
"id": "userid",
"code": "123456"
}

```

**Rota de Cadastro**

- Endpoint: POST /auth/signup
- Descrição: Registra um novo usuário.
- Exemplo de Request:

```bash
{
"name": "Nome do Usuário",
"email": "usuario@exemplo.com"
}

```

## Considerações de Segurança

- OTP Expirável: O código OTP é gerado com um tempo de expiração curto e não pode ser reutilizado, o que reduz o risco de ataques de replay.
- JWT Seguro: Todos os tokens JWT são assinados com uma chave secreta armazenada nas variáveis de ambiente, protegendo a integridade da autenticação.
- Helmet: Middleware utilizado para aplicar cabeçalhos de segurança, protegendo contra várias vulnerabilidades conhecidas.

## Autor

Desenvolvido por Daniel Quadros.

## Licença

Este projeto está licenciado sob a licença ISC.

## Contato

Para dúvidas ou sugestões, entre em contato:

E-mail: danieltquadros@hotmail.com
LinkedIn: linkedin.com/in/danieltquadros

##

Sinta-se à vontade para contribuir com o projeto enviando PRs ou sugestões!

Esse README oferece uma visão detalhada do projeto, instruções de uso e documentação técnica que ajudam a compreender e executar a aplicação.
