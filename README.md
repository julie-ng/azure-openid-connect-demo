# OAuth Demo with Azure AD

This demo Node.js app shows how to use passport.js to implement OpenID Connect against Azure Active Directory (AD)

## Local Demo

### Get the Code

First clone this repository

```
https://github.com/julie-ng/azure-openid-connect-demo
```

and install the dependencies

```
npm install
```

### Configure

For local development, create an `.env` file based on template `.env.sample` and fill it out with your application values, esp. the Azure AD Tenant IDs and the Client ID.

```
PORT=3000
TENANT_ID=
CLIENT_ID=
CLIENT_SECRET=
APP_ID=
…
```

### Generate Secrets for Session

If you open [app/config/oidc.js](./app/config/oidc.js) you will notice the app requires encryption keys for the cookie. To help you out, you can use this helper to generate keys

```
npm run generate-keys
```

Here is some sample output: 

```
key: 7c267bf1d4126312d5ec171d09d0b005
iv: f40803b39aae

key: 38d6f26876075586f51beeca6b3e35fe
iv: 287b7b817aec
```

**_Note: do NOT use these example keys, please generate your own_**


## Demo Users

TODO: add list when demo is deployed.