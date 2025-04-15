import React from "react"

interface AppErrorBoundaryProps {
    children: React.ReactNode
}

interface AppErrorBoundaryState {
    hasError: boolean
    error?: Error
    errorInfo?: React.ErrorInfo
}

export class AppErrorBoundary extends React.Component<
    AppErrorBoundaryProps,
    AppErrorBoundaryState
> {
    constructor(props: AppErrorBoundaryProps) {
        super(props)
        this.state = {
            hasError: false,
            error: undefined,
            errorInfo: undefined
        }
    }

    static getDerivedStateFromError(error: Error): Partial<AppErrorBoundaryState> {
        console.error(error, "ErrorBoundery")
        return { hasError: true }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("ErrorBoundary:", error, errorInfo)
        this.setState({ error, errorInfo })
    }

    private handleReset = () => {
        this.setState({
            hasError: false,
            error: undefined,
            errorInfo: undefined
        })
    }

    render() {
        const { hasError, error } = this.state

        if (hasError) {
            return (
                <div
                    style={{
                        padding: "1rem",
                        border: "1px solid red",
                        margin: "1rem 0",
                        marginTop: "5rem"
                    }}
                >
                    <h2>Something went wrong.</h2>
                    {error && <p>{error.message}</p>}
                    <button onClick={this.handleReset}>Try again</button>
                </div>
            )
        }

        return this.props.children
    }
}
