import React, { useState } from "react";
import PropTypes from "prop-types";


import DataTableRow from "../DataTableRow/DataTableRow.ui";

import {
  Table,
  TableContainer,
  TableHead,
  TheadRow,
  TheadCell,
  Tbody,
  TbodyRow,
  TbodyCell,
} from "./Datatables.styles";

const DataTable = ({
  headers,
  data,
  actions,
  emptyMessage,
  radioVisible = false,
  keyProp = "id",
  onSelect,
}) => {
  const [currentItem, setCurrentItem] = useState(null);
  console.log("actions",actions);
  const handleSelect = (item) => {
    if (radioVisible && item[keyProp]) {
      // && item[keyProp] !== currentItem
      setCurrentItem(item[keyProp]);
      onSelect(item);
    }
  };

  const ShowTheadCell = ({ header }) => {
    if (header.isShow === undefined || header.isShow === true) {
      return <TheadCell>{header.name}</TheadCell>;
    } else if (header.isShow === false) {
      return null;
    }
  };

  return (
    <TableContainer className="table-responsive">
      <Table className="table">
        <TableHead>
          <TheadRow>
            {radioVisible && <th></th>}
            {headers.map((header, index) => (
              <ShowTheadCell key={index} header={header} />
            ))}
            {actions.length > 0 ? <th></th> : null}
          </TheadRow>
        </TableHead>
        <Tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
               <DataTableRow
                handleSelect={handleSelect}
                currentItem={currentItem}
                keyProp={keyProp}
                radioVisible={radioVisible}
                actions={actions}
                headers={headers}
                item={item}
                key={index}
              />
            ))
          ) : (
            <TbodyRow>
              <TbodyCell
                style={{ textAlign: "center" }}
                colSpan={
                  actions.length > 0 || radioVisible
                    ? headers.length + 1
                    : headers.length
                }
              >
                {emptyMessage}
              </TbodyCell>
            </TbodyRow>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

DataTable.defaultProps = {
  headers: [],
  data: [],
  actions: [],
  emptyMessage: "",
};

DataTable.propTypes = {
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ),
  data: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, action: PropTypes.func })
  ),
  emptyMessage: PropTypes.string,
};

export default DataTable;
