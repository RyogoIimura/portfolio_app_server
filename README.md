# [テントサウナ予約アプリ(バックエンド)](https://github.com/RyogoIimura/portfolio_app_server)

# アプリURL
https://main.d2tjhkbxg73sem.amplifyapp.com/lp

# アプリの概要
将来テントサウナを購入し、貸し出しをするためのアプリを作成しました。

実際に使用することを想定して、雰囲気を伝えるLP、予約ページ、予約完了ページ、予約確認と個人情報編集ページ、管理者ページを作成予定でしたが、現状ログイン機能と管理者ページのみ完了している状態です。

# 特徴
使いやすくシンプルなUIを意識しました。Google 認証でログインしたらすぐに予約ができ、ボタンの構成などもシンプルにしました。

# 使用しているデータベース
sqlite

# 必要なライブラリ
- prisma/client 5.17.0
- express 4.19.2
- prisma 5.17.0
- ts-node 10.9.2"
- next-auth/prisma-adapter 1.0.7
- types/cors 2.8.17
- types/express 4.17.21
- types/node 20.14.12
- cors 2.8.5
- next-auth 4.24.8
- nodemon 3.1.4
- react 18.3.1
- typescript 5.5.4

# フロントエンドのプログラム
https://github.com/RyogoIimura/portfolio_app_client

# 実行方法
  初期化
  ```bash
  $ npm init -y
  $ npm i -D express prisma ts-node
  $ npm i -D @prisma/client
  $ npm i cors nodemon typescript @types/cors @types/express @types/node
  ```

  Prisma
  ```bash
  $ npx prisma init --datasource-provider sqlite
  model 作成
  model から SQL 文を自動追加
    $ npx prisma migrate dev --name init
  GUI 上でデータを手動で操作する
    $ npx prisma studio
  ```

```bash
git clone https://github.com/RyogoIimura/portfolio_app_server.git
cd portfolio_app_server
npm i
npm run dev
```

# 今後実装したいもの
自前のログイン機能

# 著者
* IIMURA1006
* iimuraryo53@gmail.com

# ライセンス
MIT
@ 2024 IIMURA1006
