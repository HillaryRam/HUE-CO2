import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        tailwindcss(),
        react(),
    ],

    server: {
        host: '0.0.0.0', // Abre la puerta del contenedor hacia Windows
        port: 5173,
        strictPort: true,
        cors: true, // Permite que Ngrok tome los archivos de diseño
        hmr: {
            host: 'localhost', // Mantiene la recarga automática en el navegador
        },
        watch: {
            usePolling: true, // Súper necesario en Docker para detectar cuando guardas un archivo
        }
    },
});
