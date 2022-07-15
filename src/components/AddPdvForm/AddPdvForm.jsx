import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileImport, faAdd, faUser} from "@fortawesome/free-solid-svg-icons";
import React, { useState,useEffect } from 'react'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addPdvAction, addPdvResponseAction, errorAction } from './../../store/reducers/pdv/pdv.actions';
import { selectPdvErrors, selectPdvResponses } from '../../store/reducers/pdv/pdv.selector';


function AddPdvForm({addPdv,errors,resetResponse,response}) {





     const [phoneNumber,setPhoneNumber]= useState();
     const [companyName,setCompanyName]= useState("");
     const [regime,setRegime]= useState("SIMPLIFIE");
     const [niu,setNiu]= useState("");
     const [isOpen, setIsOpen]= useState(false);
     const [submit, setSubmitted]= useState(false);

     useEffect(() => {
      //  checkResponseStatus();
     },)

     const checkResponseStatus = (response) => {
         if(response.status === 200) {
            console.log("HELLO")
            setIsOpen(false);
         }
       }

    const hanleOpenClick= () =>{
        setIsOpen(true)
    }
     
     
    const handleSubmit =(e) =>{
        e.preventDefault();
        const pdv= {
            "companyName": companyName,
            "niu": niu,
            "regime": regime,
            "phoneNumber": phoneNumber
          }
        setSubmitted(true);
         addPdv(pdv)
         .then( res=>{
            checkResponseStatus(res) 
            if(res.status===200){
               
                resetResponse(null)
                setPhoneNumber()
                setNiu("")
                setCompanyName("")
            }
            setSubmitted(false)
         })
         .catch(err=>{

         })

        
         
    }

    const handleCLoseClick = (e) => {
        setIsOpen(false);
        resetResponse(null)
        setPhoneNumber()
        setNiu("")
        setCompanyName("")
    }
   
     
  return (
     <> 
     <button 
     onClick={hanleOpenClick}
     type="button" className="btn btn-primary d-flex justify-content-between" >
     <div><FontAwesomeIcon icon={faAdd}/></div> <div className="mx-2">Ajouter un pdv</div> 
</button>

<div className={`${isOpen ? "modal fade show":"modal fade "}`} id="modalForm"
style={{display: `${isOpen ? "block" : "none"}`}}
 tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
            {/* <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Bootstrap 5 Modal Form</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div> */}
            <div  className="modal-body">
                <form onSubmit={(e)=>handleSubmit(e)} className="needs-validation" noValidate>
                <div className="mb-3 row">
                        <label htmlFor="phoneNumber" className="col-sm-2 col-form-label is-required">Numéro</label>
                        <div className="col-sm-10">
                        <input 
                        type="number"
                         className={`form-control`}
                          id="phoneNumber"
                            onChange={(e)=> setPhoneNumber(e.target.value)}
                           value={phoneNumber}/>
                           <div className="invalid-feedback">Example invalid feedback text</div>
                        </div>
                      
                       
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="companyname" className="col-sm-2 col-form-label is-required">Raison sociale</label>
                        <div className="col-sm-10">
                        <input 
                        type="text" 
                        className={`form-control ${errors !=null && errors.CompanyName !=null ? "is-invalid" :""}`}
                        value={companyName}
                        onChange={(e)=> setCompanyName(e.target.value)}
                        required
                        id="companyname"/>
                        <div className="invalid-feedback">{ errors !=null && errors.CompanyName!=null ?errors.CompanyName[0]:""}</div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="niu" className="col-sm-2 col-form-label">NIU</label>
                        <div className="col-sm-10">
                        <input 
                        type="text"
                         className={`form-control ${errors !=null && errors.NIU !=null ? "is-invalid" :""}`}
                         value={niu}
                         onChange={(e)=> setNiu(e.target.value)}
                         id="niu"/>
                         <div className="invalid-feedback">{errors !=null && errors.NIU !=null? errors.NIU[0]:""}</div>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="regime" className='col-sm-2 col-form-label'>Régime</label>
                         <div className="col-sm-10">
                         <select 
                         className="form-select  mb-3" 
                         onChange={(e)=> setRegime(e.target.value)}
                         defaultValue="SIMPLIFIE"
                         aria-label=".form-select-lg example">
                        <option 
                      
                        value="SIMPLIFIE">SIMPLIFIE</option>
                        <option value="LIBERATOIRE">LIBERATOIRE</option>
                        <option value="REEL">REEL</option>
                        <option value="NON IDENTIFIE">NON IDENTIFIE</option>
                    </select>
                            </div>   
                    </div>
                    <div className="modal-footer">
                        <button 
                        
                        onClick={handleCLoseClick} type="button"  className="btn btn-secondary" >Fermer</button>
                        <button type="submit" className="btn btn-warning float-end">{ submit ? <div class="text-center">
                            <div class="spinner-border spinner-border-sm" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>
                            </div>:"Enregistrer"
                        }</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
     </>
  )
}



const mapStateToProps = createStructuredSelector({
    //  authenticated: selectUserAuthentication,
    //  currentUser: selectUserKeycloak
     errors: selectPdvErrors,
    response: selectPdvResponses
        
    });
    
    const mapDispatchToProps = (dispatch) => ({
      addPdv: (__pdv)=> dispatch(addPdvAction(__pdv)),
       resetResponse: (res)=> dispatch(addPdvResponseAction(res)),
    });
    
    export default connect(mapStateToProps, mapDispatchToProps)(AddPdvForm);
