import { styled } from "@linaria/react";

export const List = styled.ul`
    /* border: 1px solid rgb(222, 226, 230); */
    /* border-radius: 0.75rem; */
`;

export const ListHeader = styled.li`
    background-color: rgb(249 250 251);
    color: rgb(17 24 39);
    padding-inline: 1.25rem;
    padding-block: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 600;
`;

export const ListItem = styled.li`
    display: flex;
    align-items: center;
    justify-content: space-between;
    column-gap: 1.5rem;
    min-height: 48px;
    padding-inline: 1.25rem;
    padding-block: 1.5rem;
    cursor: pointer;

    &:hover {
        background-color: rgba(0 0 0 4%);
    }
`;

export const ListItemLeftSide = styled.div`
    display: flex;
    column-gap: 1rem;
`;

export const ListItemText = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ListItemTitle = styled.h3`
    font-size: 1.5rem;
`;

export const ListItemDescription = styled.p``;

export const ListItemRightSide = styled.div`
    display: flex;
    column-gap: 1rem;
`;

export const ItemActions = styled.div`
    display: flex;
    gap: 4px;
`;
