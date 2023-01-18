import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import axios from 'axios'
import { LogoutIcon } from '@heroicons/react/solid'
import { Layout } from '../components/Layout'
// import { UserInfo } from '../components/UserInfo'
import { useQueryClient } from '@tanstack/react-query'
// import { TaskForm } from '../components/TaskForm'
// import { TaskList } from '../components/TaskList'

// 以下の記述だとerrorが出る
// export default function Dashboard(): NextPage {
//   return <Layout title="Task Board">dashboard</Layout>
// }
const Dashboard: NextPage = () => {
  const router = useRouter()
  const logout = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`)
    router.push('/')
  }
  return (
    <Layout title="Task Board">
      <LogoutIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={logout}
      />
    </Layout>
  )
}

export default Dashboard
