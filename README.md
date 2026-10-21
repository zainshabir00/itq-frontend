# ITQ Task Manager

A Vue 3 task manager built with TypeScript, Vite, and Quasar. The interface lets you create, edit, delete, search, filter, and complete tasks. Task data is read from and written to a separate task API.

## Prerequisites

- **Node.js:** `22.18.0` or later in the 22.x line, or `24.12.0` or later. These are the versions allowed by `package.json`.
- **pnpm:** version 9, used to install the dependencies recorded in `pnpm-lock.yaml`.
- **Git:** needed only if you are cloning the project.
- **Task API:** needed to load and save tasks. For local development, the Vite server proxies API requests to `http://localhost:8120`.

## Install Node.js, pnpm, and Git

Use the official Node.js installer or a trusted version manager, and choose a Node.js version that meets the requirement above. The Node.js installation includes npm, which is used below to install pnpm.

### Windows

1. Install a supported Node.js LTS version from [nodejs.org](https://nodejs.org/). The Windows installer includes npm.
2. Install Git for Windows from [git-scm.com](https://git-scm.com/download/win) if Git is not already installed.
3. Open PowerShell and install pnpm 9:

   ```powershell
   npm install --global pnpm@9
   ```

4. Verify the installations:

   ```powershell
   node --version
   npm --version
   pnpm --version
   git --version
   ```

   Confirm that Node.js meets the version requirement above and pnpm reports version 9.

### macOS

1. Install a supported Node.js LTS version from [nodejs.org](https://nodejs.org/), or use a Node.js version manager such as [nvm](https://github.com/nvm-sh/nvm).
2. Install Git if needed. It is available through the Xcode Command Line Tools (`xcode-select --install`) or from [git-scm.com](https://git-scm.com/download/mac).
3. In Terminal, install pnpm 9:

   ```sh
   npm install --global pnpm@9
   ```

4. Verify the installations:

   ```sh
   node --version
   npm --version
   pnpm --version
   git --version
   ```

   Confirm that Node.js meets the version requirement above and pnpm reports version 9.

### Linux

1. Install a supported Node.js LTS version using your distribution's package manager or a version manager such as [nvm](https://github.com/nvm-sh/nvm). Check the installed version against the requirement above; distribution packages may be older than required.
2. Install Git using your distribution's package manager if it is not already installed.
3. In a terminal, install pnpm 9:

   ```sh
   npm install --global pnpm@9
   ```

4. Verify the installations:

   ```sh
   node --version
   npm --version
   pnpm --version
   git --version
   ```

   Confirm that Node.js meets the version requirement above and pnpm reports version 9.

## Get the project

If you do not already have a local copy, clone the repository using its URL:

```sh
git clone <repository-url>
cd <repository-directory>
```

Replace the placeholders with the repository URL and the directory created by Git. If the project is already checked out, open a terminal in its root directory (the directory containing `package.json`).

## Install dependencies

From the project root, install dependencies using the lockfile:

```sh
pnpm install
```

## Start the task API

Start a task API that is compatible with this frontend before opening the app. By default, the development server forwards requests under `/api` to:

```text
http://localhost:8120
```

The frontend uses these endpoints:

- `GET /api/tasks` to load the task list.
- `POST /api/tasks` to create a task, sending `title` and `description`.
- `PUT /api/tasks` to update a task, sending `id`, `title`, `description`, and `completed`.
- `DELETE /api/tasks` to delete a task, sending `id`.

Tasks returned by the API should include `id`, `title`, `description`, `completed`, and `createdAt`. This repository contains the frontend; it does not start or provide the API server. If the backend is unavailable, the app cannot load or persist tasks.

### Use a backend at a different address

To use a backend other than `http://localhost:8120`, create a `.env.local` file in the project root and set its base URL:

```dotenv
VITE_API_BASE_URL=http://localhost:8120
```

Replace the value with the backend's origin, for example `http://localhost:9000`. Do not append `/api`; the frontend adds that path itself. Restart the Vite server after changing this file. When `VITE_API_BASE_URL` is set, requests go directly to that address, so the backend must allow requests from the frontend's origin if they are cross-origin.

The Vite proxy applies only during local development. For a production deployment, configure `VITE_API_BASE_URL` to the production API origin when building the frontend, and host the frontend and API so the browser can reach both.

## Run the app in development

From the project root, run:

```sh
pnpm dev
```

Open the local URL printed by Vite in your browser (by default, `http://localhost:5173`). Keep the terminal running while you use the app; press `Ctrl+C` to stop the development server.

## Check, test, and build

Run the TypeScript/Vue type check and create an optimized production build:

```sh
pnpm build
```

Run the unit tests once:

```sh
pnpm exec vitest run
```

Run the unit tests in watch mode instead:

```sh
pnpm test:unit
```

Run the lint scripts:

```sh
pnpm lint
```

The lint scripts use auto-fix options and may modify source files. To format the source files with Prettier:

```sh
pnpm format
```

Preview a previously built production bundle locally:

```sh
pnpm preview
```

Run `pnpm build` before `pnpm preview`. Previewing serves the built frontend; it does not start the task API.

## Project layout

- `src/App.vue` — main task-management screen.
- `src/components/` — task list, summary, and task dialogs.
- `src/composables/useTasks.ts` — task loading and mutations.
- `src/services/` — HTTP request and task API calls.
- `src/types/` — shared TypeScript task types.
- `vite.config.ts` — Vite configuration, including the development API proxy.

## Troubleshooting

- **Node or pnpm version is rejected:** check `node --version` and `pnpm --version`; install a Node.js version allowed above and pnpm 9, then reopen the terminal.
- **Dependency install fails:** run `pnpm install` from the directory containing `package.json`. If dependencies or the lockfile were changed intentionally, install them again with pnpm.
- **The app reports it cannot connect to the task API:** make sure the backend is running and reachable at the configured API address, and verify it implements the endpoints listed above.
- **Changes to `.env.local` have no effect:** stop and restart the Vite development server after changing environment variables.
# itq-fe
