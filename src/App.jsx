import { useState } from "react"
import Menu from "./components/Menu"

export default function App() {
  const [gameLevel, setGameLevel] = useState({level: 'Easy', order: 1, text: "Cardboard Chaos"})

  return(
    <>
      <Menu gameLevel={gameLevel} setGameLevel={setGameLevel} />
    </>
  )
}