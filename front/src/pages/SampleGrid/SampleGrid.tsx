import { useRef, useState } from "react";

import { Typography, message } from "antd";
import Grid from "./Grid";
import LeftTree from "./LeftTree";
import Search from "./Search";

const { Title } = Typography;

const SampleGrid = () => {
  const refSearch = useRef<any>(null);
  const refTree = useRef<any>(null);
  const refGrid = useRef<any>(null);

  const [messageApi, contextHolder] = message.useMessage();
  const [modalOpen, setModalOpen] = useState(false);
  // const [period, setPeriod] = useState();
  const [modalTitle, setModalTitle] = useState("");
  const [modalNameValue, setModalNameValue] = useState("");
  const [modalTypeValue, setModalTypeValue] = useState("");

  return (
    <div>
      {contextHolder}
      <Title level={3} style={{ marginTop: 10 }}>
        공통코드 관리
      </Title>

      <Search ref={refSearch} refGrid={refGrid} />
      <div style={{ display: "flex", height: 700 }}>
        <LeftTree ref={refTree} refGrid={refGrid} />
        <Grid
          ref={refGrid}
          refTree={refTree}
          refSearch={refSearch}
          messageApi={messageApi}
          setModalTitle={setModalTitle}
          setModalOpen={setModalOpen}
        />
      </div>
    </div>
  );
};

export default SampleGrid;
