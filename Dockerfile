FROM harbor.k8s.elab.rs/docker-hub/library/node:18-alpine3.16
WORKDIR /app

RUN npm install -g @angular/cli@15.0.2


COPY package.json .
COPY package-lock.json .

#RUN npm ci
RUN npm install


COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
