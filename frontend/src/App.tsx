import './App.css'
import { useNavigate } from 'react-router'

function App() {

  const navigate = useNavigate()

  return (
    <div>
      <h1>トップ画面</h1>
      <button onClick={() => navigate('/user')}>ユーザー一覧画面へ</button>
      <button onClick={() => navigate('/farm-create-input')}>農場作成画面へ</button>
    </div>
  )
}

export default App
