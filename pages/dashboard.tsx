import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'
import { LogoutIcon } from '@heroicons/react/solid'
import { Layout } from '../components/Layout'
import { useQueryClient } from '@tanstack/react-query'
import { UserInfo } from '../components/UserInfo'
import { TaskForm } from '../components/TaskForm'
import { TaskList } from '../components/TaskList'
// import { TaskForm } from '../components/TaskForm'
// import { TaskList } from '../components/TaskList'

// 以下の記述だとerrorが出る
// export default function Dashboard(): NextPage {
//   return <Layout title="Task Board">dashboard</Layout>
// }
const Dashboard: NextPage = () => {
  const router = useRouter()
  const QueryClient = useQueryClient()
  const logout = async () => {
    /*RestAPIから取得したログインしているユーザー情報は、ブラウザの方にキャッシュされるから
ログアウトの際に、キャッシュをリムーブする必要があるのでuseQueryClientを使用 */
    QueryClient.removeQueries(['user'])
    QueryClient.removeQueries(['tasks'])
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.push('/')
  }
  return (
    <Layout title="Task Board">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
      <UserInfo />
      <TaskForm />
      <TaskList />
    </Layout>
  )
}

export default Dashboard
