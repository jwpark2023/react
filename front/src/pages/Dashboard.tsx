import React, {
  useState,
  useEffect,
  useCallback,
  useMemo
} from "react";

import { ColDef, ColumnApi } from "ag-grid-community";
import dayjs from 'dayjs';
import { Button } from "antd";

const CMMGrid = React.lazy(() => import("src/component/Grid/CMMGrid"));

const Dashboard = () => {
  interface ICode {
    chk: any;
    year: string;
    date: string;
    total: string;
  }

  const [rowData, setrowData] = useState<any>([]); 
  const [allFlag, setallFlage] = useState<any>([]);

  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/small-olympic-winners.json')
      .then((resp) => resp.json())
      .then((data) => {
        // console.log(data);
        setrowData(data);
        
      });
  }, []);

  useEffect(() => {
    // console.log(allFlag);

    if(allFlag)
    {

    }

  }, [allFlag]);

  const [columnDefs, setColumnDefs] = useState<ColDef<ICode>[]>([
    { 
      field: "chk" , 
      cellRenderer : 'checkboxrenderer',
      // headerCheckboxSelection : true,
      // checkboxSelection : true,
      headerComponent : 'checkboxrenderer',
      headerComponentParams : {
        setallFlage : setallFlage
      }
    },
    { field: "year", 
      minWidth: 50,
      filter: 'agNumberColumnFilter',
      // cellRenderer : 'imagerenderer',
      // cellRendererParams : {
      //   src : "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
      // }
    },
    {
      field: 'date',
      minWidth: 200,
      cellRenderer : 'datepickerrenderer',
      cellRendererParams: {
        range : false,
        defaultValue: dayjs('2015/01/01', 'YYYY/MM/DD'),
        format : 'YYYY/MM/DD'
      },
      filter: 'agDateColumnFilter',
      // filterParams: 'filterParams',
    },
    { 
      field: "total", 
      minWidth: 175 , 
      cellRenderer : 'buttonrenderer', 
      cellRendererParams: {
        test: 'guinnessBlack',
        clicked: function(field: any) {
          
        }
      }
    }
  ]);

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
      floatingFilter: true,
      resizable: true,
    };
  }, []);

  const click = () => {
    console.log(rowData);
  }

  return (
    // <>{JSON.stringify(rowdatas)}</>
    <div>
      {/* <div>
        <Button onClick={click}>test</Button>
      </div> */}
      <div>
        <CMMGrid  rowData={rowData} columnDefs={columnDefs} onGridReady={onGridReady} cellClickedListener={cellClickedListener} defaultColDef={defaultColDef} />
      </div>
    </div>
  );
};

export default Dashboard;
