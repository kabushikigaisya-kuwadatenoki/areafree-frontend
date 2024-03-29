'use client'
import {
  Box,
  Button,
  Group,
  NativeSelect,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useWindowScroll } from '@mantine/hooks'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'


type FormValues = {
  profile_image: File | null;
  profile_image_preview: string;
  first_name: string;
  first_name_kana: string;
  last_name: string;
  last_name_kana: string;
  nickname: string;
  gender: string;
  birthday: string;
  available_languages: string[];
  phone_number: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function UserRegisterForm() {
  const ProfileUpload = '/profileUpload.svg'
  const [registerStatus, setRegisterStatus] = useState('register')
  const [languageInputs, setLanguageInputs] = useState([{ id: Math.random(), value: '' }])
  const [responseError, setResponseError] = useState("")
  const [scroll, scrollTo] = useWindowScroll()
  const router = useRouter()
  const pathname = usePathname()

  const defaultValues: FormValues = {
    profile_image: null,
    profile_image_preview: ProfileUpload,
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
  };

  const form = useForm({
    initialValues: defaultValues,

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
      available_languages: (value: string[] = []) =>
        value.some((lang) => lang === '未選択' || lang === '')
          ? '対応可能言語を選択してください'
          : null,
      phone_number: (value = '') =>
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

    // languageInputsを更新した後で、フォームのavailable_languagesフィールドを更新
    const updatedavailable_languages = updatedLanguageInputs.map((input) => input.value)
    form.setFieldValue('available_languages', updatedavailable_languages)
  }

  const handleScrollToTop = () => {
    scrollTo({ y: 0 })
  }

  async function handleSubmit() {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/register/`;

    try {
      // その他のフォームデータを送信
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.values),
      });

      const data = await response.json();

      if (!response.ok) {
        // より具体的なエラーメッセージのハンドリング
        const errorMessage = data.message || (data.email ? data.email[0] : '登録に失敗しました。');
        setResponseError(`登録エラー: ${errorMessage}`);
        console.error(`Registration error: ${response.status} ${errorMessage}`);
        return;
      }

      const userId = data.user_id;

      // 画像データを送信
      if (form.values.profile_image instanceof File) {
        const imageEndpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/users/${userId}/`;
        const formData = new FormData();
        formData.append('profile_image', form.values.profile_image);

        const imageResponse = await fetch(imageEndpoint, {
          method: 'PATCH',
          body: formData,
        });

        const imageResponseData = await imageResponse.json();

        if (!imageResponse.ok) {
          // より詳細なエラーハンドリング
          const imageErrorMessage = imageResponseData.message || '画像のアップロードに失敗しました。';
          setResponseError(`画像アップロードエラー: ${imageErrorMessage}`);
          console.error(`Image upload error: ${imageResponse.status} ${imageErrorMessage}`);
          return;
        }
      }

      router.push('/register/temporary');
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Unhandled error in registration: ${error.message}`);
        setResponseError(`未処理のエラー: ${error.message}`);
      } else {
        // 不明なエラーのハンドリング
        console.error('An unknown error occurred during registration');
        setResponseError('登録中に不明なエラーが発生しました。');
      }
    }
  }

  // 画像アップロードハンドラ
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      form.setFieldValue('profile_image', file);
      form.setFieldValue('profile_image_preview', URL.createObjectURL(file));
    }
  };

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
                src={form.values.profile_image_preview || ProfileUpload}
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
              required
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
            {registerStatus !== 'confirm' && (
              <>
                {form.errors.available_languages && (
                  <Text c="red" size="xs" mt={5}>
                    {form.errors.available_languages}
                  </Text>
                )}
                <Text onClick={addLanguageInput} c="blue" size="xs" mt={5}>
                  ＋対応可能言語を追加
                </Text>
              </>
            )}
            {/* このテキストをクリックすると対応可能言語のNativeSelectが増える */}
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
            <Text ta="center" c="red" size="11px" mt={12}>{responseError}</Text>
            <Group justify="center" mt="md">
              {registerStatus !== 'confirm' && (
                <Button disabled={form.values.confirmPassword === ""} onClick={() => setRegisterStatus("confirm")}>確認</Button>
              )}
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
              {pathname === '/profile' && <Button type="submit">保存</Button>}
            </Group>
          </form>
        </Paper>
      </Box>
    </>
  )
}
