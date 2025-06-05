import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('@dimforge/rapier3d-compat')) {
            return 'rapier3d-compat'; // chunk riêng cho thư viện rapier
          }
          if (id.includes('three')) {
            return 'three';
          }
          // tách các libs lớn khác nếu cần
        }
      }
    },
    chunkSizeWarningLimit: 3000, // nâng giới hạn nếu bạn muốn (kB)
  },
})
