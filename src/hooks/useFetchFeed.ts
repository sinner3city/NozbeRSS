import { parseFeed } from "@rowanmanning/feed-parser"
import { useEffect, useState, useCallback } from "react"
// import { useAppContext } from "./useAppContext"
import { AppFeed, AppNews } from "@/contexts/AppContext"

const FEEDS_STORAGE_KEY = "nozbe_rss_feeds"

function mapFeed(feedID: string, parsedFeed: any) {
    return {
        id: feedID,
        title: parsedFeed.title,
        description: parsedFeed.description,
        link: feedID,
        news: parsedFeed.items.map((item) => {
            return {
                id: item.url,
                title: item.title,
                description: item.description || item.content,
                image: item.media.find((m) => m.type === "image"),
                link: item.url,
                pubDate: item.published
                    ? new Date(item.published).toISOString()
                    : new Date().toISOString()
            }
        })
    }
}

function useFetchFeed(url: string | null) {
    const [feed, setFeed] = useState<AppFeed | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const feedsStorage = JSON.parse(localStorage.getItem(FEEDS_STORAGE_KEY) || "[]")

    const fetchFeed = useCallback(
        async (feedUrl: string) => {
            setIsLoading(true)

            const isExistingFeed = feedsStorage?.find((f) => f.id === feedUrl)

            if (isExistingFeed) {
                setError(`Failed to fetch feed: ${feedUrl} already exists in localStorage`)
                throw new Error(`Failed to fetch feed: ${feedUrl} already exists in localStorage`)
            }

            try {
                const response = await fetch(feedUrl)
                if (!response.ok) {
                    setError(`Failed to fetch feed: ${response.status} ${response.statusText}`)
                    throw new Error(
                        `Failed to fetch feed: ${response.status} ${response.statusText}`
                    )
                }

                const feedBody = await response.text()

                const parsedFeed = parseFeed(feedBody)
                const mappedFeed = mapFeed(feedUrl, parsedFeed)

                feedsStorage.push(mappedFeed)
                localStorage.setItem(FEEDS_STORAGE_KEY, JSON.stringify(feedsStorage))
                setFeed(mappedFeed)
            } catch (parseError) {
                throw new Error(
                    `Failed to parse feed: ${
                        parseError instanceof Error ? parseError.message : "Unknown error"
                    }`
                )
            } finally {
                setIsLoading(false)
            }
        },
        [feedsStorage]
    )

    useEffect(() => {
        console.log("useFetchFeed: url", url)
        // setFeed(null)
        // setError(null)
        // If URL is empty, don't fetch
        if (!url || url.trim() === "") return

        fetchFeed(url)
    }, [url])

    return {
        feed,
        isLoading,
        error
    }
}

export default useFetchFeed
