FROM nginx

RUN apt-get update && \
    apt-get install nano

COPY ./dist/cv /usr/share/nginx/html

EXPOSE 80