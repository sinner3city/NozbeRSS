import { useEffect, useRef, useState } from "react"
import { useParseFeedUrl } from "@/modules/RSS"
import * as Styled from "./AddFeed.styled"

const exampleFeeds = [
    ["Image of the Day", "https://www.nasa.gov/feeds/iotd-feed/"],
    ["Technology", "https://www.nasa.gov/technology/feed/"],
    ["Station", "https://www.nasa.gov/missions/station/feed/"]
]

export default function AddFeed() {
    const [feedUrl, setFeedUrl] = useState<string | null>(null)
    const { isLoading, error } = useParseFeedUrl(feedUrl)
    const addInputRef = useRef<HTMLInputElement>(null)

    function handleAddNewFeed() {
        setFeedUrl(addInputRef.current?.value || null)
        addInputRef.current!.value = ""
    }

    useEffect(() => {
        if (error) setFeedUrl(null)
    }, [error])

    return (
        <Styled.AddFeedSection>
            <Styled.AddFeedHeader>
                <h2>Add New Feed Channel</h2>

                <Styled.FeedExamples>
                    <strong>examples:</strong>
                    {exampleFeeds.map((feed) => (
                        <Styled.FeedExample
                            key={feed[0]}
                            onClick={() => (addInputRef.current!.value = feed[1])}
                        >
                            {feed[0]}
                        </Styled.FeedExample>
                    ))}
                </Styled.FeedExamples>
            </Styled.AddFeedHeader>

            <Styled.AddContainer>
                <Styled.AddInput type="text" placeholder="Enter RSS feed URL" ref={addInputRef} />
                <Styled.AddButton onClick={handleAddNewFeed}>
                    {isLoading ? "Adding..." : "Add Feed"}
                </Styled.AddButton>
            </Styled.AddContainer>
        </Styled.AddFeedSection>
    )
}
