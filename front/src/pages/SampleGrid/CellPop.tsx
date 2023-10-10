import { useEffect, useState, forwardRef, useRef } from "react";
import { Form, Input, Modal, Select, TreeSelect } from "antd";
import { request } from "src/utils/axios";
import { arrayToTree } from "src/utils/commUtil";

const CellPop = forwardRef<any, any>((props) => {
  console.log("CellPop", props);
  const { open, title, attrName, attrType, attrCode } = props.modalProps;
  const handleModalResult = props.handleModalResult;
  const [form] = Form.useForm();
  const { Option } = Select;
  const [inpuValue, setInputValue] = useState("");
  const [treeData, setTreeData] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [treeSelectEnable, setTreeSelectEnable] = useState(false);

  const initFormValues = () => {
    form.setFieldsValue({
      name: attrName,
      type: attrType,
      code: attrCode,
    });

    form.getFieldValue("type") !== "Select"
      ? setTreeSelectEnable(true)
      : setTreeSelectEnable(false);
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
        return;
      }

      setTreeData(arrayToTree(result.dataSet, "root", false));
    });
  };

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  const onSelectChange = (value) => {
    value === "Select" ? setTreeSelectEnable(false) : setTreeSelectEnable(true);
  };

  const onSelect = (value, node) => {
    setSelectedCode(node.CODE_CD);
  };

  const handleOk = () => {
    let result = {
      name: form.getFieldValue("name"),
      type: form.getFieldValue("type"),
      code: selectedCode,
    };
    handleModalResult(result);
  };

  const handleCancel = () => {
    handleModalResult();
  };

  return (
    <Modal
      title={title}
      open={open}
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
          <Input onChange={onInputChange} />
        </Form.Item>
        <Form.Item name="type" label="유형">
          <Select onChange={onSelectChange}>
            <Option value="Text">텍스트</Option>
            <Option value="Select">콤보박스</Option>
            <Option value="Date">달력</Option>
            <Option value="Period">기간</Option>
            <Option value="Checkbox">체크박스</Option>
            <Option value="Image">사진</Option>
          </Select>
        </Form.Item>
        <Form.Item name="code" label="공통코드">
          <TreeSelect
            disabled={treeSelectEnable}
            showSearch
            style={{ width: "100%" }}
            onSelect={onSelect}
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
