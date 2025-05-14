# NordHealth Test
It's a dummy application for interview.

## Packages
| Name      | version |
| ----------|---------|
| Vue       | 3.5.13  |
| Vue Router| 4.5.1   |
| Nuxt      | 3.17.2  |
| eslint    | 9.26.0  |
| @nuxt/eslint | 1.3.0|
| @provetcloud/css | 1.1.0 |
| @provetcloud/web-components | 1.3.4 |
| prettier  | 3.5.3   |
| husky     | 8.0.0   |

## Setup

Make sure to install dependencies:

```bash
# npm
$ npm install
```

## Note
please use development mode for now to work with API endpoints as well as to see the error handling strategies. In future these endpoints can be replaced by actual backend APIs.

## Development Server

Start the development server on http://localhost:3000:

```bash
# npm
$ npm run dev

# linting
$ npm run lint:check
$ npm run lint:fix

# prettier
$ npm run prettier:check
$ npm run prettier:fix
```

## Production

Build the application for production:

```bash
# npm
$ npm run build
```

Locally preview production build:

```bash
# npm
$ npm run preview
```

## E2E Test (playwright)
```bash
# Run test
$ npm run test:e2e

# Debug test
$ npm run test:e2e:debug
```

## Docker

Development Server
```bash
# Build
$ docker compose --env-file .env.dev build --no-cache nordhealth-dev

# Preview
$ docker compose --env-file .env.dev up nordhealth-dev
```

Production Server
start the sever on http://localhost:5000:
```bash
# Build
$ docker compose --env-file .env.prod build --no-cache nordhealth-prod

# Preview
$ docker compose --env-file .env.prod up nordhealth-prod
```