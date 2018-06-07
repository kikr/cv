FROM nginx

EXPOSE 80

RUN apt-get update && \
    apt-get install nano

COPY ./dist/cv /usr/share/nginx/html