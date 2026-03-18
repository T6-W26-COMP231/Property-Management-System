import { useState } from 'react'
import Logo from './components/Logo'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <Logo />
      </header>
      <main>
        <h1>Hello World</h1>
      </main>
    </div>
  )
}

export default App