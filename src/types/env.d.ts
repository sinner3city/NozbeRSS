/// <reference types="vite/client" />
declare const __APP_ENV__: string
declare global {
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R
            toHaveTextContent(text: string | RegExp): R
        }
    }
}
