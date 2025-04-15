import styled from "styled-components"

export const FiltersList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0 0 1rem 0.5rem;
`

export const FilterItem = styled.li<{ $isActive: boolean }>`
    cursor: pointer;
    padding: 5px 10px;
    margin-bottom: 5px;
    border-radius: 4px;
    transition: background-color 0.2s;
    color: ${({ $isActive }) => ($isActive ? "red" : "inherit")};

    &:hover {
        color: red;
    }
`

export const Label = styled.span`
    margin-left: 0.5rem;
`
