import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [
        tailwindcss(),
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: "0.0.0.0", // Mengizinkan akses dari luar container
        port: 5173,
        strictPort: true,
        hmr: {
            host: "localhost", // Mengarahkan HMR browser ke host machine
            port: 5173,
        },
        watch: {
            usePolling: true,
            interval: 1000,
            ignored: [
                "**/node_modules/**",
                "**/vendor/**",
                "**/storage/**",
                "**/public/**",
                "**/.git/**",
            ],
        },
    },
});
