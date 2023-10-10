import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  forwardRef,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import "ag-grid-enterprise/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-enterprise/styles/ag-theme-alpine.css"; // Optional theme CSS
import { ColDef } from "ag-grid-enterprise";
import ButtonForGrid from "src/component/Grid/ButtonForGrid";
import CheckBoxForGrid from "src/component/Grid/CheckBoxForGrid";
import DatePickerForGrid from "src/component/Grid/DatePickerForGrid";
import ImageForGrid from "src/component/Grid/ImageForGrid";
import SelectBoxForGrid from "src/component/Grid/SelectBoxForGrid";

const CMMGrid = forwardRef<any, any>((props, ref) => {
  // const gridRef = props.ref;
  const gridStyle = useMemo(() => ({ height: 676, width: "100%" }), []);

  const components = useMemo(() => {
    return {
      buttonrenderer: ButtonForGrid,
      checkboxrenderer: CheckBoxForGrid,
      datepickerrenderer: DatePickerForGrid,
      imagerenderer: ImageForGrid,
      selectboxrenderer: SelectBoxForGrid,
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <div>
      <div style={gridStyle} className="ag-theme-alpine">
        <AgGridReact
          {...props}
          ref={ref}
          components={components}
          stopEditingWhenCellsLoseFocus={true}
        />
      </div>
    </div>
  );
});

export default CMMGrid;
