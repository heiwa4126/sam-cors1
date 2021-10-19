# sam-cors1

CORS(Cross-Origin Resource Sharing)のテスト環境をAWS SAMで展開する。

# いるもの

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
