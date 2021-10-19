# sam-cors1

CORS(Cross-Origin Resource Sharing)のテスト環境をAWS SAMで展開します。

デプロイがめんどうな人は

* [1.tmplate.js](1.tmplate.js)
* [hello/app.py](hello/app.py)

だけでも参考になると思います。

# 目次

- [sam-cors1](#sam-cors1)
- [目次](#目次)
- [デプロイに必要なもの](#デプロイに必要なもの)
- [デプロイ](#デプロイ)
- [テスト](#テスト)
  - [サンプルlambdaのメモ](#サンプルlambdaのメモ)
- [削除](#削除)
- [CROSメモ](#crosメモ)


# デプロイに必要なもの

* [AWS CLI](https://docs.aws.amazon.com/ja_jp/cli/latest/userguide/install-cliv2.html)
* [AWS SAM CLI](https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/serverless-sam-cli-install-linux.html)
* Python 3.8
* [jq](https://stedolan.github.io/jq/download/)
* [yq](https://github.com/kislyuk/yq)


# デプロイ

まずSAMなので

```sh
sam build
sam deploy --guided  # 最初の1回。2回目以降は `sam deploy`
```
で、サンプルのlambdaとサンプルのWWWコンテンツを置くS3を展開します。

`sam deploy --guided`では以下の2つを除いてデフォルトでOK。

* `Parameter BucketName` は S3のバケット名なので、独自の名前をつけてください。
* `HelloFunction may not have authorization defined, Is this okay? [y/N]:` は `y`で。

無事スタックがデプロイされたら、Outputの
`S3URL` と `S3SecureURL` の値をメモしてください
(忘れてもポータルのCloudFormationの該当スタックの出力から見れます)。

次に、

```sh
./update_1js.sh
```
で、`1.template.js` から `contents/js/1.js` を作成
(lambdaのURLを埋め込んでいます)。

最後に
```sh
./sync_contents.sh
```
でcontents/ 以下をS3に転送します。


# テスト

Outputの `S3URL` か `S3SecureURL` のURLに
ブラウザからアクセスしてみてください。

jQueryの$.ajaxを使って、かんたんなクロスドメインのテストが実行されます。

## サンプルlambdaのメモ

戻り値は以下のようなものです。

```json
{"message": "OK", "time": "2021-10-18 07:33:47.955417+00:00"}
```

* message - `OK`で固定
* time - 現在時刻をUTCで


# 削除

```sh
./delete_stack.sh
```
でスタックごと削除してください。


# CROSメモ

SAM(CFn)ではOPTIONSを作ってくれますが、
個々のlambdaでも
Access-Control-Allow-* 3つ
を返す必要があります。

Access-Control-Allow-Originは

* null
* `*`
* オリジン1つ

の、いずれかが指定できます。
**「スペースで区切ってオリジンを複数指定」**
は出来ません。

OPTIONSの返すAccess-Control-Allow-* と
GET,PUTの返すそれは同じである必要はありません。
(Preflightの場合AND条件になるみたい)
