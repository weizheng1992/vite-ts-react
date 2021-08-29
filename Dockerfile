

FROM node:14-alpine AS BUILD_IMAGE
WORKDIR /app
COPY package*.json ./
# 安装依赖
RUN  yarn config set registry https://registry.npm.taobao.org \
     &&yarn install
COPY . .
RUN yarn build




FROM nginx:stable-alpine as production-stage

LABEL name = "react-front"
LABEL version = "1.0"

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY /app/react-front.conf /etc/nginx/conf.d/

# WORKDIR /app

# 安装依赖
# RUN  yarn config set registry https://registry.npm.taobao.org \
#      &&yarn install


# 暴露容器内部访问端口，根据项目变动
EXPOSE 80

## 如果是Vue CLi，则换成 yarn serve
# CMD ["yarn", "dev"]
CMD ["nginx", "-g", "daemon off;"]

