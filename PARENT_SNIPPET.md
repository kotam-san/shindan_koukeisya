# 親ページ（Squarespace）側に貼るスニペット

診断完了を GA4 のイベントとして計測するための、**受け取り側**のコード。

## 背景

診断アプリは `shindan-koukeisya.pages.dev` の iframe として `1planet.jp/koukeishasindan` に埋め込まれている。GA4 タグは親ページにしか無いため、**iframe 内の診断完了は原理的に計測できない**（2026-08-13 に判明。`form_start` は3回発火していたが `form_submit` は0回だった）。

そこで iframe 側（`src/components/ResultScreen.jsx`）から `postMessage` で完了を親へ通知し、**親ページで GA4 イベントを送る**。親の GA4 タグが持っている流入元・セッション情報にそのまま紐づくので、「**どの記事から来た人が診断を完了したか**」が分かる。

送るのは**スコアと判定ラベルだけ**。氏名・メールアドレスは送らない（GA4 に個人情報を入れない）。

## 貼り付け先

Squarespace 管理画面 → 該当ページ（`/koukeishasindan`）の **ページ設定 → 詳細設定 → ページヘッダーコードインジェクション**

サイト全体のコードインジェクションでも動くが、このページ専用にした方が影響範囲が小さい。

## コード

```html
<script>
(function () {
  var ALLOWED_ORIGIN = 'https://shindan-koukeisya.pages.dev';

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }

  window.addEventListener('message', function (e) {
    // 別サイトから偽のイベントを撃ち込まれないよう、送信元を必ず検証する
    if (e.origin !== ALLOWED_ORIGIN) return;

    var d = e.data || {};
    if (d.type !== 'shindan_complete') return;

    // GTM 経由で使いたい場合に拾えるよう、カスタムイベントも push しておく
    window.dataLayer.push({
      event: 'shindan_complete',
      shindan_score: d.score,
      shindan_tier: d.tier
    });

    // gtag.js へ直接送信（GTM 側の設定が無くても GA4 に届く）
    gtag('event', 'shindan_complete', {
      shindan_score: d.score,
      shindan_tier: d.tier
    });
  });
})();
</script>
```

## 貼った後にやること

1. **動作確認**：GA4 の 管理 → DebugView を開いた状態で、実際に診断を1回完了させる。`shindan_complete` が流れてくれば成功（テスト登録のメールが1通届くが、それは松本さん自身のもの）
2. **キーイベント化**：GA4 の 管理 → イベント で `shindan_complete` の行にある「キーイベントとしてマークを付ける」をオンにする
   - イベントが1度も届いていないと一覧に出ない。その場合は「キーイベント」画面から `shindan_complete` を手動で新規作成してもよい
3. 以降 `/seo-report` のレポートに、診断完了とその流入元が出るようになる

## 関連

- 送信側の実装：`src/components/ResultScreen.jsx`（`handleSubmit` 内、`setEmailSent(true)` の直後）
- GA4 測定 ID：`G-2SP9N1R7PH` ／ GTM：`GTM-59F2HJ8K`
- 判断の記録：ONEPLANETManagement リポジトリ `knowledge/40_evergreen/decisions/2026-08-13_GA4アクセス取得をAPI経由に統一.md`
