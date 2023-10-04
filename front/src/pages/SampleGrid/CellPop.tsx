import { useEffect, useState } from "react";
import { Form, Input, Modal, Select, TreeSelect } from "antd";
import { request } from "src/utils/axios";

const CellPop = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  const [inpuValue, setInputValue] = useState("");

  const arrayToTree = (arr, parent) =>
    arr
      .filter((item) => item.P_CODE_CD === parent)
      .map((child) => ({
        ...child,
        title: child.CODE_NM,
        value: child.CODE_NM,
        key: child.CODE_CD,
        children: arrayToTree(arr, child.CODE_CD),
      }));

  const [treeData, setTreeData] = useState([]);

  const initFormValues = () => {
    form.setFieldsValue({
      name: props.modalNameValue,
      type: props.modalTypeValue,
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
        props.messageApi.open({
          type: "error",
          content: "조회된 정보가 없습니다.",
        });
        return;
      }
      setTreeData(arrayToTree(result.dataSet, "root"));
    });
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputValue(e.target.value);
  };

  const handleOk = () => {
    console.log(form.getFieldValue("cmmCode"));
    var result = {
      name: form.getFieldValue("name"),
      type: form.getFieldValue("type"),
    };

    console.log(result);

    // props.setModalResult("");
  };

  const handleCancel = () => {
    props.setModalOpen(false);
  };

  return (
    <Modal
      title={props.modalTitle}
      open={props.modalOpen}
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
};

export default CellPop;
