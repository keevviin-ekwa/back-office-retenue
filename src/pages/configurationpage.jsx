import React,{useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { deleteSignatureAction, getAllSignaturesAction, updateSignatureAction } from '../store/reducers/Signature/signature.actions';
import { selectUserRoles } from '../store/reducers/user/user.selectors';
import { selectAllSignatures } from './../store/reducers/Signature/signature.selectors';
import { selectUserKeycloak } from './../store/reducers/user/user.selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTrashCan, faAdd, faPenToSquare} from "@fortawesome/free-solid-svg-icons";

function ConfigurationPage({getAllSignatures, allSignatures,userRole,user,deleteSignature,updateSignature}) {
        const [signatureExists, setSignatureExists] = useState(false)
        const [signatures,SetSignature]= useState(allSignatures)
        const [selectedFile,setSelectedFile]= useState(null)

    useEffect(() => {
      
        console.log("signatures",allSignatures)
        
        
        checkUserSignature()
        
        checkSignature()
      
    }, [allSignatures])

    const checkSignature = () => {
       if( signatures.length===1){
        setSignatureExists(true)
       }else{
        setSignatureExists(false)
       }


    }

     const handleClick = (id) => {
        console.log(id)
        deleteSignature(id);
     }

    const checkUserSignature= () => {
        //si l'utilisetur est un admin alors on renvoie toutes les signatures, sinon on ne renvoie que ceux du
        // signataire connecté
        if(userRole[0] !== "ADMINISTRATEUR")
        {
            var filter= allSignatures.filter(signature => signature.userCuid==user.tokenParsed.preferred_username)
            SetSignature(filter)
        }
        
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
        console.log("file", selectedFile)
        
    }


    
    function  uploadFile(id){
        const formData = new FormData();
       

        formData.append( 
            "file", 
           selectedFile,
          
          )
          console.log("formData", id);
          updateSignature(id,formData);
         
         
    }
    
        
    return (
        <div>
            <div
                className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Gestion des signatures</h1>
             
            </div>

            <div className="d-flex justify-content-between">
                {
                  userRole[0]==="ADMINISTRATEUR" || signatureExists ?"": <button type="button" className="btn btn-primary ">
                  <div><FontAwesomeIcon icon={faAdd}/></div> <div className="mx-2">Ajouter une signature</div> 
              </button>
                
                }
            </div>

            <div className="row mt-5 mb-5">
                <div className="col-md-12 card">
                <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Signature</th>
                            <th scope="col">Auteur</th>
                            <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        
                            {
                                

                                signatures.map((item,index)=>{
                                    return(
                                    <tr key={index}>
                                    <th scope="row">1</th>
                                    <td><img src={item.signaturePath} alt="Signature"/></td>
                                    <td>{item.userCuid}</td>
                                    <td>
                                    <div className="d-grid gap-2  d-md-block">
                                        <button
                                        data-bs-toggle="modal"
                                         data-bs-target={"#"+item.userCuid} 
                                         className="btn btn-icon btn-sm btn-primary mx-1"  
                                         type="button"><FontAwesomeIcon icon={faPenToSquare}/></button>

                                                        <div class="modal fade" id={item.userCuid} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                            <div class="modal-dialog">
                                                                <div class="modal-content">
                                                                <div class="modal-header">
                                                                    <button type="button" class="btn-close" data-bs-dismiss="modal"><span class="visually-hidden">Close</span></button>
                                                                </div>
                                                                <div class="modal-body">
                                                                <div class="mb-3 row">
                                                                    <label for="staticUser" class="col-sm-2 col-form-label">CUID</label>
                                                                    <div class="col-sm-10">
                                                                    <input type="text" readOnly class="form-control" id="staticUser" value={item.userCuid} />
                                                                </div>
                                                                </div>
                                                                <div class="mb-3 row">
                                                                <label for="staticUser" class="col-sm-2 col-form-label"></label>  
                                                                    <div className="col-sm-10">
                                                                        <input 
                                                                        
                                                                        onChange={(e)=>onFileChange(e)} 
                                                                        type="file"
                                                                         className="form-control" 
                                                                         id="formFile"/>
                                                                    </div>
                                                                </div>
                                                                <div class="mb-3  row ">
                                                                <label for="staticUser" class="col-sm-2 col-form-label"></label>
                                                                 <div className="col-sm-10 d-flex justify-content-start" ><img src={item.signaturePath} alt="image" className=''/></div>
                                                                </div>
                                                                
                                                                
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button 
                                                                       
                                                                       type="button" 
                                                                       class="btn btn-secondary" 
                                                                       data-bs-dismiss="modal">Annuler</button>
                                                                    <button
                                                                     onClick={(id)=>uploadFile(item.id)} 
                                                                     type="button" 
                                                                     class="btn btn-primary">Modifier</button>
                                                                </div>
                                                                </div>
                                                            </div>
                                                    </div>




                                        <button
                                          onClick={()=>handleClick(item.id)}
                                          className="btn btn-icon btn-sm btn-primary"
                                          type="button"><FontAwesomeIcon 
                                          icon={faTrashCan}/></button>
                                            
                                    </div>
                                    </td>
                                </tr>
                                    )
                                })
                              
                            }
                            
                            
                        </tbody>
                </table>
                </div>
                {/* modal start */}
                
                {/* modal end */}

            </div>

        </div>
    );
}
const mapStateToProps = createStructuredSelector({
        allSignatures: selectAllSignatures,
        userRole: selectUserRoles,
        user: selectUserKeycloak
    });
    
    const mapDispatchToProps = (dispatch) => ({
      deleteSignature: (id) => dispatch(deleteSignatureAction(id)),
      updateSignature: (id,signature) => dispatch(updateSignatureAction(id,signature))
    });
    
    export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationPage);
    