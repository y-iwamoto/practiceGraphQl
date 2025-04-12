import './App.css'
import { useNavigate } from 'react-router'

function App() {

  const navigate = useNavigate()

  return (
    <div>
      <h1>トップ画面</h1>
      <button onClick={() => navigate('/test')}>テスト画面へ</button>
    </div>
  )
}

export default App
