# tc-works

tc-worksは、Trimble Connect Workspace APIを利用したWebアプリケーションです。  
ユーザー認証、ユーザー情報・プロジェクト情報の取得、3Dモデルビューアの表示など、Trimble Connectの機能をブラウザ上で操作できます。

## 主な機能
- Trimble Connectアカウントによる認証
- ユーザー情報・プロジェクト情報の取得
- 3Dモデルビューアの埋め込み表示
- APIレスポンスの遅延処理・エラー処理

## 開発・実行方法
- `npm run build` で本番用ビルド
- `npm run server` でサーバーサイドの開発用ビルド
- `npm start` でExpressサーバー起動（`public/server.js`）

## ディレクトリ構成
- `src/` … アプリケーションのソースコード
- `public/` … ビルド後の公開ディレクトリ
- `webpack.config.js` … クライアント用Webpack設定
- `webpack.server.config.js` … サーバー用Webpack設定

## 必要な環境変数
`.env` ファイルにTrimble Connect API用の各種キー・URLを設定してください。
