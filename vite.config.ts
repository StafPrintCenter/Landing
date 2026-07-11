import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const apiUrl = env.VITE_API_BASE_URL;

  return {
    plugins: [
      tanstackStart({
        server: { entry: "server" },
      }),
      react(),
      tailwindcss(),
      nitro({
        preset: "netlify",
        devProxy: {
          "/api": {
            target: apiUrl,
            changeOrigin: true,
          },
        },
        routeRules: {
          "/api/**": { proxy: `${apiUrl}/**` },
        },
      }),
    ],
    resolve: {
      tsconfigPaths: true,
    },
  };
});
