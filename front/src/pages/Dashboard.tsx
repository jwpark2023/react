import React, {
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";

import { ColDef } from "ag-grid-community";
import dayjs from 'dayjs';

const Grid = React.lazy(() => import("src/component/Grid/Grid"));

const Dashboard = () => {
  interface ICode {
    chk: any;
    year: string;
    date: string;
    total: string;
  }

  const [rowData, setrowData] = useState<any>([]); 

//   const [columnDefs, setColumnDefs] = useState([
//     { field: 'athlete' },
//     { field: 'sport' },
//     { field: 'age' },
// ]);
  const [columnDefs, setColumnDefs] = useState<ColDef<ICode>[]>([
    { field: "chk" , 
      cellRenderer : 'checkboxrenderer',
    },
    { field: "year", 
      minWidth: 50
      // filter: 'agNumberColumnFilter' 
    },
    {
      field: 'date',
      minWidth: 200,
      cellRenderer : 'datepickerrenderer',
      cellRendererParams: {
        range : false,
        defaultValue: dayjs('2015/01/01', 'YYYY/MM/DD'),
        format : 'YYYY/MM/DD'
      }
      // filter: 'agDateColumnFilter',
      // filterParams: 'filterParams',
    },
    { field: "total", 
      minWidth: 175 , 
      cellRenderer : 'buttonrenderer', 
      cellRendererParams: {
        test: 'guinnessBlack',
        clicked: function(field: any) {
          
        }
      }
    }
  ]);


  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setrowData(data);
        
      });
  }, []);

  const onGridReady = useCallback((params) => {
   
  }, []);

  const cellClickedListener = useCallback((event) => {
    
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      sortable: true,
      flex: 1,
      // minWidth: 100,
      // filter: true,
      // floatingFilter: true,
      resizable: true,
    };
  }, []);

  return (
    // <>{JSON.stringify(rowdatas)}</>
    <Grid  rowData={rowData} columnDefs={columnDefs} onGridReady={onGridReady} cellClickedListener={cellClickedListener} defaultColDef={defaultColDef} />

  );
};

export default Dashboard;
