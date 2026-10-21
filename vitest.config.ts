import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'

const viteConfigPath = fileURLToPath(new URL('vite.config.ts', import.meta.url))
const { default: viteConfig } = await import(viteConfigPath)

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'jsdom',
            exclude: [...configDefaults.exclude, 'e2e/**'],
            root: fileURLToPath(new URL('./', import.meta.url)),
        },
    }),
)
