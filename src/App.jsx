import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="text-center bg-zinc-100 max-w-screen-lg mx-auto my-10 rounded-full shadow-lg p-2">
        <h1 className="text-3xl tracking-tighter">Pixelstats</h1>
        <p className="tracking-wider">React version</p>
      </div>
    </>
  )
}

export default App