FROM nginx:alpine

ENV DOCKERIZE_VERSION v0.7.0

RUN apk update --no-cache \
    && apk add --no-cache wget openssl \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apk del wget

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["dockerize", "-wait", "tcp://node-app:3000", "-timeout", "60s", "nginx", "-g", "daemon off;"]
