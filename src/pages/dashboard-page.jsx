import React, {useEffect} from 'react';
import DashboardCard from "../components/dashbord-card/dashboard-card-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileInvoice, faShop, faUser} from "@fortawesome/free-solid-svg-icons";
import DataTable from '../components/datatable/DataTable';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getAllSignaturesAction } from '../store/reducers/Signature/signature.actions';


function DashBoardPage () {
        

        return (
            <div>
                <div
                    className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">Tableau de bord</h1>
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

                <div className="row">
                    <div className="col-md-3 col-sm-12"><DashboardCard value={1500} title={"PDV"}>{<FontAwesomeIcon icon={faUser}/>}</DashboardCard></div>
                    <div className="col-md-3 col-sm-12"><DashboardCard value={1500} title={"Autres uitilisateurs"} >{<FontAwesomeIcon icon={faShop}/>}</DashboardCard></div>
                    <div className="col-md-3 col-sm-12"><DashboardCard value={1500} title={"PDV"}>{<FontAwesomeIcon icon={faShop}/>}</DashboardCard></div>
                    <div className="col-md-3 col-sm-12 "><DashboardCard value={1500} title={"PDV"}>{<FontAwesomeIcon icon={faFileInvoice}/>}</DashboardCard></div>
                </div>

                <div className="row mt-5 mb-5">
                    <div className="col-md-5 card mx-2 ">
                    {/* <DataTable/> */}
                    </div>

                    <div className="col-md-5 card mx-2">
                    {/* <DataTable/> */}
                    </div>

                </div>

            </div>
        );
    }


const mapStateToProps = createStructuredSelector({
    //  authenticated: selectUserAuthentication,
    //  currentUser: selectUserKeycloak
     
    });
    
    const mapDispatchToProps = (dispatch) => ({
    
    });
    
    export default connect(mapStateToProps, mapDispatchToProps)(DashBoardPage);
    