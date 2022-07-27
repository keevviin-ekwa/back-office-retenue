import React, { Component, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileImport, faAdd, faUser } from "@fortawesome/free-solid-svg-icons";
import CustomInput from "../components/inputs/custom-input";
import AddPdvForm from "../components/AddPdvForm/AddPdvForm";
import { connect } from "react-redux";
import { selectPdvList } from "../store/reducers/pdv/pdv.selector";
import { getAllPdvAction } from "../store/reducers/pdv/pdv.actions";
import { createStructuredSelector } from "reselect";

import CustomDataTable from "../components/CustomDatatable/CustomDataTable";
import { isDate } from 'date-fns';
import { validateMonthCommission } from "../store/reducers/commissions/commissions.action";

function PdvPage({ pdv, getAllPdv }) {
  //

  const [state, setState] = useState({
    maxPerPage: 10,
    offset: 1,
    pageCount: 0,
  });

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getAsync(state.maxPerPage, state.offset);
  }, []);

  useEffect(() => {
    getAsync(state.maxPerPage, state.offset);
  }, [state.maxPerPage, state.offset]);

  const getAsync = (maxPerPage, offset) => {
    setTimeout(() => {
      getAllPdv(maxPerPage, offset).then((res) => {
        setState({
          ...state,
          pageCount: Math.ceil(res.data.totalRecords / maxPerPage),
        });
      });
    }, 500);
  };

  const closeEditForm = () => {
    setOpenEdit(false);
  };

  const openEditForm = () => {
    setOpenEdit(true);
  };

  const handlePageClick = (data) => {
    let selected = data.selected;

    setState({ ...state, offset: selected + 1 });
  };

  return (
    <div>
      <div>
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 className="h2">Points de vente</h1>
        </div>

        {/*les bouttons des deux collapses*/}
        <div className="d-flex">
          <div style={{ margin: 4 }}>
            <AddPdvForm />
          </div>

          <div style={{ margin: 4 }}>
            <button
              className="btn btn-primary d-flex justify-content-between"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-2"
              aria-expanded="false"
              aria-controls="collapse-2"
            >
              <div>
                <FontAwesomeIcon icon={faFileImport} />
              </div>{" "}
              <div className="mx-2">Importer le fichier de données</div>
            </button>
          </div>
        </div>
        {/*contenu des collapses*/}
        <div>
          {/* modal */}

          <div
            className="modal fade "
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
            aria-labelledby="staticBackdropLabel"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-body">
                  <AddPdvForm />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Fermer
                  </button>
                  <button type="button" className="btn btn-primary">
                    Ajouter
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* end modal */}
          <div className="collapse mt-3" id="collapse-2">
            <CustomInput />
          </div>
        </div>

        <div className="row mt-5 mb-5">
          <div className="col-md-12 border-solid-1">
            <CustomDataTable pdv={pdv.data} />

            {state.pageCount > 1 && (
              <div className="d-flex justify-content-end">
                <nav>
                  <ReactPaginate
                    previousLabel={""}
                    nextLabel={""}
                    breakLabel={"..."}
                    pageCount={state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    disabledClassName={"disabled"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                  />
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  //  authenticated: selectUserAuthentication,
  //  currentUser: selectUserKeycloak
  pdv: selectPdvList,
});

const mapDispatchToProps = (dispatch) => ({
    getAllPdv: (max, off) => dispatch(getAllPdvAction(max, off)),
   
});

export default connect(mapStateToProps, mapDispatchToProps)(PdvPage);
