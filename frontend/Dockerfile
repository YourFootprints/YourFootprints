FROM node:20.1.0
WORKDIR /frontend
COPY package.json .
RUN npm install --legacy-peer-deps

COPY ./ ./
RUN npm run build

# 3000번 포트 노출
EXPOSE 5173

# npm start 스크립트 실행
CMD ["npm", "run", "dev"]
