import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

interface AppState {
    users: number
    isDark: boolean
    increment: () => void
    decrement: () => void
    reset: () => void
    toggleTheme: () => void
}

export const useStore = create<AppState>()(
    persist(
        (set) => ({
            users: 0,
            isDark: false,
            increment: () => set((state) => ({ users: state.users + 1 })),
            decrement: () => set((state) => ({ users: state.users - 1 })),
            toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
            reset: () => set({ users: 0 })
        }),
        {
            name: "appState",
            storage: createJSONStorage(() => localStorage),
            version: 1,
            onRehydrateStorage: () => (state) => {
                console.log("hydration starts", state)
            }
        }
    )
)
