import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import {
  getCommissionsByUserByYearAsync,
  validateCommissionAsync,
} from "../store/reducers/commissions/commissions.action";
import { selectCommissionList } from "../store/reducers/commissions/commissions.selectors";
import { toast } from 'react-toastify';


function DetailsPage({ getUserCommission, commissions, doValidation }) {
  const { phone } = useParams();
  const [submitted, setSubmitted] = useState(false);
  const [data,setData] = useState([]);


  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setTimeout(() => {
      getUserCommission(phone, currentYear);
    }, 500);

    const datas = [];
    commissions?.map((item, index) => {
      datas.push({
        key: item.id,
        cummulCommission: item.cummulCommission.toFixed(2),
        month: item.month,
        year: item.year,
        taxeAir: item.taxeAir.toFixed(2),
        tva: item.tva.toFixed(2),
        isValid: item.isValid
      });
    });

    setData(datas);
    
  }, []);

  useEffect(() => {
   
    const datas = [];
    commissions?.map((item, index) => {
      datas.push({
        key: item.id,
        cummulCommission: item.cummulCommission.toFixed(2),
        month: item.month,
        year: item.year,
        taxeAir: item.taxeAir.toFixed(2),
        tva: item.tva.toFixed(2),
        isValid: item.isValid
      });
    });

    setData(datas);
   
    
  }, [commissions]);
  
  
  const handleValidate = (id) => {
    console.log("id",id)
    setSubmitted(true);
    doValidation(id).then((res) => {
      console.log("res",res);
      if (res.status === 200) {
        setSubmitted(false);
        toast.success(res.data.message);
      }
    })
      .catch(err => { });
  };

  const columns = [
    {
      title: "Année",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Mois",
      dataIndex: "month",
    },
    {
      title: "commissions",
      dataIndex: "cummulCommission",
    },
    {
      title: "TVA",
      dataIndex: "tva",
    },
    {
      title: "Taxe AIR",
      dataIndex: "taxeAir",
    },
    {
      title: "Statut",
      render: (item) => (
        <span className={item.isValid ? "badge bg-success" : "badge bg-danger"}>
          {item.isValid ? "Validé" : "En attente"}
        </span>
      ),
    },
    {
    
      render: (item) => {
        const id = item.key;
        return item.isValid ? (
          ""
        ) : (
          <button
            key={item.key}
            onClick={() => handleValidate(id)}
            className="btn btn-primary btn-sm"
          >
            Valider
          </button>
        );
      },
    },
  ];

  
  return (
    <div>
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Détails: { phone}</h1>
        </div>
        
        <div className="my-5">
        <Table columns={columns} bordered={true} dataSource={data} />
        </div>
      </div>
    </div>
    
  );
}

const mapStateToProps = createStructuredSelector({
  commissions: selectCommissionList,
});

const mapDispatchToProps = (dispatch) => ({
  getUserCommission: (phoneNumber, year) =>
    dispatch(getCommissionsByUserByYearAsync(phoneNumber, year)),
  doValidation: (_id) => dispatch(validateCommissionAsync(_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailsPage);
