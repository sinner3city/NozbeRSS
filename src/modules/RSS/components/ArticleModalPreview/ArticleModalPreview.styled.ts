import styled from "styled-components"

export const ArticleModalContent = styled.div`
    padding: 1rem;
`

export const ArticleImage = styled.div`
    margin-bottom: 1rem;
    text-align: center;

    img {
        max-width: 100%;
        max-height: 300px;
        border-radius: 1rem;
    }
`

export const ArticleMeta = styled.div`
    margin-bottom: 1rem;
    color: #8c8c8c;
`

export const ArticleDescription = styled.div`
    line-height: 1.6;
    margin-bottom: 20px;
`

export const ArticleLink = styled.div`
    text-align: right;

    a {
        color: #1890ff;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`
