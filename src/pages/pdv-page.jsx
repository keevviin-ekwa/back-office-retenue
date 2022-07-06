import React, {Component, useEffect, useState} from 'react';
import DashboardCard from "../components/dashbord-card/dashboard-card-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileImport, faAdd, faUser} from "@fortawesome/free-solid-svg-icons";
import CustomInput from "../components/inputs/custom-input";
import AddPdvForm from '../components/AddPdvForm/AddPdvForm';
import DataTable from '../components/datatable/DataTable';
import { connect } from 'react-redux';
import { selectPdvList } from '../store/reducers/pdv/pdv.selector';
import { getAllPdvAction } from '../store/reducers/pdv/pdv.actions';
import { createStructuredSelector } from 'reselect';

function PdvPage({pdv,getAllPdv}) {
           
    useEffect(() => {
       
        setTimeout(() => {
            getAllPdv();
        }, 500);
       
      },[])
        return (
            <div>
                <div>
                    <div
                        className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                        <h1 className="h2">Points de vente</h1>
                        <div className="btn-toolbar mb-2 mb-md-0">
                            <div className="btn-group me-2">

                                <button type="button" className="btn btn-sm btn-secondary">Exporter</button>
                            </div>
                            <button type="button" className="btn btn-sm btn-secondary dropdown-toggle">
                                <span data-feather="calendar"></span>
                                Cette semaine
                            </button>
                        </div>
                    </div>



                            {/*les bouttons des deux collapses*/}
                            <div className="d-flex">
                                <div style={{margin:4}}>
                                    <AddPdvForm/>

                                </div>

                                <div style={{margin:4}}>
                                    <button

                                        className="btn btn-primary d-flex justify-content-between" type="button" data-bs-toggle="collapse"
                                            data-bs-target="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                                        <div><FontAwesomeIcon icon={faFileImport}   /></div> <div className="mx-2">Importer le fichier de données</div>
                                    </button>
                                </div>
                            </div>
                    {/*contenu des collapses*/}
                    <div>
                        {/* modal */}

                        <div className="modal fade " id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel">
                                <div className="modal-dialog modal-dialog-centered modal-lg">
                                    <div className="modal-content">
                                    <div className="modal-body">
                                       <AddPdvForm/>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                                        <button type="button" className="btn btn-primary">Ajouter</button>
                                    </div>
                                    </div>
                                </div>
                        </div>

                        {/* end modal */}
                        <div className="collapse mt-3" id="collapse-2">
                            <CustomInput/>
                        </div>
                    </div>


                    <div className="row mt-5 mb-5">
                        <div className="col-md-12 card">
                           <DataTable pdv={pdv}/>
                        </div>


                    </div>

                </div>
            </div>
        );

}

const mapStateToProps = createStructuredSelector({
    //  authenticated: selectUserAuthentication,
    //  currentUser: selectUserKeycloak
        pdv:selectPdvList
    });
    
    const mapDispatchToProps = (dispatch) => ({
      getAllPdv: () => dispatch(getAllPdvAction())
    });
    
    export default connect(mapStateToProps, mapDispatchToProps)(PdvPage);
    