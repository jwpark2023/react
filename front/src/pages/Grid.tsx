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
import { Tree } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";

const treeData: DataNode[] = [
  {
    title: "배출관리",
    key: "0",
    children: [
      {
        title: "배출계수",
        key: "01",
        children: [
          {
            title: "IPCC",
            key: "011",
          },
          {
            title: "국가고유",
            key: "012",
          },
        ],
      },
      {
        title: "활동자료",
        key: "02",
        children: [
          {
            title: "대분류1",
            key: "021",
            children: [
              {
                title: "대분류1-중분류1",
                key: "0211",
              },
              {
                title: "대분류1-중분류2",
                key: "0212",
              },
            ],
          },
          {
            title: "대분류2",
            key: "022",
            children: [
              {
                title: "대분류2-중분류1",
                key: "0221",
              },
              {
                title: "대분류2-중분류2",
                key: "0222",
              },
              {
                title: "대분류2-중분류3",
                key: "0222",
              },
            ],
          },
        ],
      },
      {
        title: "배출시설",
        key: "03",
        children: [
          {
            title: "건물",
            key: "031",
          },
          {
            title: "교통",
            key: "032",
          },
        ],
      },
      {
        title: "감축활동",
        key: "04",
        children: [
          {
            title: "기한관리",
            key: "041",
          },
          {
            title: "중요도",
            key: "042",
          },
        ],
      },
    ],
  },
];

const Grid = () => {
  interface ICar {
    username: string;
    password: string;
  }

  const gridRef = useRef<AgGridReact<ICar>>(null);
  const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState<ColDef<ICar>[]>([
    { field: "username", filter: true },
    { field: "password", filter: true },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(
    () => ({
      sortable: true,
    }),
    []
  );

  // Example of consuming Grid Event
  const cellClickedListener = useCallback((event) => {
    console.log("cellClickded", event);
  }, []);

  const getTreeData = () => {
    request("get", "/sample/treeList", null).then((result) =>
      console.log("/sample/treeList", result)
    );
  };

  // Example load data from server
  useEffect(() => {
    request("get", "/sample/userList", null).then((result) =>
      setRowData(result.dataSet)
    );
    getTreeData();

    fetch("https://www.ag-grid.com/example-assets/row-data.json")
      .then((result) => result.json())
      .then((rowData) => setRowData(rowData));
  }, []);

  // Example using Grid's API
  const buttonListener = useCallback((e) => {
    gridRef?.current?.api.deselectAll();
  }, []);

  const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  return (
    <div>
      {/* Example using Grid's API */}
      <button onClick={buttonListener}>Push Me</button>

      <div style={{ display: "flex" }}>
        <div style={{ width: "300px", marginRight: "5px" }}>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandAll
            onSelect={onSelect}
            treeData={treeData}
            height={600}
          />
        </div>
        <div className="ag-theme-alpine" style={{ width: 500, height: 500 }}>
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
