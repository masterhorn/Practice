FROM node:13 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:13.13-alpine
COPY --from=builder /app .
EXPOSE 3000 3001
CMD [ "npm", "start" ]