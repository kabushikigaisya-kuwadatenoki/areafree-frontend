'use client'
import {
  Box,
  Button,
  Group,
  NativeSelect,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useWindowScroll } from '@mantine/hooks'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'

// 色については後々テーマで設定します。

type Props = {
  initialValues?: {
    profileImage?: string
    firstName?: string
    firstNameKana?: string
    lastName?: string
    lastNameKana?: string
    nickname?: string
    gender?: string
    birthday?: string
    availableLanguages?: string[]
    phoneNumber?: string
    email?: string
    password?: string
    confirmPassword?: string
    guideArea?: string
    comment?: string
    introduction?: string
  }
}

export function GuideProfileForm({ initialValues }: Props) {
  const ProfileUpload = '/profileUpload.svg'
  const [registerStatus, setRegisterStatus] = useState('register')
  const [languageInputs, setLanguageInputs] = useState([{ id: Math.random(), value: '' }])
  const [scroll, scrollTo] = useWindowScroll()
  const router = useRouter()
  const pathname = usePathname()

  const defaultValues = {
    profileImage: '',
    firstName: '',
    firstNameKana: '',
    lastName: '',
    lastNameKana: '',
    nickname: '',
    gender: '',
    birthday: '',
    availableLanguages: [''],
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    guideArea: '',
    comment: '',
    introduction: '',
  }

  const form = useForm({
    initialValues: initialValues || defaultValues,

    validate: {
      lastName: (value = '') =>
        value.trim().length < 1 || value.trim().length > 50
          ? '姓を1〜50文字で入力してください'
          : null,
      lastNameKana: (value = '') =>
        !value.match(/^[\u30A0-\u30FF]+$/) || value.trim().length < 1 || value.trim().length > 50
          ? '姓（カナ）は全角カナで1〜50文字で入力してください'
          : null,
      firstName: (value = '') =>
        value.trim().length < 1 || value.trim().length > 50
          ? '名を1〜50文字で入力してください'
          : null,
      firstNameKana: (value = '') =>
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
      availableLanguages: (value: string[] = []) =>
        value.some((lang) => lang === '未選択' || lang === '')
          ? '対応可能言語を選択してください'
          : null,
      phoneNumber: (value = '') =>
        !value.match(/^\d{10,11}$/) ? '電話番号を10〜11桁の数字で入力してください' : null,
      email: (value = '') =>
        !/^\S+@\S+\.\S+$/.test(value) ? '有効なメールアドレスを入力してください' : null,
      password: (value = '') =>
        value.length < 8 || !/\d/.test(value) || !/[a-zA-Z]/.test(value)
          ? 'パスワードは8文字以上で、数字と英字を含む必要があります'
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'パスワードと確認用パスワードが一致しません' : null,
    },
  })

  // 画像アップロードハンドラ
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // オプショナルチェーンを使用してfilesへアクセス

    if (file) {
      form.setFieldValue('profileImage', URL.createObjectURL(file))
    }
  }

  // 言語選択の追加ハンドラ
  const addLanguageInput = () => {
    setLanguageInputs([...languageInputs, { id: Math.random(), value: '' }])
  }

  // 言語選択の変更ハンドラ
  const handleLanguageChange = (id: number, value: string) => {
    const updatedLanguageInputs = languageInputs.map((input) =>
      input.id === id ? { ...input, value: value } : input,
    )
    setLanguageInputs(updatedLanguageInputs)

    // languageInputsを更新した後で、フォームのavailableLanguagesフィールドを更新
    const updatedAvailableLanguages = updatedLanguageInputs.map((input) => input.value)
    form.setFieldValue('availableLanguages', updatedAvailableLanguages)
  }

  const handleScrollToTop = () => {
    scrollTo({ y: 0 })
  }

  async function handleSubmit() {
    if (registerStatus === 'register') {
      setRegisterStatus('confirm')
      handleScrollToTop()
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
    router.push('/register/temporary')
  }
  return (
    <>
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
                src={form.values.profileImage || ProfileUpload}
                width="96"
                height="96"
                alt="プロフィール画像アップロードボタン"
                style={{ margin: '0 auto', display: 'block', cursor: 'pointer' }}
              />
            </label>
            <TextInput
              label="ガイド地域"
              placeholder="地域"
              required
              value={form.values.guideArea}
              onChange={(event) => form.setFieldValue('guideArea', event.currentTarget.value)}
              error={form.errors.guideArea}
            />
            <TextInput
              label="コメント"
              placeholder="コメント"
              required
              withAsterisk
              value={form.values.introduction}
              onChange={(event) => form.setFieldValue('introduction', event.currentTarget.value)}
              error={form.errors.introduction}
            />
            <Textarea
              label="紹介文"
              placeholder="紹介文"
              required
              value={form.values.comment}
              onChange={(event) => form.setFieldValue('comment', event.currentTarget.value)}
              error={form.errors.comment}
            />
            <TextInput
              label="姓"
              {...form.getInputProps('lastName')}
              mt="1rem"
              placeholder="姓"
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="姓（カナ）"
              {...form.getInputProps('lastNameKana')}
              mt="1rem"
              placeholder="セイ"
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="名"
              {...form.getInputProps('firstName')}
              mt="1rem"
              placeholder="名"
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="名（カナ）"
              {...form.getInputProps('firstNameKana')}
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
            {languageInputs.map((input, index) => (
              <>
                <NativeSelect
                  key={input.id}
                  label={`対応可能言語 ${index + 1}`}
                  value={input.value}
                  onChange={(event) => handleLanguageChange(input.id, event.currentTarget.value)}
                  data={['未選択', 'Japanese', 'Korean', 'English', 'Chinese']}
                  mt="1rem"
                  disabled={registerStatus === 'confirm'}
                  withAsterisk
                  styles={{ input: { opacity: '1', color: '#555' } }}
                />
              </>
            ))}
            <>
              {form.errors.availableLanguages && (
                <Text c="red" size="xs" mt={5}>
                  {form.errors.availableLanguages}
                </Text>
              )}
              <Text onClick={addLanguageInput} c="blue" size="xs" mt={5}>
                ＋対応可能言語を追加
              </Text>
            </>
            <TextInput
              label="電話番号"
              {...form.getInputProps('phoneNumber')}
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
            <PasswordInput
              label="パスワード"
              {...form.getInputProps('password')}
              mt="1rem"
              placeholder="xxxxxxxx"
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <PasswordInput
              label="パスワード（確認用）"
              {...form.getInputProps('confirmPassword')}
              mt="1rem"
              placeholder="xxxxxxxx"
              disabled={registerStatus === 'confirm'}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <Group justify="center" mt="md">
              <Button type="submit">確認</Button>
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setRegisterStatus('register')
                    handleScrollToTop()
                  }}
                >
                  修正
                </Button>
                <Button type="submit">登録</Button>
              </>
              {pathname === '/profile' && <Button type="submit">保存</Button>}
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
            <Button component={Link} href="/guide/register">
              ガイド登録
            </Button>
            <Button component={Link} href="/" color="red" variant="outline">
              退会
            </Button>
          </Group>
        </>
      </Box>
    </>
  )
}
