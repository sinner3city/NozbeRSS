import styled from "styled-components"

export const RSSContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 2rem;
    margin-top: 3rem;

    @media (max-width: 1024px) {
        flex-wrap: wrap;
        gap: 1rem;
    }
`

export const RSSNoFeeds = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    gap: 3rem;
    margin-top: 3rem;
`
