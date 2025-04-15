import { StarFilled, ReadFilled, FolderOpenFilled } from "@ant-design/icons"
import { useRSSContext } from "@/modules/RSS/hooks"
import * as Styled from "./FeedFilters.styled"
import { useCallback } from "react"

const feedFilters = [
    {
        label: "All articles",
        icon: <FolderOpenFilled />,
        filter: "all"
    },
    {
        label: "Favorites",
        icon: <StarFilled />,
        filter: "favorites"
    },
    {
        label: "Unread",
        icon: <ReadFilled />,
        filter: "read"
    }
]

export default function FeedFilters() {
    const { filter, setFilter, settings, allArticles } = useRSSContext()

    const getFilterCount = useCallback(
        (filter: string) => {
            if (filter === "all") {
                return allArticles?.length
            } else if (filter === "read") {
                return allArticles.length - settings?.filters.read.length
            } else if (filter === "favorites") {
                return settings?.filters.favorites.length
            }
        },
        [allArticles, settings]
    )

    return (
        <>
            <h3>Filters:</h3>
            <Styled.FiltersList>
                {feedFilters.map((item) => (
                    <Styled.FilterItem
                        key={item.filter}
                        $isActive={item.filter === filter}
                        onClick={() => setFilter(item.filter)}
                    >
                        {item.icon} <Styled.Label>{item.label}</Styled.Label> (
                        {getFilterCount(item.filter)})
                    </Styled.FilterItem>
                ))}
            </Styled.FiltersList>
        </>
    )
}
