# Todos

A full-stack task manager with a React frontend and a NestJS API backed by MongoDB.

## Features

- Register, log in, and log out with JWT authentication stored in HTTP-only cookies.
- Refresh sessions with rotating refresh tokens.
- Create, edit, complete, and delete tasks belonging to the signed-in user.
- Filter tasks by status and search by text through the API.
- View total, active, and completed task counts on the dashboard.

## Project structure

```text
todo/       React frontend (TypeScript, Vite, Tailwind CSS, React Query)
todo-api/   NestJS backend (TypeScript, Mongoose, JWT, Vitest)
```

Each app has its own `package.json` and Yarn lockfile. Run its commands from its directory.

## Local setup

Prerequisites: Node.js (development checks use Node.js 24), Yarn Classic, and a running MongoDB instance, either local or hosted.

### 1. Configure the API

Create `todo-api/.env`:

```dotenv
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/todos
JWT_SECRET=replace-with-a-random-access-token-secret
JWT_REFRESH_SECRET=replace-with-a-different-random-refresh-token-secret
NODE_ENV=development
```

Use your own MongoDB connection string and distinct random secrets. Local `.env` files are ignored by Git.

### 2. Start the API

```sh
cd todo-api
yarn install --frozen-lockfile
yarn start:dev
```

The API listens at `http://localhost:3000` by default.

### 3. Configure and start the frontend

Create `todo/.env`:

```dotenv
VITE_API_BASE_URL=http://localhost:3000
```

In a separate terminal, from the repository root:

```sh
cd todo
yarn install --frozen-lockfile
yarn dev
```

Open `http://localhost:5173`, register an account, and log in. The API currently allows credentialed browser requests from this origin. If you change the frontend origin, update the CORS configuration in `todo-api/src/main.ts`.

## API routes

Routes are relative to the API base URL, with no `/api` prefix.

| Method | Route | Purpose |
| --- | --- | --- |
| POST | `/auth/register` | Register with an email and password |
| POST | `/auth/login` | Log in and set authentication cookies |
| POST | `/auth/refresh` | Rotate the refresh token and renew cookies |
| POST | `/auth/logout` | Revoke the refresh token and clear cookies |
| GET | `/auth/me` | Get the signed-in user's profile |
| GET | `/todos` | List the signed-in user's tasks |
| GET | `/todos/status` | Get `allTasks`, `activeTodos`, and `completedTodos` counts |
| GET | `/todos/:id` | Get a task |
| POST | `/todos` | Create a task |
| PATCH | `/todos/:id` | Update a task |
| DELETE | `/todos/:id` | Delete a task |

The profile and all task routes require authentication. Browser requests must include credentials to send the cookies; the frontend Axios client already does this.

`GET /todos` accepts optional `status` (`all`, `active`, or `completed`) and `search` query parameters, for example `/todos?status=active&search=meeting`.

Successful responses use this envelope:

```json
{
  "isSuccess": true,
  "statusCode": 200,
  "message": "Success",
  "data": {}
}
```

## Development commands

| Directory | Command | Purpose |
| --- | --- | --- |
| `todo` | `yarn dev` | Start the Vite development server |
| `todo` | `yarn build` | Type-check and build the frontend |
| `todo` | `yarn lint` | Run Oxlint |
| `todo` | `yarn preview` | Preview the built frontend |
| `todo-api` | `yarn start:dev` | Start the API in watch mode |
| `todo-api` | `yarn build` | Compile the API |
| `todo-api` | `yarn start:prod` | Start the compiled API |
| `todo-api` | `yarn lint` | Run Oxlint |
| `todo-api` | `yarn test` | Run unit tests |
| `todo-api` | `yarn test:cov` | Run unit tests with coverage |
| `todo-api` | `yarn test:e2e` | Run integration tests against the configured app and MongoDB |

The API includes NestJS Observe configuration in `todo-api/src/app.module.ts`; its credentials are currently placeholders. Configure these if you enable observability for your environment.
