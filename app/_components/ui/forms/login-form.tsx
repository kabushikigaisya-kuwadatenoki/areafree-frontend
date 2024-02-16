"use client";
import { Group, TextInput, Button, Checkbox, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ComponentWrapper } from "@/app/_components/ui/common/component-wrapper";
import axios, {AxiosError} from "axios";
import { useState } from "react";

type LoginFormProps = {
  email: string;
  password: string;
}

type ErrorResponse = {
  message: string;  // エラーメッセージを含む
  statusCode?: number;  // HTTPステータスコード（オプショナル）
  errorCode?: string;  // アプリケーション固有のエラーコード（オプショナル）
}

export function LoginForm() {
  const [ confirmed, setConfirmed ] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+\.\S+$/.test(value) ? null : "メールアドレスの形式が無効です"),
      password: (value = '') =>
        value.length < 8 || !/\d/.test(value) || !/[a-zA-Z]/.test(value)
          ? 'パスワードは8文字以上で、数字と英字を含む必要があります'
          : null,
    }
  });
  const handleSubmit = async (values: LoginFormProps) => {
    try {
      // ここでバックエンドへのPOSTリクエストを実装
      // const response = await axios.post('/api/login', values);
      // ログイン成功時の処理をここに記述...
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;

      if (axiosError.response) {
        // バックエンドからのエラーメッセージをform.errorsに設定
        form.setErrors({
          email: axiosError.response.data.message,
        });
      } else {
        // その他のエラーのハンドリング
        console.error("ログイン時にエラーが発生しました", error);
      }
    }
  };


  return (
    <ComponentWrapper>
      <Text size="md" fw={700} ta="center" pb="1rem">ログイン</Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="メールアドレス"
            placeholder="example@mail.com"
            {...form.getInputProps('email')}
            required
          />
          {form.errors.email && (
            <Text c="red" size="sm" mt={5}>
              {form.errors.email}
            </Text>
          )}
          <TextInput
            label="パスワード"
            placeholder="Your password"
            {...form.getInputProps('password')}
            required
          />
              <Checkbox
              style={{ display: "flex",justifyContent: "center", margin: "1rem 0"}}
              label="利用規約に同意する"
      checked={confirmed}
      onChange={(event) => setConfirmed(event.currentTarget.checked)}
    />
    <Group justify="center">
          <Button type="submit" disabled={confirmed !== true}>ログイン</Button>
    </Group>
        </form>
    </ComponentWrapper>
  );
}
