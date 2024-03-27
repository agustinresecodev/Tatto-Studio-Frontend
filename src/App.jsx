import { useState } from 'react'

import { Body } from './pages/Body/Body'
import NavbarTest from './components/Navbar/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavbarTest />
      <Body />
    </>
  )
}

export default App
