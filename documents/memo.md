
//- server
## 初期化
  $ npm init -y
  $ npm i -D express prisma ts-node
  $ npm i -D @prisma/client
  $ npm i cors nodemon typescript @types/cors @types/express @types/node

## Prisma
  $ npx prisma init --datasource-provider sqlite
  model 作成
  model から SQL 文を自動追加
    $ npx prisma migrate dev --name init
  GUI 上でデータを手動で操作する
    $ npx prisma studio