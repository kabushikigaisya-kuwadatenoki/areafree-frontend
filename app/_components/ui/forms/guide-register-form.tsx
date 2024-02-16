"use client";
import { Box, Button, Paper, Text, TextInput, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";

export function GuideRegister() {
  const form = useForm({
    initialValues: {
      guideArea: "",
      comment: "",
      introduction: "",
      plan: "",
    },

    validate: {
      guideArea: (value) => (value.length > 0 ? "ガイド地域を入力してください" : null),
      comment: (value) => (value.length > 0 ? "コメントを入力してください" : null),
      introduction: (value) => (value.length > 0 ? "紹介文を入力してください" : null),
    },
  });

  const handleSubmit = () => {
    console.log("submit");
  };
  return (
    <>
      <Box maw={290} mx="auto">
        <Paper shadow="lg" p="1rem" my="2rem" radius="lg">
          <Text ta="center" size="xl" fw={700}>
            ガイド登録
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput label="ガイド地域" placeholder="地域" required value={form.values.guideArea} onChange={(event) => form.setFieldValue("guideArea", event.currentTarget.value)} error={form.errors.guideArea} />
            <TextInput label="コメント" placeholder="コメント" required withAsterisk value={form.values.introduction} onChange={(event) => form.setFieldValue("introduction", event.currentTarget.value)} error={form.errors.introduction} />
            <Textarea label="紹介文" placeholder="紹介文" required value={form.values.comment} onChange={(event) => form.setFieldValue("comment", event.currentTarget.value)} error={form.errors.comment} />
            <Button variant="outline" component={Link} href="/register/complete">
              戻る
            </Button>
            <Button type="submit">次へ</Button>
          </form>
        </Paper>
      </Box>
    </>
  );
}
