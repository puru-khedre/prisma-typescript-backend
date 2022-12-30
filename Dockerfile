FROM node:18-alpine
WORKDIR /app
COPY . /app
RUN yarn
EXPOSE 3000
RUN yarn build
CMD [ "yarn", "start" ]
