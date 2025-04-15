import { Modal } from "antd"
import { FeedArticle } from "@/modules/RSS/RSS.types"
import * as Styled from "./ArticleModalPreview.styled"

interface ArticleModalPreviewProps {
    article: FeedArticle | null
    isOpen: boolean
    onClose: () => void
}

function ArticleModalPreview({ article, isOpen, onClose }: ArticleModalPreviewProps) {
    return (
        <Modal title={article?.title} open={isOpen} onCancel={onClose} footer={null} width={800}>
            {article && (
                <Styled.ArticleModalContent>
                    {article.image && (
                        <Styled.ArticleImage>
                            <img src={article.image} alt={article.title} />
                        </Styled.ArticleImage>
                    )}
                    <Styled.ArticleMeta>
                        <small>Published: {new Date(article.pubDate).toLocaleDateString()}</small>
                    </Styled.ArticleMeta>
                    <Styled.ArticleDescription>{article.description}</Styled.ArticleDescription>
                    {article.link && (
                        <Styled.ArticleLink>
                            <a href={article.link} target="_blank" rel="noopener noreferrer">
                                Read full article
                            </a>
                        </Styled.ArticleLink>
                    )}
                </Styled.ArticleModalContent>
            )}
        </Modal>
    )
}

export default ArticleModalPreview
