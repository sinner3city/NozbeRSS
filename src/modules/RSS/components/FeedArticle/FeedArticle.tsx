import { StarOutlined, ReadOutlined, StarFilled, ReadFilled } from "@ant-design/icons"
import { FeedArticle as FeedArticleType } from "@/modules/RSS/RSS.types"
import { useRSSContext } from "@/modules/RSS/hooks"
import * as Styled from "./FeedArticle.styled"

interface FeedArticleProps {
    article: FeedArticleType
    onArticleClick: (article: FeedArticleType) => void
}

function FeedArticle({ article, onArticleClick }: FeedArticleProps) {
    const { updateFavorites, updateRead, settings } = useRSSContext()
    const isRead = settings.filters.read.includes(article.id)
    const isFavorite = settings.filters.favorites.includes(article.id)

    return (
        <Styled.ArticleItem $isRead={isRead}>
            <Styled.ArticleHeader>
                <Styled.ArticleTitle onClick={() => onArticleClick(article)}>
                    {article.title}
                    <Styled.ArticleDate>
                        ({new Date(article.pubDate).toLocaleDateString()})
                    </Styled.ArticleDate>
                </Styled.ArticleTitle>

                <Styled.ArticleActions>
                    <Styled.ActionButton
                        $isActive={isFavorite}
                        onClick={() => updateFavorites(article.id)}
                        title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        {isFavorite ? <StarFilled /> : <StarOutlined />}
                    </Styled.ActionButton>

                    <Styled.ActionButton
                        $isActive={isRead}
                        onClick={() => updateRead(article.id)}
                        title={isRead ? "Mark as unread" : "Mark as read"}
                    >
                        {isRead ? <ReadFilled /> : <ReadOutlined />}
                    </Styled.ActionButton>
                </Styled.ArticleActions>
            </Styled.ArticleHeader>
            <Styled.ArticleDescription onClick={() => onArticleClick(article)}>
                {article.description}
            </Styled.ArticleDescription>
        </Styled.ArticleItem>
    )
}

export default FeedArticle
