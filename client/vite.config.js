import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// we normally use this one, but we won't be able to here:
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: process.env.VITE_SERVER_BASE_URL,
//         changeOrigin: true,
//       }
//     },
//   },
// });

// this code will look confusing until you see it carefully:
export default ({ mode }) => {

	// adding current path in process.env variable of nodejs:
	process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };   // third argument works for the given prefix

	const config = {
		plugins: [react()],
		server: {
			proxy: {
				'/api': {
					target: process.env.VITE_SERVER_BASE_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ''),   // replace the string `/api` after this
				},
			},
		},
	};

	return defineConfig(config);
};


// Work on the `vite proxy config for react` problem.

// CONTINUE PROJECT VIDEO FROM: 2:32:30