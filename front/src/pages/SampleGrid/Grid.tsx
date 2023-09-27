import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { ColDef, RowNode } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import CMMGrid from "src/component/Grid/CMMGrid";
import { request } from "src/utils/axios";

import { Button, Checkbox, Form } from "antd";
import dayjs from "dayjs";

const dateFormat = "YYYY-MM-DD";

const defaultRow = {
  CODE_CD: "",
  CODE_NM: "",
  CODE_LVL: 1,
  P_CODE_CD: null,
  DSP_ORDER: null,
  USE_YN: null,
  EXP_FR_DT: "2001-01-01",
  EXP_TO_DT: "9999-01-01",
  ATTR1_JSON: null,
  ATTR1_VAL: null,
  ATTR2_JSON: null,
  ATTR2_VAL: null,
  ATTR3_JSON: null,
  ATTR3_VAL: null,
  ATTR4_JSON: null,
  ATTR4_VAL: null,
  ATTR5_JSON: null,
  ATTR5_VAL: null,
  ATTR6_JSON: null,
  ATTR6_VAL: null,
  ATTR7_JSON: null,
  ATTR7_VAL: null,
  ATTR8_JSON: null,
  ATTR8_VAL: null,
  ATTR9_JSON: null,
  ATTR9_VAL: null,
  ATTR10_JSON: null,
  ATTR10_VAL: null,
};

const Grid = forwardRef<any, any>((props, ref) => {
  const {
    refTree,
    refSearch,
    messageApi,
    setModalTitle,
    setModalOpen,
    refSelectedNode,
  } = props;
  const gridRef = useRef<AgGridReact<any>>(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        updateColDef: updateColDef,
        getCodelist: getCodelist,
      };
    },
    []
  );

  const crudStyle = (params) => {
    if (params.value === "U") {
      return { color: "orange", backgroundColor: "orange" };
    } else if (params.value === "C") {
      return { color: "blue", backgroundColor: "blue" };
    } else if (params.value === "D") {
      return { color: "red", backgroundColor: "red" };
    }
  };

  const valueDisplayFormatter = (params) => {
    let name = params.value ? JSON.parse(params.value).name : undefined;
    return name;
  };
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      editable: true,
      resizable: true,
      flex: 1,
      suppressSizeToFit: false,
    }),
    []
  );

  const [columnDefs, setColumnDefs] = useState<ColDef<any>[]>([
    {
      field: "CRUD_FLAG",
      headerName: "",
      maxWidth: 5,
      cellStyle: crudStyle,
      resizable: false,
    },
    {
      field: "P_CODE_NM",
      headerName: "분류",
      minWidth: 120,
      rowDrag: true,
    },
    { field: "CODE_CD", headerName: "코드", minWidth: 120, flex: 1 },
    { field: "CODE_NM", headerName: "코드명", minWidth: 120, flex: 1 },
    { field: "CODE_LVL", hide: true },
    { field: "P_CODE_CD", hide: true },
    { field: "DSP_ORDER", headerName: "", hide: true },
    {
      field: "USE_YN",
      headerName: "사용",
      minWidth: 60,
      maxWidth: 60,
      cellRenderer: "checkboxrenderer",
    },
    { field: "ATTR1_VAL", headerName: "속성1", minWidth: 80 },
    { field: "ATTR2_VAL", headerName: "속성2", minWidth: 80 },
    { field: "ATTR3_VAL", headerName: "속성3", minWidth: 80 },
    { field: "ATTR4_VAL", headerName: "속성4", minWidth: 80 },
    { field: "ATTR5_VAL", headerName: "속성5", minWidth: 80 },
    { field: "ATTR6_VAL", headerName: "속성6", minWidth: 80 },
    { field: "ATTR7_VAL", headerName: "속성7", minWidth: 80 },
    { field: "ATTR8_VAL", headerName: "속성8", minWidth: 80 },
    { field: "ATTR9_VAL", headerName: "속성9", minWidth: 80 },
    { field: "ATTR10_VAL", headerName: "속성10", minWidth: 80 },
    {
      field: "PERIOD",
      headerName: "기간",
      minWidth: 270,
      cellRenderer: "datepickerrenderer",
      cellRendererParams: { range: true, format: "YYYY-MM-DD" },
    },
    {
      field: "ATTR1_JSON",
      headerName: "속성1 명",
      minWidth: 80,
      hide: true,
      valueFormatter: valueDisplayFormatter,
    },
    {
      field: "ATTR2_JSON",
      headerName: "속성2 명",
      minWidth: 80,
      hide: true,
      valueFormatter: valueDisplayFormatter,
    },
    {
      field: "ATTR3_JSON",
      headerName: "속성3 명",
      minWidth: 80,
      hide: true,
      valueFormatter: valueDisplayFormatter,
    },
    {
      field: "ATTR4_JSON",
      headerName: "속성4 명",
      minWidth: 80,
      hide: true,
      valueFormatter: valueDisplayFormatter,
    },
    {
      field: "ATTR5_JSON",
      headerName: "속성5 명",
      minWidth: 80,
      hide: true,
      valueFormatter: valueDisplayFormatter,
    },
    {
      field: "ATTR6_JSON",
      headerName: "속성6 명",
      minWidth: 80,
      hide: true,
      valueFormatter: valueDisplayFormatter,
    },
    {
      field: "ATTR7_JSON",
      headerName: "속성7 명",
      minWidth: 80,
      hide: true,
      valueFormatter: valueDisplayFormatter,
    },
    {
      field: "ATTR8_JSON",
      headerName: "속성8 명",
      minWidth: 80,
      hide: true,
      valueFormatter: valueDisplayFormatter,
    },
    {
      field: "ATTR9_JSON",
      headerName: "속성9 명",
      minWidth: 80,
      hide: true,
      valueFormatter: valueDisplayFormatter,
    },
    {
      field: "ATTR10_JSON",
      headerName: "속성10 명",
      minWidth: 80,
      hide: true,
      valueFormatter: valueDisplayFormatter,
    },
    {
      maxWidth: 50,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
  ]);

  // Form
  const [form] = Form.useForm();

  // Example of consuming Grid Event
  const cellClickedListener = (e) => {
    console.log(e.column.colId);
    console.log(e.column);
    console.log(e);
    if (e.column.colId.includes("ATTR")) {
      if (e.value != undefined) {
        console.log(JSON.parse(e.value));
      }
      let title =
        "(" +
        e.data.P_CODE_NM +
        "_" +
        e.data.CODE_NM +
        ")" +
        " : " +
        e.column.colId;
      setModalTitle(title);
      setModalOpen(true);
    }
  };

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    console.log("버튼:", e);
  }, []);

  const handleBtnAdd = (e) => {
    console.log("refSelectedNode:", refSelectedNode);
    if (refSelectedNode?.current == undefined) {
      messageApi.open({
        type: "warn",
        content: "상위 분류를 선택하세요.",
      });
      return;
    }

    const renderedNodes = gridRef.current?.api.getRenderedNodes() || [];

    let nextSeq =
      renderedNodes.length == 0
        ? 1
        : Math.max.apply(
            null,
            renderedNodes.map((node) => {
              let seq = Number(
                node.data.CODE_CD.replace(node.data.P_CODE_CD, "")
              );

              console.log(
                "seq:",
                seq,
                node.data.CODE_CD.replace(node.data.P_CODE_CD, ""),
                Number(node.data.CODE_CD.replace(node.data.P_CODE_CD, ""))
              );
              seq = Number.isNaN(seq) ? 0 : seq;
              return seq;
            })
          ) + 1;

    const rowCnt = renderedNodes.length || 0;

    gridRef.current?.api.applyTransactionAsync(
      {
        addIndex: rowCnt,
        add: [
          {
            ...defaultRow,
            CRUD_FLAG: "C",
            CODE_CD:
              refSelectedNode?.current.CODE_CD +
              nextSeq.toString().padStart(2, "0"),
            P_CODE_CD: refSelectedNode?.current.key,
            P_CODE_NM: refSelectedNode?.current.title,
            PERIOD: [dayjs().format(dateFormat), "9999-12-31"],
            DSP_ORDER: rowCnt + 1,
          },
        ],
      },
      (e) =>
        gridRef.current?.api.startEditingCell({
          rowIndex: rowCnt,
          colKey: "CODE_NM",
        })
    );
  };

  const handleBtnDelete = (e) => {
    gridRef.current?.api.forEachNode((node) => {
      if (node?.isSelected()) {
        if (gridRef.current?.api.getValue("CRUD_FLAG", node) != "C") {
          messageApi.open({
            type: "warn",
            content: "저장된 행은 삭제 할 수 없습니다.",
          });
          return;
        }
        node.setDataValue("CRUD_FLAG", "D");
      }
    });
  };

  const handleBtnSave = (e) => {
    let data: any[] = [];
    gridRef.current?.api.forEachNode((node) => {
      if (["C", "U", "D"].includes(node?.data.CRUD_FLAG)) {
        node.data.EXP_FR_DT = node.data.PERIOD[0];
        node.data.EXP_TO_DT = node.data.PERIOD[1];
        data.push(node?.data);
      }
    });

    request("post", "/sample/saveCodeList", data).then((result) => {
      if (result.code != "S0000001") {
        messageApi.open({
          type: "error",
          content: "저장에 실패하였습니다.",
        });
      }
      refTree.current.renderTreeData();
      refSearch.current?.searchCodelist();
    });
  };

  const updateColDef = (node) => {
    let colDefs: ColDef<any>[] = gridRef.current?.api.getColumnDefs() || [];

    let regExAttrVal = /^ATTR([0-9]{1,2})_VAL$/;
    colDefs.forEach((colDef, index) => {
      const colId = colDef.colId || "";
      if (regExAttrVal.test(colId)) {
        colDef.hide = true;
        colDef.cellRenderer = undefined;

        const colHeaderInfo = node[colId.replace("_VAL", "_JSON")];

        if (colHeaderInfo) {
          colDef.hide = false;
          const hInfo = JSON.parse(colHeaderInfo);
          colDef.headerName = hInfo.name;

          switch (hInfo.type) {
            case "Checkbox":
              colDef.cellRenderer = "checkboxrenderer";
              break;
            case "Select":
              colDef.cellRenderer = "selectboxrenderer";
              break;
            case "Date":
              colDef.cellRenderer = "datepickerrenderer";
              break;
            case "Period":
              colDef.width = 300;
              colDef.cellRenderer = "datepickerrenderer";
              colDef.cellRendererParams = {
                range: true,
                format: "YYYY-MM-DD",
              };
              break;
            case "Image":
              colDef.cellRenderer = "imagerenderer";
              break;
            default:
              break;
          }
        }
      }
    });

    setColumnDefs(colDefs);
  };

  const getCodelist = (params: any) => {
    console.log("selectedNode:", refSelectedNode?.current);
    if (refSelectedNode?.current) {
      params = { ...params, P_CODE_CD: refSelectedNode?.current.CODE_CD };
    }

    request("post", "/sample/codeList", params).then((result) => {
      if (result.code != "S0000001" || result.dataSet.length < 1) {
        messageApi.open({
          type: "error",
          content: "조회된 정보가 없습니다.",
        });
        gridRef.current?.api.setRowData([]);
        return;
      }

      if (result.dataSet.length > 0) {
        let convData = result.dataSet.map(
          (data) =>
            (data = { ...data, PERIOD: [data.EXP_FR_DT, data.EXP_TO_DT] })
        );
        gridRef.current?.api.setRowData(convData);
      }
    });
  };

  const onCellValueChanged = (e) => {
    if (!["C", "D"].includes(e.node.data.CRUD_FLAG)) {
      e.node.setDataValue("CRUD_FLAG", "U");
    }
  };

  const handleChkAttrNm = (e) => {
    let colDefs: ColDef<any>[] = gridRef.current?.api.getColumnDefs() || [];

    let regExAttrVal = /^ATTR([0-9]{1,2})_JSON$/;

    colDefs.forEach((colDef) => {
      const colId = colDef.colId || "";
      if (regExAttrVal.test(colId)) {
        colDef.hide = !e.target.checked;
      }
    });
    setColumnDefs(colDefs);
  };

  const handleRowDragEnd = (e) => {
    gridRef.current?.api.forEachNode((node) => {
      let newOrder = (node.rowIndex || 0) + 1;
      console.log("node", newOrder, node.data.DSP_ORDER, node);
      if (newOrder != node.data.DSP_ORDER) {
        node.setDataValue("CRUD_FLAG", "U");
        node.setDataValue("DSP_ORDER", node.rowIndex || 0 + 1);
      }
    });
  };

  return (
    <div style={{ height: 700, width: "100%" }}>
      <div style={{ display: "flex" }}>
        <Checkbox
          style={{ paddingLeft: 1, width: "20%" }}
          onChange={handleChkAttrNm}
        >
          속성명 표시
        </Checkbox>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "80%",
          }}
        >
          <Button size={"small"} style={{ width: 90 }} onClick={buttonListener}>
            엑셀 업로드
          </Button>
          <Button size={"small"} style={{ width: 90 }} onClick={buttonListener}>
            엑셀 다운로드
          </Button>
          <Button size={"small"} style={{ width: 60 }} onClick={handleBtnAdd}>
            추가
          </Button>
          <Button
            size={"small"}
            style={{ width: 60 }}
            onClick={handleBtnDelete}
          >
            삭제
          </Button>
          <Button size={"small"} style={{ width: 60 }} onClick={handleBtnSave}>
            저장
          </Button>
        </div>
      </div>
      <div className="ag-theme-alpine" style={{ width: "100%", height: 676 }}>
        <CMMGrid
          ref={gridRef} // Ref for accessing Grid's API
          // rowData={rowData} // Row Data for Rows
          rowSelection="multiple"
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          getRowClass={(params) => {
            return params.data.CRUD_FLAG == "D" ? "cancled-row" : null;
          }}
          rowDragManaged={true}
          suppressRowClickSelection={true}
          onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          onCellValueChanged={onCellValueChanged}
          onRowDragEnd={handleRowDragEnd}
        />
      </div>
    </div>
  );
});

export default Grid;
