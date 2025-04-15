import { RSSProvider } from "@/modules/RSS/context"
import { RSS } from "@/modules/RSS"

function NozbeRSS() {
    return (
        <>
            <RSSProvider>
                <RSS />
            </RSSProvider>
        </>
    )
}

export default NozbeRSS
