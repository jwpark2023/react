// import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

import { request } from "src/utils/axios";

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
import type { TreeProps } from "antd/es/tree";
import dayjs from "dayjs";
import { Key } from "antd/es/table/interface";
import Grid from "src/component/Grid/CMMGrid";

const dateFormat = "YYYY-MM-DD";

const { Title, Paragraph, Text, Link } = Typography;

const arrayToTree = (arr, parent) =>
  arr
    .filter((item) => item.P_CODE_CD === parent)
    .map((child) => ({
      title: child.CODE_NM,
      key: child.CODE_CD,
      children: arrayToTree(arr, child.CODE_CD),
    }));

const Administorator = () => {
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

  // const gridRef = useRef<AgGridReact<MDM>>(null);
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
  const [messageApi, contextHolder] = message.useMessage();

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState<ColDef<MDM>[]>([
    { field: "P_CODE_NM", headerName: "분류", width: 120 },
    { field: "CODE_CD", headerName: "코드", width: 120 },
    { field: "CODE_NM", headerName: "코드명", width: 120 },
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
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);

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

  const getCodeList = () => {
    form
      .validateFields()
      .then((fields) => {
        console.log("fields begin", fields);
        const params = {
          ...fields,
          PERIOD: [
            fields.PERIOD[0].format(dateFormat),
            fields.PERIOD[1].format(dateFormat),
          ],
        };
        request("post", "/sample/codeList", params).then((result) => {
          if (result.code != "S0000001" || result.dataSet.length < 1) {
            messageApi.open({
              type: "error",
              content: "조회된 정보가 없습니다.",
            });
            setRowData(undefined);
            return;
          }
          setRowData(result.dataSet);
        });
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

  const onSelect: TreeProps["onSelect"] = (keys, info) => {
    setSelectedKeys(keys);
    request("post", "/sample/codeList", { P_CODE_CD: keys[0] }).then(
      (result) => {
        if (result.code != "S0000001" || result.dataSet.length < 1) {
          messageApi.open({
            type: "error",
            content: "조회된 정보가 없습니다.",
          });
          setRowData(undefined);
          return;
        }
        setRowData(result.dataSet);
      }
    );
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
          onKeyUp={(e) => e.key === "Enter" && getCodeList()}
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
                onClick={getCodeList}
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
            onSelect={onSelect}
            treeData={treeData}
            height={700}
          />
        </div>
        <div style={{ height: 700, width: "100%" }}>
          <div style={{ display: "flex" }}>
            <Checkbox style={{ paddingLeft: 1, width: "20%" }}>
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
                onClick={buttonListener}
              >
                추가
              </Button>
              <Button
                size={"small"}
                style={{ width: 60 }}
                onClick={buttonListener}
              >
                삭제
              </Button>
              <Button
                size={"small"}
                style={{ width: 60 }}
                onClick={buttonListener}
              >
                저장
              </Button>
            </div>
          </div>
          <div>
            <Grid
              // ref={gridRef} // Ref for accessing Grid's API
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
    </div>
  );
};

export default Administorator;
