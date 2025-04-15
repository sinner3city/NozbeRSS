import React, { useContext, useState } from "react"
import { AppContext, AppContextProps, AppSettings, AppUser } from "@/contexts/AppContext"


export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [settings, setSettings] = useState<AppSettings>({
        theme: "light"
    })
    const [user, setUser] = useState<AppUser | null>(null)
    const [data, setData] = useState<Record<string, unknown>[]>([])


    const contextValue: AppContextProps = {
        settings,
        user: user || { id: 0, name: "", lastname: "", isAdmin: false },
        data,
    }

    return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

// Custom hook to use the context
export const useAppContext = () => {
    const context = useContext(AppContext)
    if (context === null) {
        throw new Error("useAppContext must be used within an AppProvider")
    }
    return context
}
