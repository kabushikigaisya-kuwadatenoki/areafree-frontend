"use client";
import { Table, TableData, Text, Radio, Paper } from "@mantine/core";
import { ComponentWrapper } from "@/app/_components/ui/common/component-wrapper";
import { useState } from "react";

const tableData: TableData = {
  head: ["", "ライトプラン", "スタンダードプラン", "プレミアムプラン"],
  body: [
    ["料金", "1000円/月", "3000円/月", "6000円/月"],
    ["ガイド可能回数", "1回/月", "4回/月", "12回/月"],
  ],
};

export function Demo() {
  const [value, setValue] = useState("");
  return (
    <ComponentWrapper>
      <Text size="lg" fw={700} ta="center" pb={5}>
        プラン選択
      </Text>
      <Text size="xs" fw={400} ta="center" pb={16}>
        利用プランを登録してください。
        <br />
        プランは登録後に変更できます。
      </Text>
      <Paper shadow="sm" p={5}>
        <Table data={tableData} style={{ fontSize: "10px" }} />
      </Paper>
      <Text size="xs" fw={400} py="1rem">
        プラン選択
      </Text>
      <Radio.Group value={value} onChange={setValue}>
        <Radio value="" label="利用しない" mb={8} />
        <Radio value="light" label="ライトプラン" mb={8} />
        <Radio value="standard" label="スタンダードプラン" mb={8} />
        <Radio value="premium" label="プレミアムプラン" />
      </Radio.Group>
    </ComponentWrapper>
  );
}
