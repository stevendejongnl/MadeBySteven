FROM nginx:slim

COPY public /usr/share/nginx/html

EXPOSE 80