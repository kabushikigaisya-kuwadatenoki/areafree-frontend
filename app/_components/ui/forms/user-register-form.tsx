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
    postalCode?: string
    province?: string
    locality?: string
    banchi?: string
    phoneNumber?: string
    email?: string
    password?: string
    confirmPassword?: string
  }
}

export function UserRegister({ initialValues }: Props) {
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
    postalCode: '',
    province: '',
    locality: '',
    banchi: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  }

  const form = useForm({
    initialValues: initialValues || defaultValues,

    validate: {
      email: (value = '') =>
        /^\S+@\S+\.\S+$/.test(value) ? null : '有効なメールアドレスを入力してください',
      password: (value = '') =>
        value.length >= 8 ? null : 'パスワードは8文字以上で入力してください',
      confirmPassword: (value, values) =>
        value === values?.password ? null : 'パスワードが一致しません',
      phoneNumber: (value = '') =>
        /^\d{10,11}$/.test(value) ? null : '有効な電話番号を入力してください (10～11桁)',
      birthday: (value = '') =>
        /^\d{4}-\d{2}-\d{2}$/.test(value) ? null : '生年月日はYYYY-MM-DDの形式で入力してください',
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
    setLanguageInputs(
      languageInputs.map((input) => (input.id === id ? { ...input, value: value } : input)),
    )
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
          {registerStatus === 'register' && pathname !== '/profile' && (
            <Text size="lg" fw={700} ta="center">
              新規登録
            </Text>
          )}
          {registerStatus === 'confirm' && pathname !== '/profile' && (
            <Text size="lg" fw={700} ta="center">
              登録情報確認
            </Text>
          )}
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
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="名"
              {...form.getInputProps('firstName')}
              mt="1rem"
              placeholder="名"
              disabled={registerStatus === 'confirm'}
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="名（カナ）"
              {...form.getInputProps('firstNameKana')}
              mt="1rem"
              placeholder="メイ"
              disabled={registerStatus === 'confirm'}
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="ニックネーム"
              {...form.getInputProps('nickname')}
              mt="1rem"
              placeholder="ニックネーム"
              disabled={registerStatus === 'confirm'}
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <NativeSelect
              label="性別"
              {...form.getInputProps('gender')}
              data={['未選択', '指定しない', '男性', '女性']}
              disabled={registerStatus === 'confirm'}
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
              <NativeSelect
                key={input.id}
                label={`対応可能言語 ${index + 1}`}
                value={input.value}
                onChange={(event) => handleLanguageChange(input.id, event.currentTarget.value)}
                data={['未選択', 'Japanese', 'Korean', 'English', 'Chinese']}
                mt="1rem"
                disabled={registerStatus === 'confirm'}
                styles={{ input: { opacity: '1', color: '#555' } }}
              />
            ))}
            {registerStatus !== 'confirm' && (
              <Text onClick={addLanguageInput} c="blue" size="xs" mt={5}>
                ＋対応可能言語を追加
              </Text>
            )}
            {/* このテキストをクリックすると対応可能言語のNativeSelectが増える */}
            <TextInput
              label="郵便番号"
              {...form.getInputProps('postalCode')}
              mt="1rem"
              placeholder="000-0000"
              disabled={registerStatus === 'confirm'}
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="都道府県"
              {...form.getInputProps('province')}
              mt="1rem"
              placeholder="都道府県"
              disabled={registerStatus === 'confirm'}
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="市区町村"
              {...form.getInputProps('locality')}
              mt="1rem"
              placeholder="市区町村"
              disabled={registerStatus === 'confirm'}
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="番地以下"
              {...form.getInputProps('banchi')}
              mt="1rem"
              placeholder="番地　建物名　建物番号"
              disabled={registerStatus === 'confirm'}
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="電話番号"
              {...form.getInputProps('phoneNumber')}
              mt="1rem"
              placeholder="1234567890"
              disabled={registerStatus === 'confirm'}
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="メールアドレス"
              {...form.getInputProps('email')}
              mt="1rem"
              placeholder="example@example.com"
              disabled={registerStatus === 'confirm'}
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <PasswordInput
              label="パスワード"
              {...form.getInputProps('password')}
              mt="1rem"
              placeholder="xxxxxxxx"
              disabled={registerStatus === 'confirm'}
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <PasswordInput
              label="パスワード（確認用）"
              {...form.getInputProps('confirmPassword')}
              mt="1rem"
              placeholder="xxxxxxxx"
              disabled={registerStatus === 'confirm'}
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <Group justify="center" mt="md">
              {registerStatus !== 'confirm' && pathname !== '/profile' && (
                <Button type="submit">確認</Button>
              )}
              {registerStatus !== 'register' && pathname !== '/profile' && (
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
              )}
            </Group>
          </form>
        </Paper>
        {pathname === '/profile' && (
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
        )}
      </Box>
    </>
  )
}
