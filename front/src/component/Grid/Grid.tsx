import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ColDef } from "ag-grid-community";
import ButtonForGrid from "src/component/Grid/ButtonForGrid";
import CheckBoxForGrid from "src/component/Grid/CheckBoxForGrid";

import { request } from "src/utils/axios";


const Grid = ( props ) => {

  const gridStyle = useMemo(() => ({ height: 500, width: 1000 }), []);

  const components = useMemo(() => {
    return {
      buttonrenderer: ButtonForGrid,
      checkboxrenderer: CheckBoxForGrid,
    };
  }, []);

  useEffect(() => {

  }, []);


  return (
    <div>
      <div style={gridStyle} className="ag-theme-alpine">
         <AgGridReact
          rowData={props.rowdatas}
          columnDefs={props.columnDefs}
          defaultColDef={props.defaultColDef}
          onGridReady={props.onGridReady}    
          isRowSelectable={props.isRowSelectable}
          components={components}
          onCellClicked={props.cellClickedListener} 
        />
      </div>
    </div>
  );
};

export default Grid;
