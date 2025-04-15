import { createContext, useContext } from "react"
import { RSSContextType } from "@/modules/RSS/RSS.types"

export const RSSContext = createContext<RSSContextType | null>(null)

export function useRSSContext() {
    const context = useContext(RSSContext)
    if (!context) {
        throw new Error("useRSSContext must be used within a RSSProvider")
    }
    return context
}
