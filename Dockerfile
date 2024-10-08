FROM node  
WORKDIR /app

COPY . .
RUN npm install
RUN npm run build

CMD ["node", "-r", "ts-node/register/transpile-only", "-r", "tsconfig-paths/register", "dist/index.js"]