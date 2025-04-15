import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd())
    const appEnv = env.VITE_APP_ENV

    return {
        plugins: [react()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
                "@components": path.resolve(__dirname, "src/components/index.ts"),
                "@modules": path.resolve(__dirname, "src/modules/index.ts"),
                "@pages": path.resolve(__dirname, "src/pages/index.ts"),
                "@types": path.resolve(__dirname, "src/types/index.ts"),
                "@contexts": path.resolve(__dirname, "src/contexts/index.ts"),
                "@utils": path.resolve(__dirname, "src/utils/index.ts"),
                "@hooks": path.resolve(__dirname, "src/hooks/index.ts"),
                "@layouts": path.resolve(__dirname, "src/layouts/index.ts"),
                "@data": path.resolve(__dirname, "src/data"),
                "@configs": path.resolve(__dirname, "src/configs"),
                "@css": path.resolve(__dirname, "src/css"),
                "@assets": path.resolve(__dirname, "src/assets"),
                "@theme": path.resolve(__dirname, "src/theme/index.ts"),
                "@public": path.resolve(__dirname, "public")
            }
        },
        server: {
            port: 3000,
            strictPort: true,
            host: true
        },
        build: {
            outDir: "dist",
            sourcemap: true,
            rollupOptions: {
                output: {
                    manualChunks: {
                        vendor: ["react", "react-dom", "react-router-dom"],
                        antd: ["antd", "@ant-design/icons"]
                    }
                }
            }
        },
        optimizeDeps: {
            include: ["react", "react-dom", "react-router-dom", "antd", "@ant-design/icons"]
        },
        define: {
            __APP_ENV__: JSON.stringify(appEnv)
        }
    }
})
