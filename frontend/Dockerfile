# FROM node:20.1.0
# WORKDIR /frontend
# COPY package.json .
# RUN npm install --legacy-peer-deps

# COPY ./ ./
# RUN npm run build

# # 3000번 포트 노출
# EXPOSE 5173

# # npm start 스크립트 실행
# CMD ["npm", "run", "dev"]

# FROM node:18.19.0

# WORKDIR /app

# COPY package.json /app

# RUN npm install
# COPY . /app

# EXPOSE 5173
# RUN npm run build

# CMD ["npm","run", "preview"]
FROM node:alpine as builder
WORKDIR /frontend
COPY package.json .
# RUN npm install
COPY ./ ./
RUN npm run build

# 3000번 포트 노출
EXPOSE 5173

# npm start 스크립트 실행
CMD ["npm", "run", "dev"]:
