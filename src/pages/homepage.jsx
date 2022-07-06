import React , { useEffect } from 'react'
import Dashboard from './Dashboard/dashboard-component'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAllSignaturesAction } from '../store/reducers/Signature/signature.actions';



function HomePage({getAllSignatures}) {

  useEffect(() => {
    setTimeout(() => {
      getAllSignatures()
    }, 500);
  })

  return (
    <div>
        <Dashboard />
    </div>
  )
}


const mapStateToProps = createStructuredSelector({
  //  authenticated: selectUserAuthentication,
  //  currentUser: selectUserKeycloak
   
  });
  
  const mapDispatchToProps = (dispatch) => ({
      getAllSignatures: ()=>dispatch(getAllSignaturesAction())
  });
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
