import { useQuery } from '@apollo/client'
import { graphql } from './ggl'

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


function Test() {

  const { data, loading, error } = useQuery(getUserQueryDocument)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div>
      <h1>テスト画面</h1>

      <ul>
        {data?.users.map((user) => (
          <li key={user.id}>
            <span>{user.email}</span>
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Test
