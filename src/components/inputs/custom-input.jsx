import React, {useState} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { importPdvAction } from '../../store/reducers/pdv/pdv.actions';
import { updateSignatureAction } from '../../store/reducers/Signature/signature.actions';

function CustomInput({importPdv}) {
    const [submitted,setSubmitted]= useState(false)
    const [selectedFile,setSelectedFile]= useState(null)

    function  uploadFile(){
        const formData = new FormData();
       

        formData.append( 
            "file", 
           selectedFile,
          
          )
         //console.log(selectedFile)
         importPdv(selectedFile)
         
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
        console.log(selectedFile)
        
    }

    return (
        <div className="input-group">
            <input type="file" className="form-control" id="inputGroupFile04" required
            onChange={(e)=>onFileChange(e)} 
                   aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
            <button
                onClick={uploadFile}
                className="btn btn-secondary" type="button"
                    id="inputGroupFileAddon04">
                {submitted? <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>: "Importer"}
            </button>
        </div>
    );
}


const mapStateToProps = createStructuredSelector({
    //  authenticated: selectUserAuthentication,
    //  currentUser: selectUserKeycloak
       
    });
    
    const mapDispatchToProps = (dispatch) => ({
      importPdv: (file) => dispatch(importPdvAction(file)),
      
    });

export default connect(mapStateToProps, mapDispatchToProps)(CustomInput);