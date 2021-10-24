import React, { useState, useEffect, useMemo } from "react";
import { Pie } from "@ant-design/charts";
import axios from "axios";
import { Table } from "antd";

export const Chart = () => {
  const [data, setData] = useState([]);
  const [active, setActive] = useState("");
  const [tableData, setTableData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3001/counts").then((resp) => {
      setData(resp.data.data);
    });
  }, []);

  useEffect(() => {
    active &&
      axios.get("http://localhost:3001/records/" + active).then((resp) => {
        setTableData(resp.data.data);
      });
  }, [active]);

  const onReadyColumn = (plot) => {
    plot.on("element:click", (ev) => {
      setActive(ev.data.data.type);
    });
  };

  const pie = useMemo(
    // avoid re-render
    () => (
      <Pie
        appendPadding={10}
        data={data}
        angleField={"value"}
        colorField={"type"}
        radius={0.8}
        label={{ type: "outer", content: "{name} {percentage}" }}
        interactions={[
          { type: "pie-legend-active" },
          { type: "element-active" },
        ]}
        onReady={onReadyColumn}
      />
    ),
    [data]
  );

  return (
    <>
      {pie}
      <Table
        rowKey={"id"}
        dataSource={tableData.rows || []}
        columns={[
          { title: "identifier", key: "address", render: () => active },
          { title: "category", key: "category", dataIndex: "category" },
          { title: "timeStamp", key: "timeStamp", dataIndex: "timeStamp" },
          { title: "type", key: "type", dataIndex: "type" },
          { title: "kind", key: "kind", dataIndex: "kind" },
        ]}
      />
      ;
    </>
  );
};
