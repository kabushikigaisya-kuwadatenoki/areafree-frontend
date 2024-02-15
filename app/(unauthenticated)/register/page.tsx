'use client'
import { Button, Group, NativeSelect, Paper, PasswordInput, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useWindowScroll } from '@mantine/hooks'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'

// 色については後々テーマで設定します。

export default function Page() {
  const ProfileUpload = '/profileUpload.svg'
  const [registerStatus, setRegisterStatus] = useState('register')
  const [languageInputs, setLanguageInputs] = useState([{ id: Math.random(), value: '' }])
  const [scroll, scrollTo] = useWindowScroll()
  const router = useRouter()

  const form = useForm({
    initialValues: {
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
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'メールアドレスを入力してください'),
      password: (value) => (value.length >= 8 ? null : 'パスワードは8文字以上で入力してください'),
      confirmPassword: (value, values) =>
        value === values.password ? null : 'パスワードが一致しません',
      phoneNumber: (value) => (/^\d{10,11}$/.test(value) ? null : '電話番号を入力してください'),
      birthday: (value) =>
        /^\d{4}-\d{2}-\d{2}$/.test(value) ? null : 'XXXX-XX-XXの形式で入力してください',
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
      <Paper shadow="lg" p="1rem" maw={290} mx="auto" my="2rem" radius="lg">
        {registerStatus === 'register' && (
          <Text size="lg" fw={700} ta="center">
            新規登録
          </Text>
        )}
        {registerStatus === 'confirm' && (
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
            {registerStatus !== 'confirm' && <Button type="submit">確認</Button>}
            {registerStatus !== 'register' && (
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
    </>
  )
}
