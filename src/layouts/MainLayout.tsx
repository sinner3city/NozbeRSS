import { Outlet } from "react-router-dom"
import { AppErrorBoundary } from "@/app/AppErrorBoundery"
import * as Styled from "./MainLayout.Styled"

function MainLayout() {
    return (
        <AppErrorBoundary>
            <Styled.Header>
                <Styled.Title>Nozbe RSS App</Styled.Title>
            </Styled.Header>
            <Styled.Layout>
                <Outlet />
            </Styled.Layout>
        </AppErrorBoundary>
    )
}

export default MainLayout
