import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    server: {
        hmr: {
            host: '0.0.0.0',
            protocol: 'wss', // Importante para que no bloquee el websocket
            hmr: {
                host: 'localhost',
            },
        },
        host: '0.0.0.0',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    server: {
        host: '0.0.0.0',
        watch: {
            usePolling: true,
        },
        hmr: {
            host: 'localhost',
        },
    },
});
