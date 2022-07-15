import styled from "styled-components";

export const DropdownContainer = styled.div`
  max-width: 100px;
`;

export const DropdownButton = styled.button`
  border: none;
  padding: 0;
  border-radius: 3px;
  width: 31px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  background-color: transparent;

  &[aria-expanded="true"] {
    background-color: #ff7900;
    color: #000;

    &:hover {
      background-color: #ff7900;
      color: #000;
    }
  }

  &:hover {
    background-color: #ebecf0;
  }

  &::after {
    display: none;
  }

  span {
    display: inline-block;
    height: 10px;
  }
`;

export const DropdownMenuContainer = styled.div`
  border: none;
  border-radius: 3px;
  padding: 5px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.08);
`;

export const DropdownItem = styled.a`
  font-weight: bold;
  font-size: 12px;
  color: #000;

  &:active,
  &:focus {
    background-color: #fff;
    color: #000;
  }

  &:hover {
    background-color: #e0e0e0;
    color: #000;
  }
`;
