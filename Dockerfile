# Initiate a container to build the application in.
FROM node:14
# ENV NODE_ENV=build
WORKDIR /usr/src/app

# Copy the package.json into the container. ......... 
# COPY package.json ./
# COPY package-lock.json ./


# RUN apk --no-cache add yarn

# Install the dependencies required to build the application.
# RUN yarn install

# Copy the application source into the container.
COPY . .
RUN rm -rf node_modules && \
    npm install  && \
    npm run build

# RUN npm install 
# Build the application.
# RUN npm run build

# Uninstall the dependencies not required to run the built application.


# Initiate a new container to run the application in.
# FROM node:16-alpine
# ENV NODE_ENV=production


# Copy everything required to run the built application into the new container.
# COPY --from=builder /usr/src/app/package*.json ./
# COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
# COPY --from=builder /usr/src/app/dist/ ./dist/

# Run the application.
CMD ["node", "dist/main"]
# CMD ["sleep" ,"1000"]