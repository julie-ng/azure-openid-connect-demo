FROM node:12-alpine

LABEL maintainer="Julie Ng <me@hello.io>"

RUN apk add --no-cache --virtual .gyp python make g++

WORKDIR /workspace

# cache dependencies as layer
COPY ["package.json", "package-lock.json", "./"]
RUN npm install --production

COPY ["app/", "/workspace/app/"]

EXPOSE ${PORT:-80}
CMD ["npm", "start"]
