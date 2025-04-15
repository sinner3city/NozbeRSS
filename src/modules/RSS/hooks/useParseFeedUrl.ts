import { parseFeed } from "@rowanmanning/feed-parser"
import { Feed as FeedXMLParser } from "@rowanmanning/feed-parser/lib/feed/base"
import { useEffect, useState, useCallback } from "react"
import { Feed } from "@/modules/RSS/RSS.types"
import { useRSSContext } from "@/modules/RSS/hooks"

function mapFeedData(parsedXML: FeedXMLParser) {
    return {
        id: parsedXML.self,
        title: parsedXML.title,
        description: parsedXML.description,
        link: parsedXML?.url,
        articles: parsedXML.items.map((item) => {
            return {
                id: item.id,
                title: item.title,
                description: item.description,
                image: item.image?.url,
                link: item?.url,
                feedId: parsedXML.self,
                favorite: false,
                read: false,
                pubDate: item.published
                    ? new Date(item.published).toISOString()
                    : new Date().toISOString()
            }
        })
    }
}

export function useParseFeedUrl(url: string | null) {
    const { addNewFeed, error: feedsError } = useRSSContext()
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchFeed = useCallback(
        async (feedUrl: string) => {
            setIsLoading(true)
            setError(null)
            try {
                const response = await fetch(feedUrl)

                if (!response.ok) {
                    setError(`ERROR: ${response.status} ${response.statusText}`)
                    throw new Error(`ERROR: ${response.status} ${response.statusText}`)
                }

                const feedResponse = await response.text()

                const parsedXML = parseFeed(feedResponse)
                const mappedFeed = mapFeedData(parsedXML)

                addNewFeed(mappedFeed as Feed)
            } catch (parseError) {
                const errorMessage =
                    parseError instanceof Error ? parseError.message : "Unknown error"

                setError(`ERROR: ${errorMessage}`)
                throw new Error(`ERROR: ${errorMessage}`)
            } finally {
                setIsLoading(false)
            }
        },
        [addNewFeed]
    )

    useEffect(() => {
        if (feedsError) setError(feedsError)
    }, [feedsError])

    useEffect(() => {
        if (!url || url.trim() === "") return
        fetchFeed(url)
    }, [url])

    return {
        isLoading,
        error
    }
}
