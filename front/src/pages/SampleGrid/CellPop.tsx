import { useEffect, useState, forwardRef } from "react";
import { Form, Input, Modal, Select, TreeSelect } from "antd";
import { request } from "src/utils/axios";
import { arrayToTree } from "src/utils/commUtil";

const CellPop = forwardRef<any, any>((props) => {
  const {
    refCellClickdNode,
    modalNameValue,
    modalTypeValue,
    messageApi,
    setModalOpen,
    modalTitle,
    modalOpen,
  } = props;
  const [form] = Form.useForm();
  const { Option } = Select;
  const [inpuValue, setInputValue] = useState("");
  const [treeData, setTreeData] = useState([]);

  const initFormValues = () => {
    form.setFieldsValue({
      name: modalNameValue,
      type: modalTypeValue,
      cmmCode: undefined,
    });
  };

  useEffect(() => {
    renderTreeData();
  }, []);

  useEffect(() => {
    initFormValues();
  }, [props]);

  const renderTreeData = () => {
    request("get", "/sample/treeList", null).then((result) => {
      console.log("/sample/treeList", result);
      if (result.code != "S0000001" || result.dataSet.length < 1) {
        messageApi.open({
          type: "error",
          content: "조회된 정보가 없습니다.",
        });
        return;
      }
      setTreeData(arrayToTree(result.dataSet, "root", false));
    });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  const handleOk = () => {
    let result = {
      name: form.getFieldValue("name"),
      type: form.getFieldValue("type"),
      cmmCode: form.getFieldValue("cmmCode"),
    };

    refCellClickdNode.current.node.setDataValue(
      refCellClickdNode.current.column.colId,
      JSON.stringify(result)
    );

    setModalOpen(false);
  };

  const handleCancel = () => {
    setModalOpen(false);
  };

  return (
    <Modal
      title={modalTitle}
      open={modalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      width={500}
      // centered
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="명칭"
          name="name"
          // rules={[
          //   {
          //     required: true,
          //     message: "Please input the title of collection!",
          //   },
          // ]}
        >
          <Input onChange={onChange} />
        </Form.Item>
        <Form.Item name="type" label="유형">
          <Select>
            <Option value="Text">텍스트</Option>
            <Option value="Select">콤보박스</Option>
            <Option value="Date">달력</Option>
            <Option value="Period">기간</Option>
            <Option value="Checkbox">체크박스</Option>
            <Option value="Image">사진</Option>
          </Select>
        </Form.Item>
        <Form.Item name="cmmCode" label="공통코드">
          <TreeSelect
            showSearch
            style={{ width: "100%" }}
            // value={value}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            placeholder="Please select"
            treeData={treeData}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default CellPop;
