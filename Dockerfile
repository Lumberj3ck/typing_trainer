FROM node

WORKDIR /app

COPY package.json /app/package.json 

RUN npm install 
# EXPOSE 5173
COPY . /app

RUN npm run build