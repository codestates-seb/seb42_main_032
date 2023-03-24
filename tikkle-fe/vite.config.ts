import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Import environment variables
  const VITE_CLIENT = process.env.VITE_CLIENT;
  const VITE_SERVER = process.env.VITE_SERVER;
  const VITE_GCLIENT_ID = process.env.VITE_GCLIENT_ID;

  // Vite configuration
  return {
    plugins: [reactRefresh(), react()],
    define: {
      'process.env.VITE_CLIENT': JSON.stringify(VITE_CLIENT),
      'process.env.VITE_SERVER': JSON.stringify(VITE_SERVER),
      'process.env.VITE_GCLIENT_ID': JSON.stringify(VITE_GCLIENT_ID),
    },
  };
});
