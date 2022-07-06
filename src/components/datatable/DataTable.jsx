import React, {useEffect} from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import PdvModel from '../../Models/pdv.model';

export default function DataTable({pdv}) {



  const [datatable, setDatatable] = React.useState({
    columns: [
      {
        label: 'Numéro',
        field: 'Numéro',
        width: 150,
        attributes: {
          'aria-controls': 'DataTable',
          'aria-label': 'Name',
        },
      },
      {
        label: 'Raison sociale',
        field: 'Raison_sociale',
        width: 270,
      },
      {
        label: 'NIU',
        field: 'NIU',
        width: 200,
      },
      {
        label: 'Régime',
        field: 'Régime',
        sort: 'asc',
        width: 100,
      },
     
    ],
    rows: []
  });
  useEffect(() => {
    
    builRow();
 
  },[])

  const builRow =()=>{
    var rows = [];
    pdv.data.map((item,index)=>{
        
        rows.push({"Raison_sociale":item.companyName,"NIU":item.niu,"Régime":item.regime,"Numéro":item.phoneNumber});
    })
    setDatatable({columns:datatable.columns,rows:rows});
    
  }
  

  return <MDBDataTableV5 
  hover entriesOptions={[5, 10, 20, 30, 40, 50]}
   entries={5} 
   pagesAmount={4} 
   data={datatable} 
   
   searchTop 
   searchBottom={false} />;
}
