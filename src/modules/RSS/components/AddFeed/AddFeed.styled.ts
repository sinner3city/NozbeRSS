import styled from "styled-components"

export const AddFeedSection = styled.section`
    position: relative;
`

export const AddFeedHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
        margin: 0;
    }

    @media (max-width: 1024px) {
        flex-wrap: wrap;
    }
`

export const FeedExamples = styled.section`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
`

export const FeedExample = styled.div`
    cursor: pointer;
    text-decoration: underline;

    &:hover {
        color: red;
        text-decoration: none;
    }
`

export const AddContainer = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 10px;
`

export const AddInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`

export const AddButton = styled.button`
    cursor: pointer;
    padding: 0.5rem 2rem;
    border-radius: 4px;
    border: none;
    background-color: #000;
    color: #fff;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: red;
    }
`
