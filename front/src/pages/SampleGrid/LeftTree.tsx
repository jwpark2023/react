import { DownOutlined } from "@ant-design/icons";
import { Tree, TreeProps, message } from "antd";
import { Key } from "antd/es/table/interface";
import { DataNode } from "antd/es/tree";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { request } from "src/utils/axios";

const arrayToTree = (arr, parent) =>
  arr
    .filter((item) => item.P_CODE_CD === parent)
    .map((child) => ({
      ...child,
      title: child.CODE_NM,
      key: child.CODE_CD,
      children: arrayToTree(arr, child.CODE_CD),
    }));

const LeftTree = forwardRef<any, any>((props, ref) => {
  const { refGrid, messageApi } = props;
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<Key[]>([]);
  const [selectedNode, setSelectedNode] = useState<DataNode>();

  useImperativeHandle(
    ref,
    () => {
      return {
        getTreeData: getTreeData,
      };
    },
    []
  );

  useEffect(() => {
    getTreeData();
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
      setExpandedKeys(result.dataSet.map((item) => item.CODE_CD) || undefined);
      setTreeData(arrayToTree(result.dataSet, "root"));
    });
  };
  const onTreeNodeSelect: TreeProps["onSelect"] = (keys, info) => {
    setSelectedKeys(keys);
    setSelectedNode(info.node);
    refGrid.current.updateColDef(info.node);
    refGrid.current.getCodelist({ P_CODE_CD: keys[0] });
  };

  return (
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
  );
});

export default LeftTree;
