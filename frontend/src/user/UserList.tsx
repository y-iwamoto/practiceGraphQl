import { useQuery } from '@apollo/client'
import { graphql } from '../ggl'
import { FC } from 'react'
import { Link } from 'react-router'

const getUserQueryDocument = graphql(`
  query GetUser {
    users {
      id
      email
      firstName
      lastName
    }
  }
`)

const UserList: FC = () => {

  const { data, loading, error } = useQuery(getUserQueryDocument)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>テスト画面</h1>
      <Link to="/user-create-input">ユーザー作成画面へ</Link>
      <ul style={{ paddingInlineStart: 0, listStyle: 'none' }}>
        {data?.users.length === 0 && <li>ユーザーが見つかりませんでした</li>}
        {data?.users.map((user) => (
          <li key={user.id} style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '1px solid #eee',
            padding: '10px 0'
          }}>
            <div><strong>メール:</strong> {user.email}</div>
            <div><strong>名前:</strong> {user.firstName} {user.lastName}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList
