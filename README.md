GrupoA Educação - Full Stack Web Developer
===================

Projeto desenvolvido para a avaliação de competências técnicas.

As tecnologias utlizadas foram:

|             |Link                                           |
|-------------|-----------------------------------------------|
|Docker       |https://docs.docker.com/engine/install/ubuntu/ |
|NestJS       |https://nestjs.com/                            |
|TypeORM      |https://typeorm.io/#/                          |
|MySQL        |https://www.mysql.com/                         |
|VueJS        |https://br.vuejs.org/                          |

#### Para subir as aplicações via Docker:
   ```bash
   docker-compose up --build
   ```
Após a execução do comando com sucesso as aplicações estarão disponíveis nos seguintes links:
* API RESTfull:
   * Serviço: [http://localhost:3000/api/v1]()
   * Swagger: [http://localhost:3000/api/doc]()

* APP: [http://localhost:8080]()

> As portas dos serviços para acesso fora do container estão no arquivo `.env`, verifique antes de executar o `build` se alguma das portas irá conflitar com algum serviço já existente, caso sim, altere a porta relacionado ao serviço que conflita.
>
> Para a execução correta dos serviços desse projeto, é importe que somente os dados no arquivo `.env` sofram qualquer alteração.

