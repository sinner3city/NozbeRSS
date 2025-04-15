import styled from "styled-components"

export const ArticleItem = styled.article<{ $isRead: boolean }>`
    margin-bottom: 20px;
    padding: 2rem;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    opacity: ${({ $isRead }) => ($isRead ? 0.7 : 1)};

    &:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
`

export const ArticleHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 10px;
`

export const ArticleTitle = styled.h3`
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #000;
    flex: 1;
    cursor: pointer;
`

export const ArticleDate = styled.small`
    font-size: 12px;
    color: #8c8c8c;
    margin-left: 10px;
`

export const ArticleActions = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    color: black;
`

export const ActionButton = styled.button<{ $isActive: boolean }>`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    padding: 5px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    color: ${({ $isActive }) => ($isActive ? "red" : "#1890ff")};
`

export const ArticleDescription = styled.p`
    line-height: 1.6;
    margin-bottom: 20px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`
