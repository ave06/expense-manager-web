import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';


const Dashboard = () => {
    const rowData = [
        {make:'Ford' , model:"Focus", price:400},
        {make:'Toyota' , model:"Celica", price:400},
        {make:'BMW' , model:"$ serise", price:400}
    ];

    const columnDefs = [
        {field: 'make'},
        {field: 'model'},
        {field: 'price'}
    ];
  return (
    <div  style={{ width:500 }}>
      <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      <p>gffjhj</p>
    </div>
  );
};

export default Dashboard;
