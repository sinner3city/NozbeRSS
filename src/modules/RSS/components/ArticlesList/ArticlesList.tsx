import { useState } from "react"
import { useRSSContext } from "@/modules/RSS/hooks"
import { FeedArticle as FeedArticleType } from "@/modules/RSS/RSS.types"
import { ArticleModalPreview, FeedArticle } from "@/modules/RSS/components"
import * as Styled from "./ArticlesList.styled"

function ArticlesList() {
    const { filteredArticles } = useRSSContext()
    const [selectedArticle, setSelectedArticle] = useState<FeedArticleType | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleArticleClick = (article: FeedArticleType) => {
        setSelectedArticle(article)
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
        setSelectedArticle(null)
    }

    return (
        <Styled.ArticlesListContainer>
            <Styled.ArticlesListTitle>
                Latest articles ({filteredArticles.length})
            </Styled.ArticlesListTitle>

            {filteredArticles.map((article) => (
                <FeedArticle
                    key={article.id}
                    article={article}
                    onArticleClick={handleArticleClick}
                />
            ))}

            {selectedArticle && (
                <ArticleModalPreview
                    article={selectedArticle}
                    isOpen={isModalOpen}
                    onClose={handleModalClose}
                />
            )}
        </Styled.ArticlesListContainer>
    )
}

export default ArticlesList
