import React,{useEffect} from 'react'
import './dashboard-component.css'
import DashboardCard from "../../components/dashbord-card/dashboard-card-component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faShop } from '@fortawesome/free-solid-svg-icons'
import { faFileInvoice } from '@fortawesome/free-solid-svg-icons'

import DashBoardPage from "../dashboard-page";
import {Link, Outlet} from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectUserRoles } from '../../store/reducers/user/user.selectors';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function Dashboard({pdv,userRole}) {
     
    useEffect(() =>{
        console.log("role",userRole[0]);
    })

    return (
        <div>
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Orange Cameroun</a>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="w-100"></div>
                <div className="navbar-nav">
                    <div className="nav-item text-nowrap">
                        <a className="nav-link px-3 btn btn-primary" href="#">Déconnexion</a>
                    </div>
                </div>
            </header>

            <div className="container-fluid">
                <div className="row">
                <ToastContainer/>
                    <nav id="sidebarMenu" className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
                        <div className="position-sticky pt-3">
                            <ul className="nav flex-column">
                                
                                   
                                    <li className="nav-item custom-border">
                                    <Link to="/admin-dashboard" className="nav-link active " aria-current="page"  style={{color:"white"}}>
                                        <span data-feather="home"></span>
                                        Tableau de bord
                                    </Link>
                                </li>
                      
                                {
                                    userRole[0]=="ADMINISTRATEUR" && 
                                    <li className="nav-item">
                                    <Link to="/admin-pdv" className="nav-link">
                                        <span data-feather="file"></span>
                                        PDV
                                    </Link>
                                </li>
                                }
                                {
                                    userRole[0]=="ADMINISTRATEUR" &&
                                    <li className="nav-item">
                                    <Link to="/admin-user" className="nav-link" >
                                        <span data-feather="shopping-cart"></span>
                                        Autres utilisateurs
                                    </Link>
                                </li>
                                
                                }
                                
                                <li className="nav-item">
                                    <Link to="admin-configuration" className="nav-link">
                                        <span data-feather="bar-chart-2"></span>
                                        Configurations
                                    </Link>
                                </li>

                            </ul>

                        </div>
                    </nav>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">

                        <Outlet/>

                    </main>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
      userRole: selectUserRoles
      
    });
    
    const mapDispatchToProps = (dispatch) => ({
     
    });
    
    export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
    