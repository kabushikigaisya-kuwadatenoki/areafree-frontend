'use client'
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Group,
  Modal,
  NativeSelect,
  Paper,
  Stack,
  Text,
  TextInput
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useWindowScroll } from '@mantine/hooks'
import { useDisclosure } from "@mantine/hooks"
import axios from "axios";
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
// 色については後々テーマで設定します。

type Props = {
  initialValues?: {
    profile_image: string
    first_name?: string
    first_name_kana?: string
    last_name?: string
    last_name_kana?: string
    nickname?: string
    gender?: string
    birthday?: string
    available_languages?: string[]
    phone_number?: string
    email: string
    password?: string
    confirmPassword?: string
    is_guide?: boolean
  },
  user_id: string
}

export function UserProfileForm({ initialValues, user_id }: Props) {
  const ProfileUpload = '/profileUpload.svg'
  const [registerStatus, setRegisterStatus] = useState('register')
  const [opened, { open, close }] = useDisclosure(false)
  const [completeUpdate, setCompleteUpdate] = useState("")
  const [scroll, scrollTo] = useWindowScroll()

  const defaultValues = {
    profile_image: '',
    first_name: '',
    first_name_kana: '',
    last_name: '',
    last_name_kana: '',
    nickname: '',
    gender: '',
    birthday: '',
    available_languages: [''],
    phone_number: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const form = useForm({
    initialValues: initialValues || defaultValues,

    validate: {
      last_name: (value = '') =>
        value.trim().length < 1 || value.trim().length > 50
          ? '姓を1〜50文字で入力してください'
          : null,
      last_name_kana: (value = '') =>
        !value.match(/^[\u30A0-\u30FF]+$/) || value.trim().length < 1 || value.trim().length > 50
          ? '姓（カナ）は全角カナで1〜50文字で入力してください'
          : null,
      first_name: (value = '') =>
        value.trim().length < 1 || value.trim().length > 50
          ? '名を1〜50文字で入力してください'
          : null,
      first_name_kana: (value = '') =>
        !value.match(/^[\u30A0-\u30FF]+$/) || value.trim().length < 1 || value.trim().length > 50
          ? '名（カナ）は全角カナで1〜50文字で入力してください'
          : null,
      nickname: (value = '') =>
        value.trim().length < 1 || value.trim().length > 50
          ? 'ニックネームを1〜50文字で入力してください'
          : null,
      gender: (value = '') => (!value || value === '未選択' ? '性別を選択してください' : null),
      birthday: (value = '') =>
        !value || new Date(value) >= new Date() ? '有効な生年月日を入力してください' : null,
      phone_number: (value = '') =>
        !value.match(/^\d{10,11}$/) ? '電話番号を10〜11桁の数字で入力してください' : null,
      email: (value = '') =>
        !/^\S+@\S+\.\S+$/.test(value) ? '有効なメールアドレスを入力してください' : null,
      available_languages: (value: string[] = []) =>
        value.some((lang) => lang === '未選択' || lang === '')
          ? '対応可能言語を選択してください'
          : null,
    },
  })
  const [uploadFile, setUploadFile] = useState("")
  const accessToken = Cookies.get("accessToken");
  // 画像アップロードハンドラ
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setUploadFile("");
      return;
    }

    setUploadFile(file.name);
    const previewUrl = URL.createObjectURL(file);
    form.setFieldValue('profile_image', previewUrl);

    // FormData オブジェクトの作成
    const formData = new FormData();
    formData.append('profile_image', file); // 'profile_image' はバックエンドが期待するフィールド名に合わせてください
    formData.append("email", form.values.email)

    try {
      // axios を使用して PUT リクエストを送信
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/users/${user_id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // マルチパートフォームデータとして送信
          Authorization: `Bearer ${accessToken}`
        },
      });

      // 応答の処理（成功した場合）
      console.log('Upload successful', response.data);
    } catch (error) {
      // エラー処理
      console.error('Upload failed', error);
    }
  };

  const handleScrollToTop = () => {
    scrollTo({ y: 0 })
  }

  const languages = ['Japanese', 'Korean', 'English', 'Chinese'];

  // Checkboxの状態を更新するハンドラ
  const handleLanguageChange = (language: string, checked: boolean) => {
    let updatedLanguages = form.values.available_languages;

    if (checked) {
      // 言語を追加
      updatedLanguages = [...(updatedLanguages || []), language];
    } else {
      // 言語を削除
      updatedLanguages = (updatedLanguages || []).filter((lang) => lang !== language);
    }

    form.setFieldValue('available_languages', updatedLanguages);
  };


  async function handleSubmit() {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/users/${user_id}/`
    try {
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        body: JSON.stringify(form.values)
      })
      if (!response.ok) {
        const errorData = await response.json(); // エラーレスポンスの内容を取得
        console.error('Error Response:', errorData); // エラー内容をログに出力
        throw new Error('Failed to update the guide');
      }
      const data = await response.json()
      console.log('Success:', data);
      setCompleteUpdate("complete")
      handleScrollToTop()
    } catch (error: any) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }


  return (
    <>
      {completeUpdate && (
        <Alert variant='lite' color='blue' withCloseButton onClose={() => { setCompleteUpdate("") }}>
          ユーザー情報を更新しました
        </Alert>
      )}
      <Modal opened={opened} onClose={close} title="退会する">
        <Paper withBorder p={10} >
          <Group justify='center'>
            <Text size="sm" fw={700} ta="center">システム名を退会しますか？</Text>
            <Text size='xs'>退会すると、アカウントに紐づくすべての情報が破棄され、復旧できません。</Text>
          </Group>
        </Paper>
        <Group justify="flex-end" mt={16}>
          <Button onClick={close} variant="outline">
            キャンセル
          </Button>
          <Button bg="red" variant='fill' onClick={() => { console.log("退会") }}>退会</Button>
        </Group>
      </Modal>
      <Box maw={290} mx="auto">
        <Paper shadow="lg" p="1rem" my="2rem" radius="lg">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <input
              type="file"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="imageUpload"
              disabled={registerStatus === 'confirm'}
            />
            <label htmlFor="imageUpload">
              <Image
                src={form.values.profile_image || ProfileUpload}
                width="96"
                height="96"
                alt="プロフィール画像アップロードボタン"
                style={{ margin: '0 auto', display: 'block', cursor: 'pointer' }}
              />
            </label>
            <TextInput
              label="姓"
              {...form.getInputProps('last_name')}
              mt="1rem"
              placeholder="姓"
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="姓（カナ）"
              {...form.getInputProps('last_name_kana')}
              mt="1rem"
              placeholder="セイ"
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="名"
              {...form.getInputProps('first_name')}
              mt="1rem"
              placeholder="名"
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="名（カナ）"
              {...form.getInputProps('first_name_kana')}
              mt="1rem"
              placeholder="メイ"
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="ニックネーム"
              {...form.getInputProps('nickname')}
              mt="1rem"
              placeholder="ニックネーム"
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <NativeSelect
              label="性別"
              {...form.getInputProps('gender')}
              data={['未選択', '指定しない', '男性', '女性']}
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
              mt="1rem"
            />
            <TextInput
              label="生年月日"
              {...form.getInputProps('birthday')}
              placeholder="XXXX-XX-XX"
              mt="1rem"
              disabled={registerStatus === 'confirm'}
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <Group justify="column" gap="xs" mt={16}>
              {languages.map((language) => (
                <Checkbox
                  key={language}
                  label={language}
                  checked={form.values.available_languages?.includes(language) || false}
                  onChange={(event) => handleLanguageChange(language, event.currentTarget.checked)}
                />
              ))}
            </Group>
            <TextInput
              label="電話番号"
              {...form.getInputProps('phone_number')}
              mt="1rem"
              placeholder="1234567890"
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="メールアドレス"
              {...form.getInputProps('email')}
              mt="1rem"
              placeholder="example@example.com"
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <Group justify="center" mt="md">
              <Button type="submit">保存</Button>
            </Group>
          </form>
        </Paper>
        <>
          <Group justify="flex-end">
            <Stack>
              <Text size="xs" c="red" component={Link} href="/">
                パスワードを変更する
              </Text>
              <Text size="xs" c="red" component={Link} href="/">
                ブロックしているユーザー
              </Text>
            </Stack>
          </Group>
          <Group justify="flex-end" my="2rem">
            {initialValues?.is_guide ? (
              <Button component={Link} href={`/guide/${initialValues.is_guide}`}>
                ガイドプロフィールへ
              </Button>
            ) : (
              <Button component={Link} href="/guide/register">
                ガイド登録
              </Button>
            )}
            <Button onClick={open} bg="red" variant="fill">
              退会
            </Button>
          </Group>
        </>
      </Box >
    </>
  )
}
