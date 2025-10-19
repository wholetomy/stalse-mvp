## Como rodar o projeto com Docker?
1. Para iniciar o projeto, é necessário ter instalado o [Docker](https://www.docker.com/) e o [Git](https://git-scm.com/).
2. Baixe o repositório do Github através do comando abaixo
```bash
git clone https://github.com/wholetomy/stalse-mvp
```
3. Utilize os comandos abaixo para iniciar o docker
```bash
cd stalse-mvp
docker compose build
docker compose up
```

## Como acessar o projeto?
1. Uma vez iniciado o Docker, utilize as urls abaixo para acessar as instâncias do projeto
	Frontend: http://localhost:3000/
	N8N: http://localhost:5679/

## Como testar o N8N?
1. Para testar a funcionalidade do N8N, basta abrir a tela dele (http://localhost:5679/) e clicar no Workflow `Webhook + HTTP Request`.
2. Em seguida, clique em "Execute workflow". Dessa forma, o N8N ficará escutando para o workflow dele ser ativado.
3. Para ativar o workflow do N8N,  acesse a tela de Tickets (http://localhost:3000/tickets) no frontend e clique em "Detalhes" em algum dos tickets.
4. Na tela que abrir, altere o "Status" para "Closed" ou altere a "Prioridade" para "High".
5. Em seguida, troque para a aba do N8N e você verá que o workflow foi realizado com sucesso.

**Se for necessário logar no N8N, aqui as credenciais:**
- **Login**: stalsemvp@stalse.com
- **Senha**: TesteStalse@123

## Kaggle
O dataset utilizado no projeto foi o do link a seguir:
	Link: https://www.kaggle.com/code/laxmiir/support-triage/output

