import { useQueryUser } from '../hooks/useQueryUser'
import { Loader } from '@mantine/core'

export const UserInfo = () => {
  // dataで受け取りエイリアスでuserをいう名前をつける、statusがloadingの場合は、mantineUIのLoaderを表示
  const { data: user, status } = useQueryUser()
  if (status === 'loading') return <Loader />
  return <p>{user?.email}</p>
}
