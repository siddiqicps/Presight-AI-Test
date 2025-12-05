    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';
    import tailwindcss from '@tailwindcss/vite';
    // import { reactRouter } from "@react-router/dev/vite";
    import path from 'path'; // Import the path module
    
    export default defineConfig({
      server: {
        port: 3001,
        host: true
      },      
      plugins: [react(), tailwindcss()],
      resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src/index.jsx"),
            },
        },
    });