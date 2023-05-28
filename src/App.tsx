import { useState, Suspense } from 'react'

import { Button } from '@mui/material'

import viteLogo from '../public/vite.svg'

import reactLogo from './assets/react.svg'
import './App.css'
import { useExample } from './hooks/useExample'

function App() {
  const [count, setCount] = useState(0)

  const { data, error } = useExample()

  if (error) return <div>failed to load</div>

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      <ul>{data && data.map((item) => <li key={item.id}>{item.title}</li>)}</ul>
    </Suspense>
  )
}

export default App
