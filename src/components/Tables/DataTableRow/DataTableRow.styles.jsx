import styled, { css } from "styled-components";

export const TableRow = styled.tr`
  background-color: transparent;
  position: relative;
  border-bottom: 1px solid #f6ece1 !important;

  ${(props) =>
    props.radioVisible &&
    css`
      cursor: pointer;
    `}
`;

export const TableCell = styled.td`
  padding: 0.875rem 0.625rem calc(0.875rem + 1px) 0 !important;
  height: 45px;
  white-space: nowrap;
  color: rgba(0, 0, 0, 0.8);

  a:hover {
    text-decoration: underline;
  }
`;
