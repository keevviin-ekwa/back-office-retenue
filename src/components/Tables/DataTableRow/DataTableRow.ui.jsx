import { isArray } from "lodash";
import PropTypes from "prop-types";

import capitalize from "../../../utils/capitalize";

import TableDropdown from "../TableDropdown/TableDropdown";

import { TableCell, TableRow } from "./DataTableRow.styles";

const DataTableRow = ({
  item,
  headers,
  actions,
  radioVisible,
  keyProp,
  currentItem,
  handleSelect,
}) => {
  const customDisplay = (func, value) => {
    if (func) {
      return func(value);
    }
    
    return value;
  };

  
  const ShowTableCell = ({ header }) => {
    if (header.isShow === undefined || header.isShow === true) {
      const field = at(item, header.id);
      const displayField = typeof field === "string" ? capitalize(field) : field;

      return (
        <TableCell>
          {customDisplay(header.display, displayField)}
        </TableCell>
      );
    } else if (header.isShow === false) {
      return null;
    }
  };

  const at = (item, id) => {
    const ids = id.split(".");
    let displayItem = null;

    ids.forEach((i) => {
      displayItem = displayItem === null ? item[i] : (displayItem ? displayItem[i] : "");
    });
    
    return isArray(displayItem) ? displayItem : displayItem?.toString();
  };

  return (
    <TableRow radioVisible={radioVisible} onClick={() => handleSelect(item)}>
      
      {headers.map((header, idx) => (
        <ShowTableCell key={idx} header={header} />
      ))}
      {actions.length > 0 ? (
        <TableCell>
          <TableDropdown actions={actions} item={item} />
        </TableCell>
      ) : null}
    </TableRow>
  );
};

DataTableRow.propTypes = {
  item: PropTypes.object,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ),
  actions: PropTypes.arrayOf(
    PropTypes.shape({ label: PropTypes.string, action: PropTypes.func })
  ),
};

export default DataTableRow;
