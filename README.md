# Trophy

A modern full-stack application built with React, TypeScript, Express, and various web3 technologies.

## 🚀 Tech Stack

- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS
- **Backend**: Express.js, Prisma ORM
- **Authentication**: Privy.io
- **Web3 Integration**: Wagmi, Viem, Biconomy
- **State Management**: Zustand, React Query
- **UI Components**: Radix UI, Lucide React
- **Real-time Communication**: Huddle01 SDK
- **Build Tool**: Vite
- **Package Manager**: Bun (with npm compatibility)

## 📦 Prerequisites

- Node.js (v24 or higher)
- Bun (recommended) or npm
- PostgreSQL database

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/Metastuc/Trophy.git
cd Trophy
```

2. Install dependencies:
```bash
bun install
# or if using npm
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your actual values
```

4. Set up the database:
```bash
bun run db-pull
# or
npm run db-pull
```

5. Generate Prisma client:
```bash
bunx prisma generate
# or
npx prisma generate
```

## 🛠️ Development

Start the development server (frontend only):
```bash
bun run dev
# or
npm run dev
```

Start the backend server with watch mode:
```bash
bun run server
# or
npm run server
```

Start both frontend and backend concurrently:
```bash
bun run start
# or
npm run start
```

## 📋 Available Scripts

- `build` - Build the application for production
- `dev` - Start Vite development server
- `server` - Start backend server with watch mode
- `start` - Run both frontend and backend concurrently
- `lint` - Run ESLint and Prettier
- `preview` - Preview production build
- `prod` - Run production server
- `db-pull` - Pull database schema

## 🏗️ Project Structure

```
├── server/          # Express backend application
├── shared/          # Shared utilities and types
├── client/          # React frontend application
├── prisma/          # Database schema and migrations
└── public/          # Static assets
```

## ⚙️ Configuration

The project uses path aliases configured in package.json:
- `#*` points to `./server/*`
- `#~/*` points to `./shared/*`

## 📝 Code Quality

- ESLint for code linting
- Prettier for code formatting
- TypeScript for type safety
- Prettier plugins for import organization and Tailwind CSS

## 🚀 Production

Build for production:
```bash
bun run build
# or
npm run build
```

Start production server:
```bash
bun run prod
# or
npm run prod
```

Preview production build:
```bash
bun run preview
# or
npm run preview
```

## 📄 License

This is a private project. All rights reserved.

---

For more information, check the documentation of the individual packages used in this project.