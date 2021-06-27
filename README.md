# PingHeng-emojiServer

[PingHeng](https://github.com/0-a-e/Pingheng)用の絵文字と認証サーバーです。

取得した絵文字のリストにインデックスと画像データ(base64)を加えて返します。

Mtoken.jsを作成して使用:

```
const Mtoken = "admin権限があるアカウントのキー";
exports.Mtoken = Mtoken;
```

サーバーごとにしか取得できないので注意してください.
