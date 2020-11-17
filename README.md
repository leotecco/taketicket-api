# TakeTicket API

[Abrir aplicação online - Simplex](http://xxx)

### Membros
1. Alan da Silva Perez, RA: 578886
2. Leonardo Jorge Tecco, RA: 577472
3. Rafael Souza, RA: 580090

## Introdução
Este documento provê uma visão geral da versão do aplicativo Taketicket que está sendo liberada.
Aqui será descrito as funcionalidades do aplicativo, bem como seus problemas e limitações conhecidos.
Por último são descritas as demandas e os problemas que foram resolvidos para liberação da versão atual.

## Notas de release

### Funcionalidade

- Cadastro de partipantes
- Cadastro de empresas
- Login de participantes
- Login de empresas
- Listagem de eventos públicos
- Listagem de eventos
- Criação de eventos
- Edição de eventos
- Exclusão de eventos
- Listagem de ingressos
- Criação de ingressos
- Edição de ingressos
- Exclusão de ingressos
- Compra de ingresos
- Geração de QRCode para os ingressos
- Listagem de compras dos participantes
- Validação de QRCode

### Funcionalidades não concluídas

- Geração de dados estatísticos - NÃO INICIADO

## Compatibilidade

| Requisitos    | Ferramentas   |
|---------------|---------------|
| Sistemas Operacionais | UNIX, Mac OS X, Windows. |

## Tecnologias

| Tecnologia   | Descrição |
|-------------|-----------|
| NodeJS | Plataforma para ambiente back-end em Javascript (https://nodejs.org/en/) |
| MongoDB | Banco de dados NoSQL (https://www.mongodb.com/) |
| ExpressJS | Framework para roteamento (https://expressjs.com/pt-br/) |
| Mongoose | Biblioteca Javascript para modelagem, conexão, validação do MongoDB (https://mongoosejs.com/) |
| aws-sdk | Biblioteca Javascript para utilização dos serviços da AWS (https://mongoosejs.com/) |

## Como instalar e rodar

- `npm install`
- `npm run dev`
