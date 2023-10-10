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
  const refSelectedNode = useRef(null);

  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      <div>
        {contextHolder}
        <Title level={3} style={{ marginTop: 10 }}>
          공통코드 관리
        </Title>

        <Search ref={refSearch} refGrid={refGrid} />
        <div style={{ display: "flex", height: 700 }}>
          <LeftTree
            ref={refTree}
            refGrid={refGrid}
            messageApi={messageApi}
            refSelectedNode={refSelectedNode}
          />
          <Grid
            ref={refGrid}
            refTree={refTree}
            refSearch={refSearch}
            messageApi={messageApi}
            refSelectedNode={refSelectedNode}
          />
        </div>
      </div>
    </>
  );
};

export default SampleGrid;
