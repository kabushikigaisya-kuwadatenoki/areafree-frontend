'use client'
import {
  Box,
  Button,
  Group,
  Modal,
  NativeSelect,
  Paper,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDisclosure, useWindowScroll } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import Cookies from 'js-cookie'
import Link from "next/link"
import { useRouter } from 'next/navigation'

type Props = {
  initialValues?: {
    comment?: string
    introduction?: string
    profile_image?: string
    guide_area?: string
    support_status?: string
    user_id?: string
    // user_details: {
    //   id?: string
    //   first_name?: string
    //   first_name_kana?: string
    //   last_name?: string
    //   last_name_kana?: string
    //   nickname?: string
    //   gender?: string
    //   birthday?: string
    //   phone_number?: string
    //   email?: string
    //   profile_image?: string
    //   available_languages?: string[]
    // }
  },
  guide_id: string
}

export function GuideProfileForm({ initialValues, guide_id }: Props) {
  const router = useRouter()
  const [scroll, scrollTo] = useWindowScroll()
  const [opened, { open, close }] = useDisclosure()

  const defaultValues = {
    support_status: initialValues?.support_status || '',
    // profile_image: initialValues?.user_details?.profile_image || '',
    // first_name: initialValues?.user_details?.first_name || '',
    // first_name_kana: initialValues?.user_details?.first_name_kana || '',
    // last_name: initialValues?.user_details?.last_name || '',
    // last_name_kana: initialValues?.user_details?.last_name_kana || '',
    // nickname: initialValues?.user_details?.nickname || '',
    // gender: initialValues?.user_details?.gender || '',
    // birthday: initialValues?.user_details?.birthday || '',
    // phone_number: initialValues?.user_details?.phone_number || '',
    // email: initialValues?.user_details?.email || '',
    // available_languages: initialValues?.user_details?.available_languages || [],
    guide_area: initialValues?.guide_area || '',
    comment: initialValues?.comment || '',
    introduction: initialValues?.introduction || '',
  };

  const form = useForm({
    initialValues: defaultValues,

    // validate: {
    //   last_name: (value = '') =>
    //     value.trim().length < 1 || value.trim().length > 50
    //       ? '姓を1〜50文字で入力してください'
    //       : null,
    //   last_name_kana: (value = '') =>
    //     !value.match(/^[\u30A0-\u30FF]+$/) || value.trim().length < 1 || value.trim().length > 50
    //       ? '姓（カナ）は全角カナで1〜50文字で入力してください'
    //       : null,
    //   first_name: (value = '') =>
    //     value.trim().length < 1 || value.trim().length > 50
    //       ? '名を1〜50文字で入力してください'
    //       : null,
    //   first_name_kana: (value = '') =>
    //     !value.match(/^[\u30A0-\u30FF]+$/) || value.trim().length < 1 || value.trim().length > 50
    //       ? '名（カナ）は全角カナで1〜50文字で入力してください'
    //       : null,
    //   nickname: (value = '') =>
    //     value.trim().length < 1 || value.trim().length > 50
    //       ? 'ニックネームを1〜50文字で入力してください'
    //       : null,
    //   gender: (value = '') => (!value || value === '未選択' ? '性別を選択してください' : null),
    //   birthday: (value = '') =>
    //     !value || new Date(value) >= new Date() ? '有効な生年月日を入力してください' : null,
    //   available_languages: (value: string[] = []) =>
    //     value.some((lang) => lang === '未選択' || lang === '')
    //       ? '対応可能言語を選択してください'
    //       : null,
    //   phone_number: (value = '') =>
    //     !value.match(/^\d{10,11}$/) ? '電話番号を10〜11桁の数字で入力してください' : null,
    //   email: (value = '') =>
    //     !/^\S+@\S+\.\S+$/.test(value) ? '有効なメールアドレスを入力してください' : null,
    // },
  })

  // 画像アップロードハンドラ
  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0] // オプショナルチェーンを使用してfilesへアクセス

  //   if (file) {
  //     form.setFieldValue('profileImage', URL.createObjectURL(file))
  //   }
  // }

  // const languages = ['Japanese', 'Korean', 'English', 'Chinese'];

  // Checkboxの状態を更新するハンドラ
  // const handleLanguageChange = (language: string, checked: boolean) => {
  //   let updatedLanguages = form.values.available_languages;

  //   if (checked) {
  //     // 言語を追加
  //     updatedLanguages = [...(updatedLanguages || []), language];
  //   } else {
  //     // 言語を削除
  //     updatedLanguages = (updatedLanguages || []).filter((lang) => lang !== language);
  //   }

  //   form.setFieldValue('available_languages', updatedLanguages);
  // };

  const handleScrollToTop = () => {
    scrollTo({ y: 0 })
  }


  const accessToken = Cookies.get("accessToken");
  async function handleSubmit() {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/guides/${guide_id}/`
    const formData = {
      support_status: form.values.support_status,
      guide_area: form.values.guide_area,
      introduction: form.values.introduction,
      comment: form.values.comment,
      // available_languages: form.values.available_languages,
      // user_details: {
      //   email: form.values.email,
      //   last_name: form.values.last_name,
      //   last_name_kana: form.values.last_name_kana,
      //   first_name: form.values.first_name,
      //   first_name_kana: form.values.first_name_kana,
      //   nickname: form.values.nickname,
      //   gender: form.values.gender,
      //   birthday: form.values.birthday,
      //   phone_number: form.values.phone_number,
      //   profile_image: form.values.profile_image,
      // }
    };
    try {
      const response: Response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        cache: "no-cache" as RequestCache,
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const errorData = await response.json(); // エラーレスポンスの内容を取得
        console.error('Error Response:', errorData); // エラー内容をログに出力
        throw new Error('Failed to update the guide');
      }
      const data = await response.json()
      console.log('Success:', data);
      handleScrollToTop()
    } catch (error: any) {
      console.error(error.message)
      throw new Error(error.message)
    }
  }
  async function handleDelete() {
    const endpoint = `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT}/guides/${guide_id}/`
    try {
      const response: Response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        },
        cache: "no-cache" as RequestCache,
      })

      if (response?.ok) {
        notifications.show({
          message: "ガイド登録情報を削除しました！",
        });
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        router.push("/login")
        close()
      }
    } catch (error: any) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
  return (
    <>
      <Modal opened={opened} onClose={close} title="ガイド登録解除" fw={700}>
        <Paper withBorder p={20} >
          <Text fw={700} size='sx' ta="center">
            ガイド登録を解除しますか？
          </Text>
          <Text ta="center" size="xs" mt={16}>
            ガイド登録を解除すると、登録情報が破棄され復元できません。<br />
            プランに加入している場合、プランは解除と同時に自動で退会されます。
          </Text>
          <Text ta="center" size="xs" mt={16}>
            ガイド登録解除後も、引き続きガイド検索などの一般機能はご利用いただけます。
          </Text>
        </Paper>
        <Group mt={20} justify='flex-end'>
          <Button variant='outline' onClick={() => close()}>キャンセル</Button>
          <Button variant='fill' bg='red' onClick={() => { handleDelete() }}>退会</Button>
        </Group>
      </Modal>
      <Box maw={290} mx="auto">
        <Paper shadow="lg" p="1rem" my="2rem" radius="lg">
          <form onSubmit={form.onSubmit(handleSubmit)}>
            {/* <input
              type="file"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
              id="imageUpload"
            />
            <label htmlFor="imageUpload">
              <Image
                src={form.values.profile_image || ProfileUpload}
                width="96"
                height="96"
                alt="プロフィール画像アップロードボタン"
                style={{ margin: '0 auto', display: 'block', cursor: 'pointer' }}
              />
            </label> */}
            <NativeSelect
              label="対応ステータス"
              {...form.getInputProps('support_status')}
              data={[
                { value: 'available', label: '対応可能' },
                { value: 'unavailable', label: '対応不可' },
              ]}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
              mt="1rem"
            />
            <TextInput
              label="ガイド地域"
              placeholder="地域"
              required
              value={form.values.guide_area}
              onChange={(event) => form.setFieldValue('guide_area', event.currentTarget.value)}
              error={form.errors.guide_area}
            />
            <TextInput
              label="コメント"
              placeholder="コメント"
              required
              withAsterisk
              value={form.values.comment}
              onChange={(event) => form.setFieldValue('comment', event.currentTarget.value)}
              error={form.errors.comment}
            />
            <Textarea
              label="紹介文"
              placeholder="紹介文"
              required
              value={form.values.introduction}
              onChange={(event) => form.setFieldValue('introduction', event.currentTarget.value)}
              error={form.errors.introduction}
            />
            {/* <TextInput
              label="姓"
              {...form.getInputProps('last_name')}
              mt="1rem"
              placeholder="姓"
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="姓（カナ）"
              {...form.getInputProps('last_name_kana')}
              mt="1rem"
              placeholder="セイ"
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="名"
              {...form.getInputProps('first_name')}
              mt="1rem"
              placeholder="名"
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="名（カナ）"
              {...form.getInputProps('first_name_kana')}
              mt="1rem"
              placeholder="メイ"
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="ニックネーム"
              {...form.getInputProps('nickname')}
              mt="1rem"
              placeholder="ニックネーム"
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <NativeSelect
              label="性別"
              {...form.getInputProps('gender')}
              data={['未選択', '指定しない', '男性', '女性']}
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
              mt="1rem"
            />
            <TextInput
              label="生年月日"
              {...form.getInputProps('birthday')}
              placeholder="XXXX-XX-XX"
              mt="1rem"
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
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            />
            <TextInput
              label="メールアドレス"
              {...form.getInputProps('email')}
              mt="1rem"
              placeholder="example@example.com"
              withAsterisk
              styles={{ input: { opacity: '1', color: '#555' } }}
            /> */}
            <Group justify="center" mt="md">
              <Button type="submit">保存</Button>
            </Group>
          </form>
        </Paper>
        <>
          <Group justify="flex-end" my="2rem">
            <Button component={Link} href={`/user/${initialValues?.user_id}`}>
              ユーザーダッシュボードへ
            </Button>
            <Group justify="flex-end">
              <Button onClick={() => open()} color='red' variant='outline'>
                ガイド登録解除
              </Button>
              {/* <Stack>
                <Text size="xs" c="red" component={Link} href="/">
                  パスワードを変更する
                </Text>
                <Text size="xs" c="red" component={Link} href="/">
                  ブロックしているユーザー
                </Text>
              </Stack> */}
            </Group>
            {/* <Button component={Link} href="/" color="red" variant="outline">
              退会
            </Button> */}
          </Group>
        </>
      </Box>
    </>
  )
}
