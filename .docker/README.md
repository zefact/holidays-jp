# Node.js を Docker で利用する場合

## コンテナ作成

```shell
# .dockerディレクトリに移動
cd .docker

# ビルド&起動
docker compose up -d
```

## ビルド

作成したコンテナにアタッチし、以下コマンドを実行

```shell
# ディレクトリ移動
cd /app

# モジュールインストール（初回のみ）
npm install

# ビルド
npm run build
```
