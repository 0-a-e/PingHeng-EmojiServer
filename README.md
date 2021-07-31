# PingHeng-emojiServer（開発中止）

~~[PingHeng](https://github.com/0-a-e/Pingheng)用絵文字サーバーです~~(アプリで絵文字が取得できたので開発中止)。

取得した絵文字のリストにインデックスと画像データ(base64)を加えて返します。

Mtoken.jsを作成して使用:

```
const Mtoken = "admin権限があるアカウントのキー";
exports.Mtoken = Mtoken;
```

サーバーごとにしか取得できないので注意してください.
