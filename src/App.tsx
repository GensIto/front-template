import { useState, Suspense } from 'react'

import { Button } from '@mui/material'

import { useExample } from './hooks/useExample'

function App() {
  const [count, setCount] = useState(0)

  const { data, error } = useExample()

  if (error || !data) return <div>failed to load</div>

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <h1>Vite + React</h1>
      <Button type="button" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <ul>{data && data.map((item) => <li key={item.id}>{item.title}</li>)}</ul>
    </Suspense>
  )
}

export default App
