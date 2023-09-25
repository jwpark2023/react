import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import CMMGrid from "src/component/Grid/CMMGrid";
import { request } from "src/utils/axios";

import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Typography,
  message,
  Select,
  TreeSelect,
} from "antd";
import dayjs from "dayjs";
import LeftTree from "./LeftTree";
import Search from "./Search";

const { Title } = Typography;

const defaultRow = {
  CODE_CD: "new",
  CODE_NM: "N001",
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

const SampleGrid = () => {
  const gridRef = useRef<AgGridReact<any>>(null);
  const refSearch = useRef<any>(null);
  const refTree = useRef<any>(null);

  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  // const [period, setPeriod] = useState();
  const [modalTitle, setModalTitle] = useState("");
  const [modalNameValue, setModalNameValue] = useState("");
  const [modalTypeValue, setModalTypeValue] = useState("");

  const { Option } = Select;

  const crudStyle = (params) => {
    if (params.value === "U") {
      return { color: "orange", backgroundColor: "orange" };
    } else if (params.value === "C") {
      return { color: "blue", backgroundColor: "blue" };
    } else if (params.value === "D") {
      return { color: "red", backgroundColor: "red" };
    }
  };

  const [columnDefs, setColumnDefs] = useState<ColDef<any>[]>([
    { field: "CRUD_FLAG", headerName: "", maxWidth: 20, cellStyle: crudStyle },
    { field: "P_CODE_NM", headerName: "분류", minWidth: 120 },
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
    { field: "ATTR1_JSON", headerName: "속성1 명", minWidth: 80, hide: true },
    { field: "ATTR2_JSON", headerName: "속성2 명", minWidth: 80, hide: true },
    { field: "ATTR3_JSON", headerName: "속성3 명", minWidth: 80, hide: true },
    { field: "ATTR4_JSON", headerName: "속성4 명", minWidth: 80, hide: true },
    { field: "ATTR5_JSON", headerName: "속성5 명", minWidth: 80, hide: true },
    { field: "ATTR6_JSON", headerName: "속성6 명", minWidth: 80, hide: true },
    { field: "ATTR7_JSON", headerName: "속성7 명", minWidth: 80, hide: true },
    { field: "ATTR8_JSON", headerName: "속성8 명", minWidth: 80, hide: true },
    { field: "ATTR9_JSON", headerName: "속성9 명", minWidth: 80, hide: true },
    { field: "ATTR10_JSON", headerName: "속성10 명", minWidth: 80, hide: true },
    {
      maxWidth: 50,
      headerCheckboxSelection: true,
      checkboxSelection: true,
    },
  ]);

  // DefaultColDef sets props common to all Columns
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

  // Form
  const [form] = Form.useForm();

  // Example of consuming Grid Event
  const cellClickedListener = (e) => {
    console.log(e.column.colId);
    console.log(e.column);
    console.log(e);
    if (e.column.colId.includes("ATTR")) {
      if (e.value != undefined) {
        let colValue = JSON.parse(e.value);

        setModalNameValue(colValue.name);
        setModalTypeValue(colValue.type);
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
    if (refTree.current.selectedKeys.length < 1) {
      message.warning("상위 분류를 선택하세요.");
      return;
    }
    gridRef.current?.api.applyTransaction({
      addIndex: 0,
      add: [
        {
          ...defaultRow,
          CRUD_FLAG: "C",
          P_CODE_CD: refTree.current.selectedNode?.key,
          P_CODE_NM: refTree.current.selectedNode?.title,
          PERIOD: [dayjs(), dayjs("9999-12-31", "YYYY-MM-DD")],
        },
      ],
    });
  };

  const handleBtnDelete = (e) => {
    console.log(gridRef.current);
    gridRef.current?.api.forEachNode((node) => {
      if (node?.isSelected()) {
        if (gridRef.current?.api.getValue("CRUD_FLAG", node) != "C") {
          message.warning("저장된 행은 삭제 할 수 없습니다.");
          return;
        }
        node.setDataValue("CRUD_FLAG", "D");
      }
    });

    // console.log(rowData);
  };

  const handleBtnSave = (e) => {
    let data: any[] = [];
    gridRef.current?.api.forEachNode((node) => {
      if (["C", "U", "D"].includes(node?.data.CRUD_FLAG)) {
        node.data.EXP_FR_DT = node.data.PERIOD[0].format("YYYY-MM-DD");
        node.data.EXP_TO_DT = node.data.PERIOD[1].format("YYYY-MM-DD");
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
      refTree.current.getTreeData();
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
    console.log("onCellValueChanged:", e);
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

  const handleOk = () => {
    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {contextHolder}
      <Title level={3} style={{ marginTop: 10 }}>
        공통코드 관리
      </Title>

      <Search ref={refSearch} getCodelist={getCodelist} />
      <div style={{ display: "flex", height: 700 }}>
        <LeftTree updateColDef={updateColDef} getCodelist={getCodelist} />
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
              <Button
                size={"small"}
                style={{ width: 90 }}
                onClick={buttonListener}
              >
                엑셀 업로드
              </Button>
              <Button
                size={"small"}
                style={{ width: 90 }}
                onClick={buttonListener}
              >
                엑셀 다운로드
              </Button>
              <Button
                size={"small"}
                style={{ width: 60 }}
                onClick={handleBtnAdd}
              >
                추가
              </Button>
              <Button
                size={"small"}
                style={{ width: 60 }}
                onClick={handleBtnDelete}
              >
                삭제
              </Button>
              <Button
                size={"small"}
                style={{ width: 60 }}
                onClick={handleBtnSave}
              >
                저장
              </Button>
            </div>
          </div>
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: 676 }}
          >
            <div>
              {modalOpen && (
                <Modal
                  title={modalTitle}
                  open={modalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  width={500}
                >
                  <Form form={form} layout="vertical">
                    <Form.Item
                      label="명칭"
                      name="명칭"
                      // rules={[
                      //   {
                      //     required: true,
                      //     message: "Please input the title of collection!",
                      //   },
                      // ]}
                    >
                      <Input
                        defaultValue={modalNameValue}
                        value={modalNameValue}
                      />
                    </Form.Item>
                    <Form.Item name="유형" label="유형">
                      <Select
                        defaultValue={modalTypeValue}
                        value={modalTypeValue}
                      >
                        <Option value="">텍스트</Option>
                        <Option value="Select">콤보박스</Option>
                        <Option value="Date">달력</Option>
                        <Option value="Period">기간</Option>
                        <Option value="Checkbox">체크박스</Option>
                        <Option value="Image">사진</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item name="공통코드" label="공통코드">
                      <TreeSelect
                        showSearch
                        style={{ width: "100%" }}
                        // value={value}
                        dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                        placeholder="Please select"
                        treeData={[]}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
              )}
            </div>
            <CMMGrid
              ref={gridRef} // Ref for accessing Grid's API
              // rowData={rowData} // Row Data for Rows
              rowSelection="multiple"
              columnDefs={columnDefs} // Column Defs for Columns
              defaultColDef={defaultColDef} // Default Column Properties
              animateRows={true} // Optional - set to 'true' to have rows animate when sorted
              onCellClicked={cellClickedListener} // Optional - registering for Grid Event
              onCellValueChanged={onCellValueChanged}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SampleGrid;
