# Vite React Sample

shadcn/uiを使ったVite + React + TypeScriptのサンプルプロジェクト
Tailwindをリント、フォーマットするためESLint + Prettier + Stylelintを導入

名前付きルートをいい感じにできないか試している途中

## 構成
- Vite
- React
- TypeScript
- Tailwind CSS(shadcn/ui)
- React Router
- React Hook Form
- TanStack Query
- T3 Env
- ESLint
- Prettier
- Stylelint
- Vitest

## セットアップ
```bash
cp .env.local.example .env.local
```

```bash
yarn install
```

## メモ
### テスト関連
いろいろパッケージが入ってるけど使わないなら削除してもよき  
テストを書くにしても複雑な関数や外部パッケージを利用していて詳細把握が難しいモノくらいでいいかと  
