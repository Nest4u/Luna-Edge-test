import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@features': path.resolve(__dirname, './src/features'),
			'@widgets': path.resolve(__dirname, './src/widgets'),
			'@shared': path.resolve(__dirname, './src/shared'),
			'@app': path.resolve(__dirname, './src/app'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@entities': path.resolve(__dirname, './src/entities')
		}
	}
})
