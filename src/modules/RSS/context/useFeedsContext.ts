import { createContext, useContext } from "react"
import { RSSContextType } from "@/modules/RSS/RSS.types"

export const FeedsContext = createContext<RSSContextType | null>(null)

export function useFeedsContext() {
    const context = useContext(FeedsContext)
    if (!context) {
        throw new Error("useFeedsContext must be used within a FeedsProvider")
    }
    return context
}
