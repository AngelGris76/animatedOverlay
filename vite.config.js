import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [preact()],
	build: {
		minify: true,
		lib: {
			entry: resolve(__dirname, './src/main.js'),
			formats: ['es'],
			name: 'Minimalistic animated overlay',
		},
		rollupOptions: {
			external: ['preact', 'preact/hooks', '@preact/sginals'],
			output: {
				globals: {
					preact: 'preact',
					'preact/hooks': 'preact/hooks',
					'@preact/signals': '@preact/signals',
				},
			},
		},
	},
});
