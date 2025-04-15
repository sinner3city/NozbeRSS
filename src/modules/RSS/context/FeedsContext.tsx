import { useState, ReactNode, useEffect } from "react"
import { Feed, FeedArticle, FeedSettings, Filter } from "../RSS.types"
import { FeedsContext } from "./useFeedsContext"

export const FEEDS_STORAGE_KEY = "nozbe_rss_feeds"
export const FEEDS_SETTINGS_STORAGE_KEY = "nozbe_rss_settings"

const initialSettings: FeedSettings = {
    selectedFilter: "all",
    filters: {
        favorites: [],
        read: []
    }
}

// UTILS / HELPERS

function getSavedFeeds() {
    const localFeeds = localStorage.getItem(FEEDS_STORAGE_KEY) || "[]"
    return JSON.parse(localFeeds)
}

function setSavedFeeds(feeds: Feed[]) {
    localStorage.setItem(FEEDS_STORAGE_KEY, JSON.stringify(feeds))
}

function getFeedSettings() {
    const localSettings =
        localStorage.getItem(FEEDS_SETTINGS_STORAGE_KEY) || JSON.stringify(initialSettings)
    return JSON.parse(localSettings)
}

function setFeedSettings(settings: FeedSettings) {
    localStorage.setItem(FEEDS_SETTINGS_STORAGE_KEY, JSON.stringify(settings))
}

function sortNewsByDate(news: FeedArticle[]) {
    return news.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())
}

function getAllArticles() {
    return (
        getSavedFeeds()
            .map((feed) => feed.articles)
            .flat() || []
    )
}

function getFilteredArticles(filter: Filter, settings: FeedSettings) {
    const allArticles = getAllArticles()
    switch (filter) {
        case "all":
            return allArticles
        case "favorites":
            return allArticles.filter((article) => settings.filters.favorites.includes(article.id))
        case "read":
            return allArticles.filter((article) => !settings.filters.read.includes(article.id))
        default:
            return getSavedFeeds().find((feed) => feed.id === filter)?.articles || []
    }
}

// PROVIDER

interface FeedsProviderProps {
    children: ReactNode
}

export function FeedsProvider({ children }: FeedsProviderProps) {
    const [feeds, setFeeds] = useState<Feed[]>(getSavedFeeds())
    const [allArticles, setAllArticles] = useState<FeedArticle[]>(getAllArticles())
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [settings, setSettings] = useState<FeedSettings>(getFeedSettings())
    const [filter, setFilter] = useState<Filter>(getFeedSettings().selectedFilter || "all")
    const [filteredArticles, setFilteredArticles] = useState<FeedArticle[]>(
        sortNewsByDate(getFilteredArticles(filter, settings))
    )

    const removeFeed = (feedId: string) => {
        const feedToRemove = feeds.find((feed) => feed.id === feedId)

        if (feedToRemove) {
            const articleIdsToRemove = feedToRemove.articles.map((article) => article.id)

            // remove favorites and read from settings
            setSettings((prevSettings) => ({
                ...prevSettings,
                filters: {
                    ...prevSettings.filters,
                    favorites: prevSettings.filters.favorites.filter(
                        (id) => !articleIdsToRemove.includes(id)
                    ),
                    read: prevSettings.filters.read.filter((id) => !articleIdsToRemove.includes(id))
                }
            }))

            setFilter("all")
            setFeeds((prevFeeds) => prevFeeds.filter((feed) => feed.id !== feedId))
            setSuccess("Feed removed successfully")
        }
    }

    const addNewFeed = (newFeed: Feed) => {
        const isExistingFeed = feeds.some((feed: Feed) => feed.id === newFeed.id)
        if (isExistingFeed) {
            console.warn(`Feed with ID ${newFeed.id} already exists`)
            setError(`Feed with ID ${newFeed.id} already exists`)
            return
        }
        setFeeds((prevFeeds) => [...prevFeeds, newFeed])
        setSuccess("Feed added successfully")
    }

    const updateFeedTitle = (feedId: string, newTitle: string) => {
        setFeeds((prevFeeds) =>
            prevFeeds.map((feed) => (feed.id === feedId ? { ...feed, title: newTitle } : feed))
        )
        setSuccess("Title successfully updated")
    }

    const updateFavorites = (articleId: string) => {
        let isCurrentlyFavorite = false
        let articleTitle = ""

        isCurrentlyFavorite = settings.filters.favorites.includes(articleId)

        feeds.forEach((feed) => {
            const article = feed.articles.find((a) => a.id === articleId)
            if (article) {
                articleTitle = article.title
            }
        })

        setSettings((prevSettings) => ({
            ...prevSettings,
            filters: {
                ...prevSettings.filters,
                favorites: isCurrentlyFavorite
                    ? prevSettings.filters.favorites.filter((id) => id !== articleId)
                    : [...prevSettings.filters.favorites, articleId]
            }
        }))

        setFeeds((prevFeeds) =>
            prevFeeds.map((feed) => ({
                ...feed,
                articles: feed.articles.map((article) => {
                    if (article.id === articleId) {
                        setSuccess(
                            isCurrentlyFavorite
                                ? `"${articleTitle}" removed from favorites`
                                : `"${articleTitle}" added to favorites`
                        )
                        return { ...article, favorite: !isCurrentlyFavorite }
                    }
                    return article
                })
            }))
        )
    }

    const updateRead = (articleId: string) => {
        let isCurrentlyRead = false
        let articleTitle = ""

        isCurrentlyRead = settings.filters.read.includes(articleId)

        feeds.forEach((feed) => {
            const article = feed.articles.find((a) => a.id === articleId)
            if (article) {
                articleTitle = article.title
            }
        })

        setSettings((prevSettings) => ({
            ...prevSettings,
            filters: {
                ...prevSettings.filters,
                read: isCurrentlyRead
                    ? prevSettings.filters.read.filter((id) => id !== articleId)
                    : [...prevSettings.filters.read, articleId]
            }
        }))

        setFeeds((prevFeeds) =>
            prevFeeds.map((feed) => ({
                ...feed,
                articles: feed.articles.map((article) => {
                    if (article.id === articleId) {
                        setSuccess(
                            isCurrentlyRead
                                ? `"${articleTitle}" marked as unread`
                                : `"${articleTitle}" marked as read`
                        )
                        return { ...article, read: !isCurrentlyRead }
                    }
                    return article
                })
            }))
        )
    }

    useEffect(() => {
        setSavedFeeds(feeds)
        setAllArticles(getAllArticles())
    }, [feeds])

    useEffect(() => {
        setSuccess(null)
        setError(null)
    }, [success, error])

    useEffect(() => {
        setFeedSettings(settings)
    }, [settings])

    useEffect(() => {
        setFilteredArticles(sortNewsByDate(getFilteredArticles(filter, settings)))
    }, [filter, feeds, settings])

    useEffect(() => {
        if (settings.selectedFilter !== filter) {
            setSettings((prevSettings) => ({
                ...prevSettings,
                selectedFilter: filter
            }))
        }
    }, [filter, settings.selectedFilter])

    const value = {
        feeds,
        allArticles,
        settings,
        error,
        success,
        filteredArticles,
        filter,
        setFilter,
        addNewFeed,
        removeFeed,
        updateFeedTitle,
        updateFavorites,
        updateRead
    }

    return <FeedsContext.Provider value={value}>{children}</FeedsContext.Provider>
}
