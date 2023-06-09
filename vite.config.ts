// vite設定
//
// https://ja.vitejs.dev/config/
//

import { build, defineConfig } from 'vite';

export default defineConfig({
  build: {
    // 出力ディレクトリ
    outDir: 'dist',
    // ライブラリモード
    lib: {
      // inputファイル
      entry: 'src/holidays-jp.ts',
      // Global Name
      name: 'HolidaysJP',
      // フォーマット('es' | 'cjs' | 'umd' | 'iife')[]
      formats: ['es', 'cjs', 'iife'],
      // outputファイル名（拡張子は自動）
      fileName: 'holidays-jp.min',
    },
    // ソースマップ作成(boolean | 'inline' | 'hidden')
    sourcemap: true,
    // minify(boolean | 'esbuild' | 'terser')
    minify: true,
  },
});
