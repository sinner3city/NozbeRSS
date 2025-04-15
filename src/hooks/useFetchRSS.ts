import { parseFeed } from "@rowanmanning/feed-parser"
import { useEffect, useState, useCallback } from "react"
import { useAppContext } from "./useAppContext"
import { AppFeed, AppNews } from "@/contexts/AppContext"

function useFetchRSS(url: string | null) {
    const [feed, setFeed] = useState<AppFeed | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { feeds, save } = useAppContext()

    // Use useCallback to memoize the fetchFeed function
    const fetchFeed = useCallback(
        async (feedUrl: string) => {
            try {
                console.log("Fetching feed from URL:", feedUrl)
                console.log("Current feeds in context:", feeds)

                // Check if feed with this URL already exists
                const existingFeed = feeds?.find((f) => f.link === feedUrl)
                if (existingFeed) {
                    console.log("Feed already exists in context:", existingFeed)
                    setFeed(existingFeed)
                    return existingFeed
                }

                const response = await fetch(feedUrl)
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch feed: ${response.status} ${response.statusText}`
                    )
                }

                const feedText = await response.text()

                // Check if the response is empty
                if (!feedText || feedText.trim() === "") {
                    throw new Error("Empty response from feed URL")
                }

                try {
                    const parsedFeed = parseFeed(feedText)
                    console.log("Parsed feed:", parsedFeed)

                    // Map the parsed feed to AppFeed type
                    const mappedFeed: AppFeed = {
                        id: feedUrl, // Use URL as ID since feedId might not be available
                        title: parsedFeed.title || "Untitled Feed",
                        description: parsedFeed.description || "",
                        link: feedUrl,
                        news: parsedFeed.items.map((item) => {
                            // Extract image from content if available
                            let image = ""

                            // If no image in content, try to get it from media
                            if (!image && item.media && item.media.length > 0) {
                                const imageMedia = item.media.find((m) => m.type === "image")
                                if (imageMedia) {
                                    image = imageMedia.url || ""
                                }
                            }

                            // Get the URL from the item
                            const itemUrl = item.url || ""

                            return {
                                guid: item.id || itemUrl || "",
                                title: item.title || "Untitled Item",
                                description: item.description,
                                link: itemUrl,
                                pubDate: item.published
                                    ? new Date(item.published).toISOString()
                                    : new Date().toISOString(),
                                image: image
                            }
                        })
                    }

                    console.log("Mapped feed:", mappedFeed)
                    setFeed(mappedFeed)

                    // Save the new feed to context
                    const updatedFeeds = [...(feeds || []), mappedFeed]
                    console.log("Saving updated feeds to context:", updatedFeeds)
                    save("feeds", updatedFeeds as any)

                    // Also save directly to localStorage as a backup
                    try {
                        localStorage.setItem("nozbe_rss_feeds", JSON.stringify(updatedFeeds))
                        console.log("Feeds saved directly to localStorage")
                    } catch (localStorageError) {
                        console.error(
                            "Error saving feeds directly to localStorage:",
                            localStorageError
                        )
                    }

                    return mappedFeed
                } catch (parseError) {
                    console.error("Error parsing feed:", parseError)
                    throw new Error(
                        `Failed to parse feed: ${
                            parseError instanceof Error ? parseError.message : "Unknown error"
                        }`
                    )
                }
            } catch (err) {
                console.error("Error fetching RSS feed:", err)
                setError(err instanceof Error ? err.message : "Unknown error")
                return null
            }
        },
        [feeds, save]
    )

    useEffect(() => {
        // Reset state when URL changes
        setFeed(null)
        setError(null)

        // If URL is null or empty, don't fetch
        if (!url || url.trim() === "") {
            return
        }

        fetchFeed(url)
    }, [url, fetchFeed])

    return {
        feed,
        error,
        fetchFeed
    }
}

export default useFetchRSS
