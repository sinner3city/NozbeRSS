import styled from "styled-components"

export const FeedsListContainer = styled.div`
    list-style: none;
    padding: 0;
    margin: 0;
    min-width: 300px;
`

export const FeedsList = styled.ul`
    margin: 0;
    padding: 0;
`

export const FeedItem = styled.li<{ $isSelected: boolean }>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 15px;
    margin-bottom: 5px;
    border-radius: 4px;
    gap: 5px;
    transition: background-color 0.2s;
    color: ${(props) => (props.$isSelected ? "red" : "inherit")};

    > span {
        cursor: pointer;
    }

    &:hover {
        background-color: #e0e0e0;
    }
`

export const FeedActions = styled.div`
    display: flex;
    gap: 5px;
`

export const FeedTitle = styled.span`
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export const FeedTitleInput = styled.input`
    flex: 1;
    padding: 4px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
`

export const ActionButton = styled.button`
    background: none;
    border: none;
    color: #999;
    font-size: 18px;
    padding: 0 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
        color: #ff4444;
    }
`
