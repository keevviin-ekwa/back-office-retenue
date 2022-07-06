import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Create from './components/Collapse/collapse-component';
import DashBoardPage from './pages/dashboard-page';
import FilePage from './pages/filepage';
import PdvPage from './pages/pdv-page';
import UserPage from './pages/userpage';
import { store, persistor } from "./store"
import ConfigurationPage from './pages/configurationpage';




const root = ReactDOM.createRoot(
    document.getElementById('root') 
  );
 
root.render(
     
     
      <Provider store={store}>
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route path="admin-dashboard" element={<DashBoardPage />} />
                    <Route path="admin-pdv" element={<PdvPage />} />
                    <Route path="admin-user" element={<UserPage />} />
                    <Route path="admin-file" element={<FilePage />} />
                    <Route path="admin-configuration" element={<ConfigurationPage />} />
                    <Route path="create-user" element={<Create/>}/>
                </Route>
            </Routes>
    </BrowserRouter>

      </Provider>    

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

