[![dependencies Status](https://david-dm.org/Mathieu-R/streamwave-api-ts/status.svg)](https://david-dm.org/Mathieu-R/streamwave-api-ts)

# streamwave-api

This is a merge and rework of the two APIs for the streamwave-app using TypeScript, PostgreSQL and Fastify.

### Legacy APIs

-   streamwave-library: https://github.com/Mathieu-R/streamwave-library
-   streamwave-auth: https://github.com/Mathieu-R/streamwave-auth

What changed ?

-   Unified user table instead of splitting for local user and Google user.
-   JWT is stored in cookies instead of sending it back to the client.

### Tech

[X] Fastify
[X] Route validation (with zod)
[X] PostgreSQL (with Sequelize ORM)
[X] Redis
[X] Maildev (to catch e-mail in dev mode)

### Usage

#### Prepare media files

Prepare some media files you want to stream in the application.  
You can use the command line tool [metadatapp](https://github.com/Mathieu-R/metadatapp) to extract metadata and create necessary files needed for streaming.  
Then, move the data folder at the root of this project.

#### Generate Google OAuth2 secrets

Go to https://console.cloud.google.com and create a new project.  
Then go to APIs and services > Credentials then create an `OAuth 2.0 Client`. Take note of **Client ID**, **Client secret**.  
You need to set the **Authorised JavaScript origins** to `http://localhost:5173` and **Authorised redirect URIs** to `http://localhost:3000/google/login/callback`.

### Set environment variables

Set environment variables. For development purpose, you can use a `.env` file placed at the root of the project.

`POSTGRES_USER`: username for PostgreSQL.  
`POSTGRES_PASSWORD`: password for PostgreSQL.  
`POSTGRES_DB`: DB for PostgreSQL.

`REDIS_PASSWORD`: strong secret for Redis.

`GOOGLEID`: Google OAuth2 client id.  
`GOOGLESECRET`: Google OAuth2 secret.  
`GOOGLECALLBACKPROD`: Google Oauth2 callback.

`MAIL_HOST_DEV`: host url for mail (ex: localhost) [**dev**].  
`MAIL_PORT_DEV`: smtp port for mail (ex: 1025 for maildev) [**dev**].  
`MAIL_HOST_PROD`: host url for mail (ex: smtp.example.com) [**prod**].  
`MAIL_PORT_PROD`: smtp port for mail [**prod**].  
`MAIL_USER_PROD` and `MAIL_PASSWORD_PROD`: credentials of the email that will send the emails (account verification, password forgotten,...) [**prod**].

`JWT_SECRET`: secret for JSON WEB TOKEN.

#### Run

```
npm install
npm run build
npm run serve
```
