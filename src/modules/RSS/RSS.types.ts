export interface Feed {
    id: string
    title: string
    description: string
    link: string
    articles: FeedArticle[]
}

export interface FeedArticle {
    id: string
    title: string
    description: string
    link?: string
    image?: string
    pubDate: string
    favorite?: boolean
    read?: boolean
}

export type Filter = "favorites" | "read" | "all" | string

export interface FeedSettings {
    selectedFilter: Filter
    filters: Record<Filter, string[]>
}

export interface RSSContextType {
    feeds: Feed[]
    allArticles: FeedArticle[]
    settings: FeedSettings
    error: string | null
    success: string | null
    filteredArticles: FeedArticle[]
    filter: Filter
    setFilter: (filter: Filter) => void
    addNewFeed: (feed: Feed) => void
    removeFeed: (feedId: string) => void
    updateFeedTitle: (feedId: string, newTitle: string) => void
    updateFavorites: (articleId: string) => void
    updateRead: (articleId: string) => void
}
