import { Suspense, lazy } from "react"
import { StrictMode } from "react"
import { StyleProvider } from "@ant-design/cssinjs"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { MainLayout } from "@layouts"
import { Loader } from "@components"
import { AppProvider } from "./AppProvider"
import "antd/dist/reset.css"
import "@/theme/global.css"

const NozbeRSS = lazy(() => import("@/pages/NozbeRSS.tsx"))

export function App() {
    return (
        <StrictMode>
            {/* <AppProvider> */}
            <StyleProvider hashPriority="high">
                <Router>
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route element={<MainLayout />}>
                                <Route path="/" element={<NozbeRSS />} />
                            </Route>
                        </Routes>
                    </Suspense>
                </Router>
            </StyleProvider>
            {/* </AppProvider> */}
        </StrictMode>
    )
}
