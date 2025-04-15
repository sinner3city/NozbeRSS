import { createContext } from "react"

export interface AppUser {
    id: number
    name: string
    lastname: string
    isAdmin: boolean
}

export interface AppSettings {
    theme: string
}

// export interface AppNews {
//     guid: string
//     title: string
//     description: string
//     link: string
//     pubDate: string
//     image: string
// }

// export interface AppFeed {
//     id: string
//     title: string
//     description: string
//     link: string
//     news: AppNews[]
// }

export type AppData = Record<string, unknown>

export interface AppContextProps {
    settings: AppSettings
    user: AppUser
    data: AppData[]
}

export const AppContext = createContext<AppContextProps | null>(null)
