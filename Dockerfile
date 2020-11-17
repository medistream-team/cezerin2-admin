# build stage
FROM node:8 AS build
MAINTAINER cezerin-admin

ARG langauge=ko_KR
ENV LANGUAGE=$language
ARG apiBaseUrl=https://market-api.stg.medistream.co.kr/api/v1
ENV API_BASE_URL=$apiBaseUrl
ARG assetsBaseURL=https://warehouse.medistream.co.kr
ENV ASSETS_BASE_URL=$assetsBaseURL
ARG apiWebSocketUrl=wss://market-api.stg.medistream.co.kr
ENV API_WEB_SOCKET_URL=$apiWebSocketUrl

RUN mkdir -p /var/www/cezerin2-admin
COPY . /var/www/cezerin2-admin

WORKDIR /var/www/cezerin2-admine

RUN cd /var/www/cezerin2-admin \
        && npm install \
        && npm run build

# final stage
FROM nginx:stable-alpine
MAINTAINER cezerin-admin

COPY --from=build /var/www/cezerin2-admin/dist /usr/share/nginx/html

COPY --from=build /var/www/cezerin2-admin/nginx/nginx.conf /etc/nginx/
COPY --from=build /var/www/cezerin2-admin/nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

# start env build and Nginx
# CMD ["nginx"]