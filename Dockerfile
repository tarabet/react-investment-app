FROM node:alpine
WORKDIR '/app'

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx
EXPOSE 80

COPY --from=0 /app/build /usr/share/nginx/html
COPY --from=0 /app/cones.json /usr/share/nginx/html/api/cones.json
