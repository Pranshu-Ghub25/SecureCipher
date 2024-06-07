import { useState } from 'react'

import './App.css'
// import CaesarCipher from './components/CaeserCipher'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
    </>
  )
}

export default App
