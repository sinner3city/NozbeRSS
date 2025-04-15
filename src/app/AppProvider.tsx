import React, { createContext, useContext, useState, useEffect } from "react"
import { AppContext, AppContextProps, AppFeed, AppSettings, AppUser } from "@/contexts/AppContext"

// Define localStorage keys
const FEEDS_STORAGE_KEY = "nozbe_rss_feeds"
const SETTINGS_STORAGE_KEY = "nozbe_rss_settings"
const USER_STORAGE_KEY = "nozbe_rss_user"

// Create the provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Initialize state with empty values
    const [feeds, setFeeds] = useState<AppFeed[]>([])
    const [settings, setSettings] = useState<AppSettings>({
        theme: "light"
    })
    const [user, setUser] = useState<AppUser | null>(null)
    const [data, setData] = useState<Record<string, unknown>[]>([])

    // Load data from localStorage on initialization
    useEffect(() => {
        console.log("AppProvider: Initializing and loading data from localStorage")

        // Load feeds
        try {
            const storedFeeds = localStorage.getItem(FEEDS_STORAGE_KEY)
            console.log("AppProvider: Raw feeds from localStorage:", storedFeeds)

            if (storedFeeds) {
                const parsedFeeds = JSON.parse(storedFeeds)
                console.log("AppProvider: Parsed feeds:", parsedFeeds)

                if (Array.isArray(parsedFeeds)) {
                    console.log("AppProvider: Setting feeds from localStorage:", parsedFeeds)
                    setFeeds(parsedFeeds)
                } else {
                    console.warn("AppProvider: Stored feeds is not an array:", parsedFeeds)
                }
            } else {
                console.log("AppProvider: No feeds found in localStorage")
            }
        } catch (error) {
            console.error("AppProvider: Error loading feeds from localStorage:", error)
        }

        // Load settings
        try {
            const storedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY)
            if (storedSettings) {
                const parsedSettings = JSON.parse(storedSettings)
                if (parsedSettings && typeof parsedSettings === "object") {
                    setSettings(parsedSettings)
                }
            }
        } catch (error) {
            console.error("AppProvider: Error loading settings from localStorage:", error)
        }

        // Load user
        try {
            const storedUser = localStorage.getItem(USER_STORAGE_KEY)
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser)
                if (parsedUser && typeof parsedUser === "object") {
                    setUser(parsedUser)
                }
            }
        } catch (error) {
            console.error("AppProvider: Error loading user from localStorage:", error)
        }
    }, [])

    // Save feeds to localStorage whenever they change
    useEffect(() => {
        console.log("AppProvider: Saving feeds to localStorage:", feeds)
        try {
            localStorage.setItem(FEEDS_STORAGE_KEY, JSON.stringify(feeds))
            console.log("AppProvider: Feeds saved successfully to localStorage")
        } catch (error) {
            console.error("AppProvider: Error saving feeds to localStorage:", error)
        }
    }, [feeds])

    // Save settings to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings))
        } catch (error) {
            console.error("AppProvider: Error saving settings to localStorage:", error)
        }
    }, [settings])

    // Save user to localStorage whenever they change
    useEffect(() => {
        try {
            if (user) {
                localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user))
            } else {
                localStorage.removeItem(USER_STORAGE_KEY)
            }
        } catch (error) {
            console.error("AppProvider: Error saving user to localStorage:", error)
        }
    }, [user])

    // Save function to update state
    const save = (fieldName: string, newData: Record<string, unknown>) => {
        console.log(`AppProvider: Saving ${fieldName} with value:`, newData)

        switch (fieldName) {
            case "feeds":
                if (Array.isArray(newData)) {
                    console.log("AppProvider: Setting feeds:", newData)
                    setFeeds(newData as unknown as AppFeed[])
                } else {
                    console.warn("AppProvider: Attempted to set non-array value as feeds:", newData)
                }
                break
            case "settings":
                if (newData && typeof newData === "object") {
                    // Ensure the object has the required theme property
                    const settingsData = newData as unknown as AppSettings
                    if (!settingsData.theme) {
                        settingsData.theme = "light" // Default theme if missing
                    }
                    setSettings(settingsData)
                }
                break
            case "user":
                if (newData && typeof newData === "object") {
                    // Ensure the object has all required AppUser properties
                    const userData = newData as unknown as AppUser
                    if (
                        !userData.id ||
                        !userData.name ||
                        !userData.lastname ||
                        userData.isAdmin === undefined
                    ) {
                        console.warn("AppProvider: Invalid user data, using default values")
                        setUser({ id: 0, name: "", lastname: "", isAdmin: false })
                    } else {
                        setUser(userData)
                    }
                }
                break
            case "data":
                setData((prev) => [...prev, newData])
                break
            default:
                console.warn(`AppProvider: Unknown key "${fieldName}" in save function`)
        }
    }

    // Provide the context value
    const contextValue: AppContextProps = {
        feeds,
        settings,
        user: user || { id: 0, name: "", lastname: "", isAdmin: false },
        data,
        save
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
