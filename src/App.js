import './App.css';
import HomePage from './pages/homepage';
import { connect } from 'react-redux';
import { requestAuthenticationAsync } from "./store/reducers/user/user.actions";
import { createStructuredSelector } from 'reselect';
import { selectUserKeycloak,selectUserAuthentication } from './store/reducers/user/user.selectors';
import { useEffect } from 'react';


function App({authenticated,requestAuthenticationAsync}) {
  useEffect(() => {
   
    requestAuthenticationAsync();
  }, [requestAuthenticationAsync]);
  return (
    <div className="App">
      {
        authenticated === true ? <HomePage/> :null
      }
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  authenticated: selectUserAuthentication,
  currentUser: selectUserKeycloak
});

const mapDispatchToProps = (dispatch) => ({
  requestAuthenticationAsync: () => dispatch(requestAuthenticationAsync())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
