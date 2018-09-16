FROM node:carbon

# Create app directory
WORKDIR /var/app

WORKDIR /tmp
COPY package.json /tmp/
RUN npm install
WORKDIR /var/app
COPY . /var/app/
RUN cp -a /tmp/node_modules /var/app/

RUN npm install -g nodemon

EXPOSE 4000
CMD [ "npm", "start" ]
