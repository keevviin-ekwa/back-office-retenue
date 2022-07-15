import styled from "styled-components";

export const TableContainer = styled.div``;

export const Table = styled.table`
  background-color: transparent;
`;

export const TableHead = styled.thead``;

export const TheadRow = styled.tr`
  border-bottom: 1px solid #f6ece1 !important;
`;

export const TheadCell = styled.th`
  color: #000;
  font-weight: bold;
  font-size: 14px;
  height: 45px;
  padding: 0 10px 0 0 !important;
  vertical-align: middle !important;
  white-space: nowrap;
`;

export const Tbody = styled.tbody``;

export const TbodyRow = styled.tr`
  background-color: transparent;
  position: relative;
  border-bottom: 1px solid #f6ece1;

  &:hover {
    background-color: rgba(241, 110, 0, 0.04);
  }

  & > td {
    &:first-child {
      padding-left: 13px;
    }

    &:not(:first-child) {
      padding-right: 10px;
    }

    .custom-control-label::before {
      border: rgba(241, 110, 0, 0.37) solid 2px;
    }
  }
`;

export const TbodyCell = styled.td`
  height: 45px;
  padding: 0 !important;
  vertical-align: middle !important;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.8);
`;
