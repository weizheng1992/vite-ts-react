## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://vitejs.dev/) - 熟悉 vite 特性
- [React](https://reactjs.bootcss.com/docs/hooks-intro.html) - 熟悉 React 基础语法
- [TypeScript](https://www.typescriptlang.org/) - 熟悉`TypeScript`基本语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [React-Router](https://github.com/ReactTraining/react-router/blob/dev/docs/api-reference.md) 熟悉 React-router 基本使用
- [Ant-Design](https://ant.design/components/overview-cn/) - ui 基本使用
- [Windicss](https://windicss.org/) - css 基本使用

## 预览

- [线上地址](http://8.142.136.225/) - 还在部署

## 安装使用

- 获取项目代码

```bash
git clone https://github.com/weizheng1992/vite-ts-react.git
```

- 安装依赖

```bash
cd vite-ts-react

yarn install

```

- 运行

```bash
yarn dev
```

- 打包

```bash
yarn build 正式线打包
yarn build:test 测试线打包
```

## Git 提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范 ([Angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular))

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

1. 创建自己的分支: `git checkout -b feat/xxxx`
2. 提交你的修改: `git commit -am 'feat(function): add xxxxx'`
3. 推送您的分支: `git push origin feat/xxxx`

## 浏览器支持

本地开发推荐使用`Chrome 80+` 浏览器

支持现代浏览器, 不支持 IE

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| :-: | :-: | :-: | :-: | :-: |
| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

## 目录结构

```
.
├── build #构建相关脚本
├── public #静态资源
├── src #项目代码
│   ├── api #请求相关
│   ├── assets #静态资源
│   ├── components #组件
│   ├── design #样式
│   ├── hooks #hooks
│   ├── layouts #布局
│   ├── main.tsx #入口文件
│   ├── pages #页面
│   ├── router #路由
│   └── utils #工具
└── types
```
