import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/assets/*", // 복사할 파일 경로
          dest: "assets", // `dist/assets`로 복사
        },
      ],
    }),
  ],
  // base: "/portfolio",
  base: "/",
  server: {
    host: "0.0.0.0", // 모든 IP 주소에서 접근 가능하도록 설정
    port: 5173, // 기본 포트 (선택 사항)
  },
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@", replacement: "/src" },
    ],
  },
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg"], // 이미지 파일 포함
});
