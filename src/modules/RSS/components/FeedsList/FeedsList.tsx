import { useState } from "react"
import { useRSSContext } from "@/modules/RSS/hooks"
import { Feed } from "@/modules/RSS/RSS.types"
import { FeedFilters } from "@/modules/RSS/components"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import * as Styled from "./FeedsList.styled"

export default function FeedsList() {
    const { feeds, filter, setFilter, removeFeed, updateFeedTitle } = useRSSContext()
    const [editingFeedId, setEditingFeedId] = useState<string | null>(null)
    const [newTitle, setNewTitle] = useState("")

    function handleEditClick(feed: Feed) {
        setEditingFeedId(feed.id)
        setNewTitle(feed.title)
    }

    function handleTitleSubmit(feedId: string) {
        if (newTitle.trim()) {
            updateFeedTitle(feedId, newTitle)
        }
        setEditingFeedId(null)
    }

    function handleKeyPress(e: React.KeyboardEvent, feedId: string) {
        if (e.key === "Enter") {
            handleTitleSubmit(feedId)
        }
    }

    return (
        <Styled.FeedsListContainer>
            <FeedFilters />
            <h3>Your feeds:</h3>
            <Styled.FeedsList>
                {feeds?.map((feed) => (
                    <Styled.FeedItem key={feed.id} $isSelected={filter === feed.id}>
                        {editingFeedId === feed.id ? (
                            <Styled.FeedTitleInput
                                type="text"
                                value={newTitle}
                                onChange={(e) => setNewTitle(e.target.value)}
                                onBlur={() => handleTitleSubmit(feed.id)}
                                onKeyDown={(e) => handleKeyPress(e, feed.id)}
                                autoFocus
                            />
                        ) : (
                            <Styled.FeedTitle onClick={() => setFilter(feed.id)}>
                                {feed.title}
                            </Styled.FeedTitle>
                        )}
                        <Styled.FeedActions>
                            <Styled.ActionButton onClick={() => handleEditClick(feed)}>
                                <EditOutlined />
                            </Styled.ActionButton>
                            <Styled.ActionButton onClick={() => removeFeed(feed.id)}>
                                <DeleteOutlined />
                            </Styled.ActionButton>
                        </Styled.FeedActions>
                    </Styled.FeedItem>
                ))}
            </Styled.FeedsList>
        </Styled.FeedsListContainer>
    )
}
