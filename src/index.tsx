import { createRoot } from "react-dom/client"
import { App } from "./app/App"

console.log("🍄CURRENT ENVIRONMENT:", __APP_ENV__)
console.log("=========================================================")

createRoot(document.getElementById("root")!).render(<App />)
