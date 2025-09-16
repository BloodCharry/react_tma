import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';
export default defineConfig({
  plugins: [
      react(),
    svgr({
      // Обработка всех .svg, даже если они не в JSX
      svgrOptions: {
        icon: true,
        typescript: true,
        expandProps: 'start',
      },
      // Обрабатывать только определённые пути (по умолчанию — все)
      include: [/\.svg$/],
    }),
  ],
  server: { port: 5173 }
})
