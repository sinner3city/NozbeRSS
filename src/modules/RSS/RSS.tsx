import { useEffect } from "react"
import { AddFeed, ArticlesList, FeedsList } from "@/modules/RSS/components"
import { useRSSContext } from "@/modules/RSS/hooks"
import { notification } from "antd"
import * as Styled from "./RSS.styled"

export default function RSS() {
    const { error, success, feeds } = useRSSContext()

    useEffect(() => {
        // show notifications
        if (success) {
            notification.success({
                message: success,
                duration: 3
            })
        }
        if (error) {
            notification.error({
                message: error,
                duration: 3
            })
        }
    }, [success, error])
    return (
        <>
            <AddFeed />
            {feeds && feeds.length > 0 ? (
                <Styled.RSSContainer>
                    <FeedsList />
                    <ArticlesList />
                </Styled.RSSContainer>
            ) : (
                <Styled.RSSNoFeeds>
                    <p>No feeds found</p>
                </Styled.RSSNoFeeds>
            )}
        </>
    )
}
