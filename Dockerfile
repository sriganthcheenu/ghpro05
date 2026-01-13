FROM node:16

ENV MONGODB_CONNECTION_PROTOCOL mongodb+srv
ENV MONGODB_DB_NAME gha-demo1
ENV MONGODB_CLUSTER_ADDRESS ghcluster.fwkrnme.mongodb.net
ENV MONGODB_USERNAME sriganthsrinivasan_db_user
ENV MONGODB_PASSWORD GPU2LwMT7wETvbU3

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]