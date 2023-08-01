import { defineConfig } from 'vite'
import { fileURLToPath } from 'url'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                frontend: fileURLToPath(new URL('', import.meta.url))
            },
        },
    },
})