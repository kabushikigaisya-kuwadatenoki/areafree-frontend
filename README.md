## 技術

- Next.js14
- CSS ライブラリ
  - Mantine（便利）
    - [公式ページ](https://ui.mantine.dev/#main)の左下にある「MANTINE FORM, MANTINE CORE が大事なとこ。全部一回見た方がいい（30 分もあれば）。」
- Linter & formatter
  - Biome（早い）
    - [フォーマッターとリンターを兼ね備えた「Biome」を触ってみる](https://zenn.dev/ako/articles/b8a686843f6b83)
    - [Biome はじめました。](https://zenn.dev/voluntas/scraps/31de0e6155b43e)

## 環境セットアップ

### 立ち上げ

```
# 依存関係インストール
yarn
# ローカル立ち上げ
yarn dev
```

拡張機能：`biome` が必要なので、インストールして有効にしてください。

### 必要な環境変数（各案件で設定する）

例）
| 変数名 | 役割 | DEV 環境での値 |
| ------------------------ | ------------------------------ | --------------------- |
| NEXT_PUBLIC_FRONTEND_ENDPOINT | フロントエンドのエンドポイント | http://localhost:8000 |
| NEXT_PUBLIC_BACKEND_ENDPOINT | バックエンドのエンドポイント | http://localhost:3000 |
| NEXTAUTH_SECRET | NextAuth.js のシークレット | hogehoge |

### コマンド一覧

```
yarn lint  # biomeのリンター
yarn format  # biomeのフォーマッター
```

その他コマンドは、[package.json](/package.json)みてください。

### CI について

- [/.github/workflows/ci.yml](.github/workflows/ci.yml)で、プルリク時に CI 走るようにしています。
- テスト実装した場合は、ここにテストコマンドを追加する。
- CD は、とりあえず vercel がいい感じにしてくれるので任せる。

### メタ情報、ファビコンは忘れがちなので、最初に設定しておく

[app/layout.tsx](app/layout.tsx)で設定。

## ルール

### コード規約

- コンポーネントについて
  - Props で export しないものは、名前に意味がないので、`type Props`でいいと思う
  - エクスポートは、`export default`ではなく、`export`を利用する
- 型(type)の import と export について
  - 型と明示するために、`import type hoge`と`export type hoge`を使う
- Page.txt と Layout.tsx の export について、
  - 名前にあまり意味がないので、統一しておく。
  - `export default function Layout({ children }: { children: React.ReactNode }) `
  - `export default function Page()`
- クライアントコンポーネントとサーバーコンポーネントについて
  - できるだけ `CSC` ではなく `RSC` で頑張ってみる。（無理に深追いはしない）
  - サーバー側にした方がいいと思ってる部分
    - `Page.tsx`
      - データフェッチはここでする。
      - データの利用は、コンポーネント分ける
    - 認証ガードをかける部分
    - リダイレクト処理をする部分

### ディレクトリ構成

・\_components というディレクトリを切って、いい感じにファイルを管理する。
・ディレクト名とファイル名は、ケバブケース（小文字ハイフン）で統一する。
・コンポーネントは、パスカルケースにする。

[参照、これがいい感じな気がする](https://scrapbox.io/wwwy-dev/Next.js_13%E3%81%AE_%E3%83%87%E3%82%A3%E3%83%AC%E3%82%AF%E3%83%88%E3%83%AA%E6%A7%8B%E6%88%90)

大まかな構成は下記のような感じです。

```
.
├── app
│   ├── _components  # 全てに共通の「コンポーネント」 atom, moduleの粒度感
│   │   ├── ui # atom, moduleレベルのコンポーネント
│   │   └── layout # headerやfooterなど？
│   ├── _funcitons  # 全てに共通の「関数」
│   ├── _hooks  # 全てに共通の「hooks」
│   ├── _libs  # 全てに共通の「ライブラリに依存する関数」
│   ├── (authenticated)  # 認証後のページのディレクトリ
│   │   ├── _components # 認証後の共通コンポーネント
│   │   ├── products # 商品ページ
│   │   │   ├── _components # 商品ページの共通コンポーネント
│   │   │   ├── (root) # /商品ページ一覧のディレクトリ
│   │   │   │   ├── _components # 商品ページ一覧ページのコンポーネント
│   │   │   │   ├── layout.tsx # 商品ページ一覧ページのレイアウト、メタ情報
│   │   │   │   ├── page.tsx # 商品ページ一覧ページのデータフェッチ、コンポーネント配置
│   │   │   ├── [id] # 特定の商品ページに関するディレクトリ
│   │   │   │   ├── _components # 特定の商品ページの共通コンポーネント
│   │   │   │   ├── (root) # 特定の商品ページのディレクトリ
│   │   │   │   ├── history # 特定の商品の履歴ページのディレクトリ
│   │   │   │   └── layout.tsx # 特定の商品ページの共通レイアウト
│   │   │   └── layout.tsx # 商品ページの共通レイアウト
│   │   ├── hoghego # hogehegoページ用のディレクトリ
│   │   ├── fafafa # fafafaページ用のディレクトリ
│   │   └── layout.tsx # 認証後の共通レイアウト ここで非ログイン者のリダイレクトとかも書けばいいはず
│   ├── (unauthenticated)  # 認証前のページ
│   │   ├── _components # 認証前の共通コンポーネント
│   │   ├── login # 認証前の共通コンポーネント
│   │   └── layout.tsx # 認証前の共通レイアウト ここでログイン者のリダイレクトとかも書けばいいはず
│   ├── api  # Api Route (各ディレクトリ以下にそれぞれ配置してもいいかも)
│   ├── layout.tsx  # 前ページ共通のレイアウト
│   ├── not-found.tsx
│   └── page.tsx  # 認証前後で、リダイレクトを設定している。
```

【補足】

- テストファイル、Storybook を作成する場合は、`components/<component name>/{index, stories, test}.tsx を同一階層に置く`方がいい。
- `app/_components/ui`にファイルがいっぱいになったら、`app/_components/ui/index.ts`を作成して、import と export するだけのファイル作れば、`import`が 1 行で記述できるので開発楽になる。

## Mantine の全体設定について

- [theme.ts](/theme.ts)に書いています。案件ごとのテーマカラーは多分設定した方がいいです。[mantine colors](https://mantine.dev/colors-generator/)でいい感じに設定できるはず。
- [Example ページ](http://localhost:8000/example)は、案件対応時には消してください。大体こんな感じかな〜っていうので作ってみました（自分が実験したかっただけかも、実験したい時は使ってね）。

## テストについて

構想です。意見ください。

### 静的解析

Biome で十分と思います。biome.js にもっといいルールを追加できる人は、募集中です。
Prettier と ESLint 派閥の方は、ケンカしましょう。（重すぎて my macbook が叫びます。）

### 単体テストと結合テスト

`Storybook` による `UI` の単体テストと結合テスト、`Jest` によるビジネスロジックや関数の単体テストを実装するのがいいと思っています。多分これで十分なはず。ロジックの結合テストしたい場合は、`React-testing` 入れることになるはず。
コンポーネントは、`Mantine` 使ってれえ、`UI` の単体テストみたいなんはほぼ不要になるかと。

### E2E テスト

toB 向けのアプリの場合は、コスト（工数 + 費用）かかるので、もう目視と動作確認でいいと思っています。
SLA 高そうなアプリケーションの場合は、Storybook のビジュアルリグレッションテストとか、Playwright を実装しても良いかなって感じです。

何ゆうてんだ？って人は、
[フロントエンドのテスト手法](https://codezine.jp/article/detail/17672)みてください。

## 最後に

いろいろ書きましたが、この通りにしなくても全然 OK です。 三浦商店さん実装する前に自分用でまとめたやつを布教したかっただけです。
Storybook を標準で入れるべきか迷ってる日々を過ごしています。
Remix とか言うやつが、Next.js の裏でバーリ勢いがあって怖いです。Next.js14 にユーザーを置いてけぼりにして、ユーザーがついていけてません。追いつける日が来ると信じて、これからの Next 信者で良いんでしょうか。
Hono ってなんですか、すごいんですかね。

あ、Mantine と Tailwind を共存させる設定をやってません。（ちょいむずそうだった）
Tailwind 共存バージョンを、別ブランチで作ってみようと思います。。
以上です。

## このテンプレートは、MANTINE のテンプレから作成してます。下記詳細

```
# Mantine Next Template

Get started with the template by clicking `Use this template` button on the top of the page.

[Documentation](https://mantine.dev/guides/next/)

```
