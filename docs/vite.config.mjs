import { defineConfig } from 'vite'
import { resolve, join } from 'path';
import { execSync } from 'child_process';
import tailwindcss from '@tailwindcss/vite'

const INPUT_DIR = resolve(__dirname, 'static');
const OUTPUT_DIR = resolve(__dirname, 'staticfiles');

export default defineConfig((mode) => {

    return {
        resolve: {
            alias: {
                '@': INPUT_DIR
            },
        },
        base: '/static/',
        root: INPUT_DIR,
        build: {
            manifest: true,
            emptyOutDir: true,
            outDir: OUTPUT_DIR,
            rollupOptions: {
                input: {
                    main: resolve(INPUT_DIR, 'js/main.js'),
                },
            },
        },
        plugins: [
            tailwindcss(),
            {
                name: 'build-docs',
                buildStart() {
                    console.log('Building docs...');
                    execSync('node scripts/build-docs.mjs', { stdio: 'inherit' });
                },
            },

        ],
        server: {
            port: 5173,
            origin: 'http://localhost:5173',
        }
    };
  });