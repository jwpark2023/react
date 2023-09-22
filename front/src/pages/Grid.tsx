import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import { request } from "src/utils/axios";
import CMMGrid from "src/component/Grid/CMMGrid";

import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Tree,
  Typography,
  message,
} from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import dayjs from "dayjs";
import { Key } from "antd/es/table/interface";

const dateFormat = "YYYY-MM-DD";

const { Title, Paragraph, Text, Link } = Typography;

const arrayToTree = (arr, parent) =>
  arr
    .filter((item) => item.P_CODE_CD === parent)
    .map((child) => ({
      ...child,
      title: child.CODE_NM,
      key: child.CODE_CD,
      children: arrayToTree(arr, child.CODE_CD),
    }));

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

const Grid = () => {
  const gridRef = useRef<AgGridReact<any>>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const [columnDefs, setColumnDefs] = useState<ColDef<any>[]>([
    { field: "CRUD_FLAG", headerName: "", maxWidth: 20 },
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
      width: 100,
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
  const { Option } = Select;

  const { RangePicker } = DatePicker;

  // tree
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [selectedNode, setSelectedNode] = useState<DataNode>();

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClickded", event);
  }, []);

  const initFormValues = () => {
    let period: dayjs.Dayjs[] = [];
    let now = dayjs();

    period.push(now);
    period.push(now);

    form.setFieldsValue({
      USE_YN: "Y",
      PERIOD: period,
    });
  };

  const getTreeData = () => {
    request("get", "/sample/treeList", null).then((result) => {
      console.log("/sample/treeList", result);
      if (result.code != "S0000001" || result.dataSet.length < 1) {
        messageApi.open({
          type: "error",
          content: "조회된 정보가 없습니다.",
        });
        return;
      }

      //전체 펼침
      setExpandedKeys(result.dataSet.map((item) => item.CODE_CD));
      setTreeData(arrayToTree(result.dataSet, "root"));
    });
  };

  const searchCodelist = () => {
    form
      .validateFields()
      .then((fields) => {
        const params = {
          ...fields,
          PERIOD: [
            fields.PERIOD[0].format(dateFormat),
            fields.PERIOD[1].format(dateFormat),
          ],
        };
        getCodelist(params);
      })
      .catch((e) => {
        console.log("validateFields: ", e);
      });
  };

  // Example load data from server
  useEffect(() => {
    getTreeData();
    initFormValues();
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    console.log("버튼:", e);
  }, []);

  const handleBtnAdd = (e) => {
    console.log("추가 selectedKeys:", selectedKeys);
    if (selectedKeys.length < 1) {
      message.warning("상위 분류를 선택하세요.");
      return;
    }
    gridRef.current?.api.applyTransaction({
      addIndex: 0,
      add: [
        {
          ...defaultRow,
          CRUD_FLAG: "C",
          P_CODE_CD: selectedNode?.key,
          P_CODE_NM: selectedNode?.title,
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
        console.log(node.data);
        node.data.EXP_FR_DT = node.data.PERIOD[0];
        node.data.EXP_TO_DT = node.data.PERIOD[1];
        data.push(node?.data);
      }
      console.log(data);
    });

    request("post", "/sample/saveCodeList", data).then((result) => {
      if (result.code != "S0000001") {
        messageApi.open({
          type: "error",
          content: "저장에 실패하였습니다.",
        });
      }
      getTreeData();
      searchCodelist();
    });
  };

  const onTreeNodeSelect: TreeProps["onSelect"] = (keys, info) => {
    setSelectedKeys(keys);
    setSelectedNode(info.node);
    updateColDef(info.node);
    getCodelist({ P_CODE_CD: keys[0] });
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

  return (
    <div>
      {contextHolder}
      <Title level={3} style={{ marginTop: 10 }}>
        공통코드 관리
      </Title>

      <div>
        <Form
          form={form}
          name="advanced_search"
          style={{
            margin: "0 0 16px",
            background: "lightgray",
            padding: "12px",
            borderRadius: "5px",
          }}
          onKeyUp={(e) => e.key === "Enter" && searchCodelist()}
        >
          <Row gutter={24}>
            <Col span={5}>
              <Form.Item name="SEARCH_TEXT" label="검색조건">
                <Input />
              </Form.Item>
            </Col>
            <Col span={3}>
              <Form.Item
                name="USE_YN"
                label="사용여부"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select style={{ width: "80px" }}>
                  <Option value="">전체</Option>
                  <Option value="Y">Y</Option>
                  <Option value="N">N</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="PERIOD" label="기간">
                <RangePicker format={"YYYY-MM-DD"} />
              </Form.Item>
            </Col>
            <Col span={5} />
            <Col span={2}>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={searchCodelist}
              >
                조회
              </Button>
            </Col>
          </Row>
        </Form>
      </div>

      <div style={{ display: "flex", height: 700 }}>
        <div
          style={{
            width: 300,
            marginTop: 24,
            marginRight: 5,
            background: "#ffff",
            borderRadius: "4px",
          }}
        >
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onSelect={onTreeNodeSelect}
            treeData={treeData}
            height={700}
          />
        </div>
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

export default Grid;
