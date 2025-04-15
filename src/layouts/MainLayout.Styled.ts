import styled from "styled-components"

export const Layout = styled.main`
    width: 100%;
    height: 100%;
    min-height: fit-content;
    padding: 4rem;

    @media (max-width: 1024px) {
        padding: 2rem;
    }
`

export const Header = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    background-color: #000;
    color: #fff;
    width: 100%;
`

export const Title = styled.h1`
    font-size: 2rem;
    font-weight: 700;
    color: #fff;
    text-align: center;
    margin: 0;
`
