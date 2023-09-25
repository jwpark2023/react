import { useEffect } from "react";
import { Form, Input, Modal, Select, TreeSelect } from "antd";

const CellPop = (props) => {
  const [form] = Form.useForm();
  const { Option } = Select;

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <Modal
      title={props.modalTitle}
      open={props.modalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
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
            defaultValue={props.modalNameValue}
            value={props.modalNameValue}
          />
        </Form.Item>
        <Form.Item name="유형" label="유형">
          <Select
            defaultValue={props.modalTypeValue}
            value={props.modalTypeValue}
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
  );
};

export default CellPop;
