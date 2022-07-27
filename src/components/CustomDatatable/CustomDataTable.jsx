import React, { useState, useEffect } from "react";
import { Table } from "antd";
import "antd/dist/antd.min.css";
import EditPdvForm from "../EditPdvForm/EditPdvForm";
import SearchBar from "../SearchComponent/SearchBar";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { validateMonthCommission } from "../../store/reducers/commissions/commissions.action";
import { Link } from "react-router-dom";

function CustomDataTable({ pdv, doValidation }) {
  const columns = [
    {
      title: "Numéro",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "NIU",
      dataIndex: "niu",
    },
    {
      title: "Régime",
      dataIndex: "regime",
    },
   
    {
      dataIndex: "",

      render: (item) => (
        <div class="btn-group" role="group" aria-label="Basic example">
         
            <Link  className="btn btn-primary mx-1 btn-sm" onClick={() => handleValidate(item)} to={`detail-user/${item.phoneNumber}`}>Details</Link>
         
          <button
            onClick={() => handeSelectedItem(item)}
            type="button"
            class="btn btn-primary btn-sm  mx-1"
          >
            Modifier
          </button>
        </div>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const handeSelectedItem = (item) => {
    console.log(item);
    setSelectedItem(item);
    setOpenEdit(true);
  };

  const handleValidate = (item) => {
    console.log(item);
  };

  const closeEditForm = () => {
    setOpenEdit(false);
  };

  useEffect(() => {
    const datas = [];
    pdv.map((item, index) => {
      datas.push({
        key: item.id,
        phoneNumber: item.phoneNumber,
        niu: item.niu,
        companyName: item.companyName,
        regime: item.regime,
      });
    });

    setData(datas);
  }, [pdv]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, e) => {
      console.log("datas", data);
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  return (
    <div>
      <EditPdvForm open={openEdit} close={closeEditForm} pdv={selectedItem} />
      <Table
        bordered
        title={() => <SearchBar />}
        pagination={false}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CustomDataTable);
