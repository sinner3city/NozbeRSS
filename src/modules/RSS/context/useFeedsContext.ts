import { createContext, useContext } from "react"
import { FeedsContextType } from "../RSS.types"

export const FeedsContext = createContext<FeedsContextType | null>(null)

export function useFeedsContext() {
    const context = useContext(FeedsContext)
    if (!context) {
        throw new Error("useFeedsContext must be used within a FeedsProvider")
    }
    return context
}
