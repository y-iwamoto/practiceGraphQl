import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { ApolloProvider } from '@apollo/client'
import client from './graphql/apolloClient.ts'
import './index.css'
import App from './App.tsx'
import UserList from './user/UserList.tsx'
import UserCreateInput from './user/UserCreateInput.tsx'

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('rootが見つかりませんでした');
}

createRoot(rootElement).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/user-create-input" element={<UserCreateInput />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>,
)
