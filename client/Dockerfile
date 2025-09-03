#BUILD STAGE
FROM node:lts-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./

RUN pnpm install

COPY . .

RUN pnpm run build

#RUNTIME STAGE
FROM node:lts-alpine as runtime

WORKDIR /app

RUN npm install -g pnpm

COPY package.json ./

RUN pnpm install

COPY --from=builder /app/dist ./dist

COPY --from=builder /app/server ./server

COPY tsconfig.json .

EXPOSE 3000

CMD ["pnpm", "run", "prod"]