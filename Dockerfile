FROM nginx:1.15.0-alpine

# Use ng build command to build the source dir before reaching this point
COPY ./dist/cv /usr/share/nginx/html

EXPOSE 80