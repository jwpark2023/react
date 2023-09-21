import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  forwardRef
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ColDef } from "ag-grid-community";
import ButtonForGrid from "src/component/Grid/ButtonForGrid";
import CheckBoxForGrid from "src/component/Grid/CheckBoxForGrid";
import DatePickerForGrid from "src/component/Grid/DatePickerForGrid";
import ImageForGrid from "src/component/Grid/ImageForGrid";


const CMMGrid = forwardRef<any, any>((props, ref) => {

  // const gridRef = props.ref;
  const gridStyle = useMemo(() => ({ height: 676, width: "100%" }), []);

  const components = useMemo(() => {
    return {
      buttonrenderer : ButtonForGrid,
      checkboxrenderer : CheckBoxForGrid,
      datepickerrenderer : DatePickerForGrid,
      imagerenderer : ImageForGrid
    };
  }, []);

  useEffect(() => {

  }, []);


  return (
    <div>
      <div style={gridStyle} className="ag-theme-alpine">
         <AgGridReact
          ref={ref}
          // rowData={props.rowData}
          columnDefs={props.columnDefs}
          defaultColDef={props.defaultColDef}
          onGridReady={props.onGridReady}    
          isRowSelectable={props.isRowSelectable}
          components={components}
          animateRows= {props.animateRows}
          onCellClicked={props.onCellClicked} 
          onCellValueChanged={props.onCellValueChanged}
        />
      </div>
    </div>
  );
});

export default CMMGrid;
