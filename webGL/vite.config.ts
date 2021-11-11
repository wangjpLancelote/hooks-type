import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import legacy from "@vitejs/plugin-legacy";
// import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  base: "./",

  plugins: [react(), legacy()],
  resolve: {
    alias: {
      "@": "/src",
      "@components": "/src/components",
      "@utils": "src/utils"
    }
  },
  build: {
    outDir: "dist",
    assetsInlineLimit: 4096, // 4KB base64地址大小
    cssCodeSplit: true, // css 文件拆分 否则会打包到一个css文件中
    sourcemap: false //是否生成sourcemap
  }
});
