
FROM node:12.18.2-alpine3.9

WORKDIR /web
# 将package.json 复制到 Docker 环境
COPY package.json  /web/

# 安装依赖
RUN  yarn config set registry https://registry.npm.taobao.org \
     &&yarn install

# 将代码复制到Docker容器中的Web目录 
COPY . /web/

# 暴露容器内部访问端口，根据项目变动
# EXPOSE 3001

## 如果是Vue CLi，则换成 yarn serve
CMD ["yarn", "dev"]
