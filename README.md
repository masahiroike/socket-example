# socket example

typescript で ddd で node.js の socket サーバー
チャットをサンプルとして実装しています。

## socket server 初期化

1. module のインストール

```
yarn install
```

2. 環境ファイルの準備

```
cp ormconfig.json.example ormconfig.json
```

3. mysql コンテナーの起動

```
docker-compose up -d
```

4. テーブルの初期化

データベースの起動と初期化が完了してから実行してください。
前のステップのデータベース起動には少し時間がかかります。

```
yarn migration
```

5. socket サーバーの起動

prod 及び test モードで起動した場合、ユースケースのインジェクトが切り替わり、実際に database を参照します。
開発時は、 `yarn start` で起動すると dev モードで起動されるため、database を参照しません。常にコード中のリソースで開発が可能です。
本番では `yarn start:prod` を使用して起動します。prod で起動することで、proxy を噛ませて起動されます。proxy については下記を参照。

```
yarn start:test
```

## 実際に socket に接続してチャットを送受信する

サンプルで react の簡易的なコードを同梱しています
ディレクトリを移動して初期化することで、すぐにアクセスして socket を試すことができます。

1. ディレクトリを移動

```
cd frontend-example
```

2. 初期化する

```
yarn install
```

3. 起動する

```
yarn start
```

4. ブラウザでアクセス

http://localhost:3000/

## 開発する際に使用するコマンド

model(src/Models)を変更した際は、マイグレーションを作成してください。
マイグレーションの SQL は自動的に生成されます。
※生成された SQL は alter などが含まれますが、alter などは過去の変更も含めすべてが SQL として出力されるので、選別が必要です。

```
yarn migration:generate add-hogehoge # add-hogehogeはファイル名となります。
```

マイグレーションを戻したいときは、revert を使用できます。

```
yarn migration:revert
```

ソースコードを編集した際は `yarn restart` を行ってください。

## proxy について

proxy は 443 にリッスンするよう設定されています。
また初期で letsencrypt の証明書を参照するよう設定されています。
この設定は変更可能で src/Servers/Proxy.ts で行えます。
letsencrypt の証明書のまま継続する際は、proxy.config.js の DOMAIN を実際の値に書き換えてください。
※letsencrypt の設定は各自で行ってください。
