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

import { request } from "src/utils/axios";

import { DownOutlined } from "@ant-design/icons";
import {
  Typography,
  Tree,
  message,
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  DatePicker,
  Checkbox,
} from "antd";
import type { TreeProps } from "antd/es/tree";

const { Title, Paragraph, Text, Link } = Typography;

const arrayToTree = (arr, parent) =>
  arr
    .filter((item) => item.P_CODE_CD === parent)
    .map((child) => ({
      title: child.CODE_NM,
      key: child.CODE_CD,
      children: arrayToTree(arr, child.CODE_CD),
    }));

const Grid = () => {
  interface MDM {
    CODE_CD: string;
    CODE_NM: string;
    CODE_LVL: string;
    P_CODE_CD: string;
    P_CODE_NM: string;
    DSP_ORDER: string;
    USE_YN: string;
    EXP_FR_DT: string;
    EXP_TO_DT: string;
    ATTR1_JSON: string;
    ATTR1_VAL: string;
    ATTR2_JSON: string;
    ATTR2_VAL: string;
    ATTR3_JSON: string;
    ATTR3_VAL: string;
    ATTR4_JSON: string;
    ATTR4_VAL: string;
    ATTR5_JSON: string;
    ATTR5_VAL: string;
    ATTR6_JSON: string;
    ATTR6_VAL: string;
    ATTR7_JSON: string;
    ATTR7_VAL: string;
    ATTR8_JSON: string;
    ATTR8_VAL: string;
    ATTR9_JSON: string;
    ATTR9_VAL: string;
    ATTR10_JSON: string;
    ATTR10_VAL: string;
  }

  const gridRef = useRef<AgGridReact<MDM>>(null);
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [messageApi, contextHolder] = message.useMessage();

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState<ColDef<MDM>[]>([
    { field: "P_CODE_NM", headerName: "분류", width: 120 },
    { field: "CODE_CD", headerName: "코드" },
    { field: "CODE_NM", headerName: "코드명" },
    { field: "CODE_LVL", hide: true },
    { field: "P_CODE_CD", hide: true },
    { field: "DSP_ORDER", headerName: "", hide: true },
    { field: "USE_YN", headerName: "사용" },
    { field: "ATTR1_VAL", headerName: "속성1" },
    { field: "ATTR2_VAL", headerName: "속성2" },
    { field: "ATTR3_VAL", headerName: "속성3" },
    { field: "ATTR4_VAL", headerName: "속성4" },
    { field: "ATTR5_VAL", headerName: "속성5" },
    { field: "ATTR6_VAL", headerName: "속성6" },
    { field: "ATTR7_VAL", headerName: "속성7" },
    { field: "ATTR8_VAL", headerName: "속성8" },
    { field: "ATTR9_VAL", headerName: "속성9" },
    { field: "ATTR10_VAL", headerName: "속성10" },
    { field: "EXP_FR_DT", headerName: "시작일", width: 120 },
    { field: "EXP_TO_DT", headerName: "종료일", width: 120 },
    { field: "ATTR1_JSON", headerName: "속성1 명" },
    { field: "ATTR2_JSON", headerName: "속성2 명" },
    { field: "ATTR3_JSON", headerName: "속성3 명" },
    { field: "ATTR4_JSON", headerName: "속성4 명" },
    { field: "ATTR5_JSON", headerName: "속성5 명" },
    { field: "ATTR6_JSON", headerName: "속성6 명" },
    { field: "ATTR7_JSON", headerName: "속성7 명" },
    { field: "ATTR8_JSON", headerName: "속성8 명" },
    { field: "ATTR9_JSON", headerName: "속성9 명" },
    { field: "ATTR10_JSON", headerName: "속성10 명" },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      width: 100,
      sortable: true,
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
  const [selectedKeys, setSelectedKeys] = useState([]);

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClickded", event);
  }, []);

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

  // Example load data from server
  useEffect(() => {
    request("get", "/sample/codeList", null).then((result) =>
      setRowData(result.dataSet)
    );
    getTreeData();

    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    console.log("버튼:", e);
  }, []);

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
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
            <Col span={3}>
              <Form.Item name="VISIBLE_ATTR_NM" label="속성명 표시">
                <Checkbox />
              </Form.Item>
            </Col>
            <Col span={5}>
              <Form.Item name="PERIOD" label="기간">
                <RangePicker />
              </Form.Item>
            </Col>
            <Col span={6} />
            <Col span={2}>
              <Button type="primary" style={{ width: "100%" }}>
                조회
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div style={{ textAlign: "right" }}>
        <Button size={"small"} style={{ width: 90 }} onClick={buttonListener}>
          엑셀 업로드
        </Button>
        <Button size={"small"} style={{ width: 90 }} onClick={buttonListener}>
          엑셀 다운로드
        </Button>
        <Button size={"small"} style={{ width: 60 }} onClick={buttonListener}>
          추가
        </Button>
        <Button size={"small"} style={{ width: 60 }} onClick={buttonListener}>
          삭제
        </Button>
        <Button size={"small"} style={{ width: 60 }} onClick={buttonListener}>
          저장
        </Button>
      </div>

      <div style={{ display: "flex", height: 700 }}>
        <div
          style={{
            width: 300,
            marginRight: "5px",
            background: "#ffff",
            borderRadius: "4px",
          }}
        >
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onSelect={onSelect}
            treeData={treeData}
            height={700}
          />
        </div>
        <div className="ag-theme-alpine" style={{ width: "100%" }}>
          <AgGridReact
            ref={gridRef} // Ref for accessing Grid's API
            rowData={rowData} // Row Data for Rows
            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection="multiple" // Options - allows click selection of rows
            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          />
        </div>
      </div>
    </div>
  );
};

export default Grid;
